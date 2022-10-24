/**
 * @param {import('playwright').Page} page
 * @returns
 */
module.exports.reservarDia = async function (page) {
  const lastDay = page.locator(".nav-item").last();
  await lastDay.click();

  const dataId = await lastDay.getAttribute("data-id-fecha");

  const btnHacerReserva = await page
    .locator(`[href="/Q10/Asistencia/Crear/${dataId}/01"]`)
    .click();

  await page.locator("#Reserva_res_compra_almuerzo").first().click();

  await page.locator('[class="filter-option pull-left"]').click();
  const btnHora = await page.locator("a", { hasText: "12:00 p.m." }).click();

  await page.click("#submit-btn");

  await page
    .getByText("Se supero el límite de personas en el horario del comedor")
    .waitFor({ state: "visible" })
    .then((_) => {
      sendMail({
        email: credentials.user,
        message: "Su reserva se ha realizado exitosamente",
        subject: "Reserva automática en JACK",
      });
    })
    .catch((_) => {
      sendMail({
        email: credentials.user,
        message: "Limite de personas excedido por el horario",
        subject: "Limite excedido",
      });
    });

  await page.pause();
};
