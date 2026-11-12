#!/usr/bin/env python3
"""Look after the add-on's page in Mozilla's catalogue (addons.mozilla.org).

    python3 tools/amo_listing.py has-version 0.3.0.1   exit 0 if Mozilla already has it
    python3 tools/amo_listing.py sync                  send the text and screenshots in listing/
    python3 tools/amo_listing.py status                print where the listing stands

Sending a new version is not done here: `web-ext sign --channel listed` does
that (see .github/workflows/listing.yml).

Needs the Mozilla API key in the environment, under the names web-ext uses:
WEB_EXT_API_KEY (the "JWT issuer") and WEB_EXT_API_SECRET (the "JWT secret").
"""
import base64
import hashlib
import hmac
import json
import os
import sys
import time
import urllib.error
import urllib.request
import uuid
from pathlib import Path

import build_firefox

ROOT = Path(__file__).resolve().parent.parent
LISTING = ROOT / "listing"
# AMO_API_BASE points the script at a stand-in server, for testing it.
API = "%s/addons/addon/%s/" % (
    os.environ.get("AMO_API_BASE", "https://addons.mozilla.org/api/v5").rstrip("/"),
    build_firefox.ADDON_ID,
)


def b64(data):
    return base64.urlsafe_b64encode(data).rstrip(b"=")


def token():
    """A short-lived signed pass, made from the API key, that Mozilla asks for on every call."""
    key, secret = os.environ.get("WEB_EXT_API_KEY"), os.environ.get("WEB_EXT_API_SECRET")
    if not key or not secret:
        raise SystemExit("WEB_EXT_API_KEY and WEB_EXT_API_SECRET must be set")
    now = int(time.time())
    claims = {"iss": key, "jti": uuid.uuid4().hex, "iat": now, "exp": now + 60}
    signed = b64(json.dumps({"alg": "HS256", "typ": "JWT"}).encode()) + b"." + b64(json.dumps(claims).encode())
    return (signed + b"." + b64(hmac.new(secret.encode(), signed, hashlib.sha256).digest())).decode()


def call(method, path="", body=None, content_type="application/json"):
    """One API call. Returns the decoded answer, if there is one."""
    data = json.dumps(body).encode() if content_type == "application/json" and body is not None else body
    request = urllib.request.Request(API + path, data=data, method=method)
    request.add_header("Authorization", "JWT " + token())
    request.add_header("User-Agent", "antivertising-listing")
    if data is not None:
        request.add_header("Content-Type", content_type)
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            text = response.read().decode()
    except urllib.error.HTTPError as error:
        raise SystemExit("%s %s%s failed: %s\n%s" % (method, API, path, error.code, error.read().decode()[:2000]))
    return json.loads(text) if text else None


def multipart(fields, file_field, file_path):
    """A form upload with one file in it, which is how Mozilla takes pictures."""
    edge = uuid.uuid4().hex
    parts = []
    for name, value in fields.items():
        parts.append(('--%s\r\nContent-Disposition: form-data; name="%s"\r\n\r\n%s\r\n' % (edge, name, value)).encode())
    parts.append(
        ('--%s\r\nContent-Disposition: form-data; name="%s"; filename="%s"\r\nContent-Type: image/png\r\n\r\n'
         % (edge, file_field, file_path.name)).encode() + file_path.read_bytes() + b"\r\n"
    )
    parts.append(("--%s--\r\n" % edge).encode())
    return b"".join(parts), "multipart/form-data; boundary=" + edge


def versions():
    """Every version Mozilla holds, in the catalogue or not, newest first."""
    return call("GET", "versions/?filter=all_with_unlisted&page_size=50").get("results", [])


def has_version(number):
    return any(version["version"] == number for version in versions())


def sync():
    """Make the listing's text and screenshots match the files in listing/."""
    text = json.loads((LISTING / "firefox.json").read_text())
    text.pop("version", None)  # licence and notes belong to a version, and go up with it
    call("PATCH", body=text)
    print("listing text sent")

    wanted = json.loads((LISTING / "screenshots.json").read_text())
    for old in call("GET").get("previews", []):
        call("DELETE", "previews/%s/" % old["id"])
    for position, shot in enumerate(wanted):
        body, content_type = multipart({"position": position}, "image", LISTING / shot["file"])
        made = call("POST", "previews/", body, content_type)
        # The caption cannot go up with the picture, so it follows.
        call("PATCH", "previews/%s/" % made["id"], {"caption": {"en-US": shot["caption"]}})
        print("screenshot sent: %s" % shot["file"])


def status():
    addon = call("GET")
    print("listing status: %s" % addon.get("status"))
    print("page: %s" % addon.get("url"))
    current = addon.get("current_version")
    print("version on the public page: %s" % (current["version"] if current else "none yet"))
    print("screenshots: %d" % len(addon.get("previews", [])))
    for version in versions():
        print("  %-10s %-9s file %s" % (version["version"], version["channel"], version["file"]["status"]))


def main():
    command = sys.argv[1] if len(sys.argv) > 1 else ""
    if command == "has-version" and len(sys.argv) == 3:
        sys.exit(0 if has_version(sys.argv[2]) else 1)
    elif command == "sync":
        sync()
    elif command == "status":
        status()
    else:
        raise SystemExit(__doc__)


if __name__ == "__main__":
    main()
