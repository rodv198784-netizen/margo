"""Gera as artes dos posts do Margo (1080x1350) a partir de dados, com Playwright."""
import asyncio, json, os, sys
from playwright.async_api import async_playwright

OUT = sys.argv[1]

CSS = """
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1350px;font-family:Inter,sans-serif;color:#2A2220;background:#FBF7F2;position:relative;overflow:hidden}
.pad{position:absolute;inset:90px 90px 170px 90px;display:flex;flex-direction:column;justify-content:center}
.kicker{font:700 30px Inter;color:#C2410C;letter-spacing:.06em;text-transform:uppercase;margin-bottom:28px}
h1{font:700 104px/1.04 Lora,serif;letter-spacing:-.02em}
h2{font:700 76px/1.08 Lora,serif;letter-spacing:-.01em;margin-bottom:36px}
p{font:500 42px/1.35 Inter;color:#5E534E;margin-top:28px}
.rows{display:flex;flex-direction:column;gap:18px}
.row{display:flex;justify-content:space-between;align-items:baseline;background:#fff;border:2px solid #EADFD6;border-radius:28px;padding:30px 38px;font:600 44px Inter}
.row b{font:800 48px Inter}
.row.total{background:#2A2220;color:#fff;border-color:#2A2220}
.row.bad{background:#FEE2E2;border-color:#FCA5A5;color:#B91C1C}
.row.ok{background:#DCFCE7;border-color:#86EFAC;color:#15803D}
.big{font:700 150px/1 Lora,serif;color:#C2410C;margin:10px 0 20px}
.dark{background:#2A2220;color:#fff}.dark p{color:#E7DCD5}.dark .kicker{color:#FDBA8C}
.cta{display:inline-block;margin-top:44px;background:#C2410C;color:#fff;font:800 46px Inter;border-radius:999px;padding:30px 50px;align-self:flex-start}
.foot{position:absolute;left:90px;right:90px;bottom:70px;display:flex;justify-content:space-between;align-items:center;font:600 30px Inter;color:#8A7E78}
.dark .foot{color:#BFB3AC}
.logo{display:flex;align-items:center;gap:18px;font:700 40px Lora,serif;color:inherit}
.m{width:62px;height:62px;border-radius:18px;background:#C2410C;color:#fff;display:grid;place-items:center;font:700 38px Lora,serif}
.dots{display:flex;gap:10px}.dots i{width:14px;height:14px;border-radius:50%;background:#D8CBC2}.dots i.on{background:#C2410C}
"""

def slide_html(s, idx, total):
    dark = " dark" if s.get("dark") else ""
    body = ""
    if s.get("kicker"): body += f'<div class="kicker">{s["kicker"]}</div>'
    if s.get("h1"): body += f'<h1>{s["h1"]}</h1>'
    if s.get("h2"): body += f'<h2>{s["h2"]}</h2>'
    if s.get("big"): body += f'<div class="big">{s["big"]}</div>'
    if s.get("rows"):
        body += '<div class="rows">' + "".join(
            f'<div class="row {r[2] if len(r)>2 else ""}"><span>{r[0]}</span><b>{r[1]}</b></div>' for r in s["rows"]) + "</div>"
    if s.get("p"): body += f'<p>{s["p"]}</p>'
    if s.get("cta"): body += f'<div class="cta">{s["cta"]}</div>'
    dots = "".join(f'<i class="{"on" if i==idx else ""}"></i>' for i in range(total)) if total > 1 else ""
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{CSS}</style></head>
<body class="{dark.strip()}"><div class="pad">{body}</div>
<div class="foot"><div class="logo"><span class="m">m</span>Margo</div><div class="dots">{dots}</div></div></body></html>"""

async def main():
    posts = json.load(open(os.path.join(os.path.dirname(__file__), "posts.json")))
    os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 1080, "height": 1350})
        for post in posts:
            n = len(post["slides"])
            for i, s in enumerate(post["slides"]):
                await pg.set_content(slide_html(s, i, n))
                await pg.wait_for_timeout(80)
                await pg.screenshot(path=os.path.join(OUT, f'{post["id"]}-{i+1}.png'))
        await b.close()
    print("ok", sum(len(p["slides"]) for p in posts), "imagens")

asyncio.run(main())
