// @ts-check
// Documentacion del paquete -> https://playwright.dev/docs/api/class-playwright
// Video de ayuda para playWright -> https://www.youtube.com/watch?v=YjbRkt8cew8

const { schedule } = require("node-cron");
const { chromium } = require("playwright");
const { credentials } = require("./credentials.js");
const { env } = require("./global.js");
const { sendMail } = require("./mail.js");
const { nuevoDia } = require("./src/nuevoDia.js");
const { reservarDia } = require("./src/reservarDia.js");

async function main() {
  const browser = await chromium.launch({
    headless: env.isProd,
  });

  const page = await browser.newPage();

  await page.goto("https://jack.q10.com/Q10/Asistencia");

  await page.locator("#NombreUsuario").type(credentials.user);
  await page.locator("#Contrasena").type(credentials.pass);

  await page.click("#submit-btn");

  const btnRol = page.locator('[data-id="3"]');
  await btnRol.waitFor();
  btnRol.click();

  const reservaDia = await nuevoDia(page);
  if (reservaDia === false) return await browser.close();

  await reservarDia(page);

  return await browser.close();
}

// (function init() {
//   // create Date object for current location
//   const date = new Date();

//   // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
//   const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;

//   // time offset for New Zealand is +12
//   const timeOffset = -5;

//   // create new Date object for a different timezone using supplied its GMT offset.
//   const colombiaHours = new Date(utcTime + 3600000 * timeOffset);

//   const canReserve = colombiaHours.getHours() === 12;
//   if (!canReserve) return;

//   main();
// })();

schedule("* * 1 * * *", () => {
  // create Date object for current location
  const date = new Date();

  // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;

  // time offset for New Zealand is +12
  const timeOffset = -5;

  // create new Date object for a different timezone using supplied its GMT offset.
  const colombiaHours = new Date(utcTime + 3600000 * timeOffset);

  const canReserve = colombiaHours.getHours() === 1;
  if (!canReserve) return;

  main();
});
