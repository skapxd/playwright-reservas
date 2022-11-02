module.exports.reservarDia = async (page) => {
  
  await page.waitForURL("https://jack.q10.com/");
  await page.getByRole("link", { name: "Manuel" }).click();
  await page.getByRole("link", { name: "Reservar asistencia" }).click();
  await page.waitForURL("https://jack.q10.com/Q10/Asistencia");
  await page.getByRole("link", { name: "martes, 08 noviembre" }).click();
  await page
    .locator('#consolidados div:has-text("Reservar día")')
    .first()
    .click();
  await page.getByRole("link", { name: " Reservar día" }).click();
  await page.getByLabel("Comprar almuerzo de Q10 *").check();
  await page.getByRole("button", { name: "Seleccione" }).click();
  await page.locator('a:has-text("1:00 p.m.")').click();
  await page.getByRole("button", { name: "Aceptar" }).click();

  await page
    .getByText("xEl registro fue creado exitosamente")
    .waitFor()
    .catch((e) => {
      console.log("fallo el registro");
    });
}