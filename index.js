// @ts-check
// Documentacion del paquete -> https://playwright.dev/docs/api/class-playwright
// Video de ayuda para playWright -> https://www.youtube.com/watch?v=YjbRkt8cew8

const { chromium } = require("playwright");
const { login } = require("./login");
const { reservarDia } = require("./reservar-dia");

async function main({ user, pass }) {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.pause();

  await login(page);
  await reservarDia(page)
}

async function crearEstudiante(){
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await login(page, {
    user: '', pass: ''
  });

}

main({
  pass: "mlondono@q10.com",
  user: "manuelq10",
});
