/**
 * @param {import('playwright').Page} page 
 * @returns 
 */
module.exports.reservarDia = async function(page){    
  const lastDay = page.locator('.nav-item').last()
  await lastDay.click()

  const dataId = await lastDay.getAttribute('data-id-fecha')

  const btnHacerReserva = await page.locator(`[href="/Q10/Asistencia/Crear/${dataId}/01"]`).click();

  await page.locator('#Reserva_res_compra_almuerzo').first().click()

  await page.locator('[class="filter-option pull-left"]').click()
  const btnHora = await page.locator("a", {hasText: '1:00 p.m.'}).click()

  await page.click('#submit-btn')
}