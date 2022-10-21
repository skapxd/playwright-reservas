// @ts-check
// Documentacion del paquete -> https://playwright.dev/docs/api/class-playwright
// Video de ayuda para playWright -> https://www.youtube.com/watch?v=YjbRkt8cew8

const { schedule } = require('node-cron');
const { chromium } = require('playwright');
const { sendMail } = require('./mail.js');
const { nuevoDia } = require('./src/nuevoDia.js');
const { reservarDia } = require('./src/reservarDia.js');

async function main(){
  const browser = await chromium.launch({headless: true})
  const page = await browser.newPage()
  
  await page.goto('https://jack.q10.com/Q10/Asistencia')

  const user = await page.locator('#NombreUsuario').type('jrivera@q10.com')
  const pass = await page.locator('#Contrasena').type('zxasqw')

  await page.click('#submit-btn')
  
  const btnRol = page.locator('[data-id="3"]')
  await btnRol.waitFor()
  btnRol.click()

  const reservaDia = await nuevoDia(page)
  if (reservaDia === false) return await browser.close()

  await reservarDia(page)

  sendMail({
    email: 'jrivera@q10.com',
    message: 'Su reserva se ha realizado exitosamente',
    subject: 'Reserva automatica en JACK'
  })

  return await browser.close()
}

schedule('* * 12 * * *',  main)
