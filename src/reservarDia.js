/**
 * @param {import('playwright').Page} page 
 * @returns 
 */
module.exports.reservarDia = async function(page){    
  await page.locator('.nav-item').last().click();
  await page.locator('[class="btn btn-primary q10button modal-form"]').click();

  await page.waitForSelector('#Reserva_res_compra_almuerzo', {state: "visible"});

  await page.locator('#Reserva_res_compra_almuerzo').first().click()
  
  await page.locator('[class="filter-option pull-left"]').click()
  await page.locator('[rel="1"]').click()

  await page.locator('#submit-btn').click()
}