// @ts-check
// Documentacion del paquete -> https://playwright.dev/docs/api/class-playwright
// Video de ayuda para playWright -> https://www.youtube.com/watch?v=YjbRkt8cew8

const {chromium} = require('playwright');

(async function main(){
  const browser = await   chromium.launch({headless: false})
  const page = await browser.newPage();
  await page.goto('https://jack.q10.com/login?ReturnUrl=%2F')
  const inputName = await page.locator('[id="NombreUsuario"]').type('jrivera@q10.com')

  
})()
