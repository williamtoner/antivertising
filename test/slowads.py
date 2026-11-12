"""A page of ads that arrive late, for checking how promptly they are swapped.

Shared by test/e2e.py and test/e2e_firefox.py. Real ads do not arrive with the
page: the frame's response is slow, or a script fills the frame in afterwards,
or the frame is nested in another, or it is only added when the reader
scrolls. Each slot here does one of those. The page itself notes when each ad
became readable and when its card appeared, in a global called T.

    server = slowads.serve(demo_dir)          # also serves the demo page
    open  slowads.url(server)                 # in the browser under test
    wait  until slowads.DONE is true in the page, or slowads.PATIENCE ms pass
    failures = slowads.judge(T)               # T read back from the page
"""
import functools
import http.server
import json
import threading
import time
import urllib.parse

BRANDS = {
    "pepsi": ("https://www.pepsi.com/zero", "Pepsi Zero Sugar. Zero compromise."),
    "nike": ("https://www.nike.com/run", "Nike. Run further."),
    "netflix": ("https://www.netflix.com/", "Netflix. Watch anywhere."),
    "coinbase": ("https://www.coinbase.com/", "Coinbase. Buy crypto today."),
    "mcdonalds": ("https://www.mcdonalds.com/", "McDonald's. I'm lovin' it."),
    "nordvpn": ("https://nordvpn.com/", "NordVPN. Stay private."),
    "zorblax": ("https://zorblax.example/buy", "Zorblax. The widget for people who like widgets."),
    "draftkings": ("https://www.draftkings.com/", "DraftKings Sportsbook. Bet $5."),
}

# slot: (how the creative arrives, brand, after how many ms, what it should become)
SLOTS = {
    "A": ("slow", "pepsi", 300, "coca-cola"),            # the frame's own response is slow
    "B": ("slow", "nike", 1500, "adidas"),
    "C": ("slow", "netflix", 3000, "disney-plus"),
    # Slower than the wait for an ad that gives nothing away: an empty frame
    # must not be mistaken for an advertiser nobody has heard of.
    "D": ("slow", "coinbase", 6500, "nemesis:crypto"),
    "E": ("script", "mcdonalds", 2000, "burger-king"),   # frame loads at once, a script fills it later
    "F": ("nested", "nordvpn", 4000, "expressvpn"),      # wrapper frame at once, inner frame slow
    "G": ("slow", "zorblax", 1000, "generic"),           # an advertiser nobody has heard of
    "H": ("late", "draftkings", 8000, "nemesis:gambling"),  # the frame is only added later
}

DONE = "Object.keys(T.swapped).length >= %d" % len(SLOTS)
PATIENCE = 16000

# A recognised ad should flip before anyone can read it. The heckle waits, on
# purpose, until the ad has stopped telling us things.
PROMPT_MS = 500
HECKLE_MS = (500, 2500)

PAGE = """<!doctype html><meta charset="utf-8"><title>Slow ads</title><body style="margin:0">
<script>
var T = {ready: {}, swapped: {}};
addEventListener('message', function (e) {
  if (typeof e.data === 'string' && e.data.indexOf('ready:') === 0) T.ready[e.data.slice(6)] = Math.round(performance.now());
});
new MutationObserver(function () {
  document.querySelectorAll('[data-antivertising]').forEach(function (card) {
    var slot = card.closest('[data-slot]');
    var name = slot && slot.getAttribute('data-slot');
    if (name && !T.swapped[name]) T.swapped[name] = [Math.round(performance.now()), card.getAttribute('data-av-counter')];
  });
}).observe(document.documentElement, {childList: true, subtree: true});
</script>
%s
"""


def creative(brand):
    href, text = BRANDS[brand]
    return ('<a href="%s" target="_blank" style="display:block;width:300px;height:250px;'
            'background:#246;color:#fff;font:16px sans-serif">%s</a>' % (href, text))


def announce(slot):
    return '<script>top.postMessage("ready:%s", "*")</script>' % slot


class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_GET(self):
        url = urllib.parse.urlparse(self.path)
        if url.path not in ("/slow.html", "/slow-ad"):
            return super().do_GET()
        query = dict(urllib.parse.parse_qsl(url.query))
        port = self.server.server_address[1]
        # The page is on localhost and the ads on 127.0.0.1: different sites to a
        # browser, as a publisher and its ad network are.
        ads = "http://127.0.0.1:%d/slow-ad" % port

        if url.path == "/slow.html":
            slots = []
            for slot, (how, brand, ms, _) in SLOTS.items():
                if how == "late":
                    frame = (
                        '<script>setTimeout(function () { var f = document.createElement("iframe"); f.width = 300; f.height = 250;'
                        ' f.src = "%s?how=slow&slot=%s&ms=300"; document.getElementById("div-gpt-ad-%s").appendChild(f); }, %d)</script>'
                        % (ads, slot, slot, ms)
                    )
                else:
                    frame = '<iframe width="300" height="250" src="%s?how=%s&slot=%s&ms=%d"></iframe>' % (ads, how, slot, ms)
                slots.append(
                    '<div data-slot="%s" style="display:inline-block;margin:6px">'
                    '<div id="div-gpt-ad-%s" style="width:300px;height:250px">%s</div></div>' % (slot, slot, frame)
                )
            body = PAGE % "\n".join(slots)
        else:
            slot = query["slot"]
            how, ms = query["how"], int(query["ms"])
            brand = SLOTS[slot][1]
            if how == "slow":
                time.sleep(ms / 1000.0)
                body = '<!doctype html><body style="margin:0">' + creative(brand) + announce(slot)
            elif how == "script":
                body = (
                    '<!doctype html><body style="margin:0"><script>setTimeout(function () {'
                    ' document.body.innerHTML = %s; top.postMessage("ready:%s", "*"); }, %d)</script>'
                    % (json.dumps(creative(brand)), slot, ms)
                )
            else:  # nested: this is the wrapper, back on the page's own host
                body = (
                    '<!doctype html><body style="margin:0"><iframe width="300" height="250" style="border:0"'
                    ' src="http://localhost:%d/slow-ad?how=slow&slot=%s&ms=%d"></iframe>' % (port, slot, ms)
                )

        data = body.encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)


def serve(directory):
    handler = functools.partial(Handler, directory=str(directory))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


def url(server):
    return "http://localhost:%d/slow.html" % server.server_address[1]


def judge(T):
    """What went wrong, given the page's record of when ads arrived and were swapped."""
    failures = []
    for slot, (how, brand, _, want) in SLOTS.items():
        what = "slow ad %s (%s, %s)" % (slot, brand, how)
        ready = T["ready"].get(slot)
        swapped = T["swapped"].get(slot)
        if not swapped:
            failures.append("%s: never swapped" % what)
            continue
        at, counter = swapped
        if counter != want:
            failures.append("%s: became %s, expected %s" % (what, counter, want))
        if ready is None:
            failures.append("%s: swapped before the ad had even arrived" % what)
            continue
        lag = at - ready
        if want == "generic":
            if not HECKLE_MS[0] <= lag <= HECKLE_MS[1]:
                failures.append("%s: heckled %d ms after it arrived, expected %d to %d" % ((what, lag) + HECKLE_MS))
        elif not 0 <= lag <= PROMPT_MS:
            failures.append("%s: swapped %d ms after it arrived, expected within %d" % (what, lag, PROMPT_MS))
    return failures
