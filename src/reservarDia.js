/**
 * @param {import('playwright').Page} page 
 * @returns 
 */
module.exports.reservarDia = async function(page){    
  const lastDay = page.locator('.nav-item').last()
  await lastDay.click();

  const dataId = await lastDay.getAttribute('data-id-fecha')

  await page.locator(`[href="/Q10/Asistencia/Crear/${dataId}/01"]`).click();

  // await page.waitForSelector('#Reserva_res_compra_almuerzo', {state: "visible"});

  // await page.locator('#Reserva_res_compra_almuerzo').first().click()
  
  // await page.locator('[class="filter-option pull-left"]').click()
  // await page.locator('[rel="1"]').click()

  // await page.locator('#submit-btn').click()
}