// @ts-check
// Documentacion del paquete -> https://playwright.dev/docs/api/class-playwright
// Video de ayuda para playWright -> https://www.youtube.com/watch?v=YjbRkt8cew8

const { schedule } = require("node-cron");
const { chromium } = require("playwright");
const { sendMail } = require("./mail.js");
const { nuevoDia } = require("./src/nuevoDia.js");
const { reservarDia } = require("./src/reservarDia.js");

async function main() {
  const browser = await chromium.launch({
    headless: Boolean(process.env.isProd),
  });
  const page = await browser.newPage();

  await page.goto("https://jack.q10.com/Q10/Asistencia");

  const user = await page.locator("#NombreUsuario").type("jrivera@q10.com");
  const pass = await page.locator("#Contrasena").type("zxasqw");

  await page.click("#submit-btn");

  const btnRol = page.locator('[data-id="3"]');
  await btnRol.waitFor();
  btnRol.click();

  const reservaDia = await nuevoDia(page);
  if (reservaDia === false) return await browser.close();

  await reservarDia(page);

  sendMail({
    email: "jrivera@q10.com",
    message: "Su reserva se ha realizado exitosamente",
    subject: "Reserva automatica en JACK",
  });

  return await browser.close();
}

schedule("* * 1 * * *", () => {});
(function init(params) {
  // create Date object for current location
  const date = new Date();

  // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;

  // time offset for New Zealand is +12
  const timeOffset = -5;

  // create new Date object for a different timezone using supplied its GMT offset.
  const colombiaHours = new Date(utcTime + 3600000 * timeOffset);

  const canReserve = colombiaHours.getHours() === 12;
  if (!canReserve) return;

  main();
})();
