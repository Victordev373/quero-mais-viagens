// Pré-renderiza a landing page: abre o site num Chromium headless, espera o
// React montar e grava o HTML resultante dentro de <div id="root"> no
// index.html, entre os marcadores <!--prerender:start--> e <!--prerender:end-->.
// Assim o HTML servido pelo GitHub Pages já traz todo o conteúdo; quando o
// main.js carrega, o React monta por cima e substitui esse conteúdo.
//
// Uso: npm install && npm run prerender (rode de novo sempre que mudar main.js).
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const INDEX = join(ROOT, "index.html");
const START = "<!--prerender:start-->";
const END = "<!--prerender:end-->";
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};

const html = await readFile(INDEX, "utf8");
const a = html.indexOf(START);
const b = html.indexOf(END);
if (a < 0 || b < a) throw new Error("Marcadores de pré-renderização não encontrados no index.html");
// Serve a página com o #root vazio, como na primeira renderização do React.
const emptyHtml = html.slice(0, a + START.length) + html.slice(b);

const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
  try {
    const body = path === "/" || path === "/index.html" ? emptyHtml : await readFile(join(ROOT, path));
    res.writeHead(200, { "Content-Type": TYPES[extname(path)] || "text/html; charset=utf-8" });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(0);
const url = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  // O carrossel de clientes gira sozinho; congela no primeiro slide para o HTML sair sempre igual.
  await page.addInitScript(() => {
    const original = window.setInterval;
    window.setInterval = (fn, ms, ...rest) => (ms === 3400 ? 0 : original(fn, ms, ...rest));
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: "networkidle" });
  // Rola a página inteira para que os blocos com animação de entrada fiquem visíveis no HTML.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  if (errors.length) throw new Error("Erros na página:\n" + errors.join("\n"));

  const rendered = await page.evaluate(() => {
    const root = document.getElementById("root").cloneNode(true);
    // Remove variáveis de parallax que dependem da posição de rolagem.
    root.querySelectorAll("[style]").forEach((el) => {
      ["--p", "--mx", "--my"].forEach((v) => el.style.removeProperty(v));
      if (!el.getAttribute("style")) el.removeAttribute("style");
    });
    return root.innerHTML;
  });
  if (!rendered.includes("<h1")) throw new Error("O HTML renderizado não tem H1");

  await writeFile(INDEX, html.slice(0, a + START.length) + rendered + html.slice(b));
  console.log(`index.html pré-renderizado (${(rendered.length / 1024).toFixed(1)} KB de HTML no #root)`);
} finally {
  await browser.close();
  server.close();
}
