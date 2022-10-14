// @ts-check
// Documentacion del paquete -> https://playwright.dev/docs/api/class-playwright
// Video de ayuda para playWright -> https://www.youtube.com/watch?v=YjbRkt8cew8

const {chromium} = require('playwright');
const { delay } = require('./delay.js');

(async function main(){
  const browser = await chromium.launch({headless: false})
  const page = await browser.newPage()
  
  await page.goto('https://jack.q10.com/Q10/Asistencia')

  const user = await page.locator('#NombreUsuario').type('jrivera@q10.com')
  const pass = await page.locator('#Contrasena').type('zxasqw')

  await page.click('#submit-btn')
  
  const btnRol = page.locator('[data-id="3"]')
  await btnRol.waitFor()
  btnRol.click()

  let reservarDia = await nuevoDia(page);

  //console.log({reservarDia})
  // await browser.close();
})()

/**
 * 
 * @param {import('playwright').Page} page 
 * @returns 
 */
async function nuevoDia(page){
  await page.waitForSelector('[class="nav-link nav-fechas"]', {state: "visible"});

  let dias = await page.locator('.nav-item').count()
  let texto = (await page.locator('.nav-item').innerText()).valueOf()[dias-1]
  //let texto = await page.locator('.nav-item')[dias-1];

  console.log(`Respuesta días: ${dias} respuesta texto: ${texto}`);

  //let dia = texto?.split(',')[0];

  // console.log({dia});

  // return {'lunes' : true,
  //         'martes' : true,
  //         'viernes' : true,
  //         default : false
  //       }[dia]
}