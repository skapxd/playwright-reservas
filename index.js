// @ts-check
// Documentacion del paquete -> https://playwright.dev/docs/api/class-playwright
// Video de ayuda para playWright -> https://www.youtube.com/watch?v=YjbRkt8cew8

const {chromium} = require('playwright');
const { delay } = require('./delay.js');

(async function main(){
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://jack.q10.com/Q10/Asistencia');

  const user = await page.locator('[id="NombreUsuario"]').type('jrivera@q10.com');
  const pass = await page.locator('[id="Contrasena"]').type('zxasqw');

  await page.click('[id="submit-btn"]'); 
  
  //TODO: Hacer que espere al modal
  const btnRol = page.locator('[data-id="3"]')
  await btnRol.waitFor()
  btnRol.click()

  let reservarDia = await nuevoDia(page);

  console.log({reservarDia})
  // await browser.close();
})()

/**
 * 
 * @param {import('playwright').Page} page 
 * @returns 
 */
async function nuevoDia(page){
  let dias = page.locator('[class="nav-link nav-fechas"]')
  await dias.waitFor({state: 'visible'})
  console.log({dias})
  // let texto = await page.locator('[class="nav-link nav-fechas"]')[dias-1];

  // let dia = texto?.split(',')[0];

  // console.log({dia});

  // return {'lunes' : true,
  //         'martes' : true,
  //         'viernes' : true,
  //         default : false
  //       }[dia]
}