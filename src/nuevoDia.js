/**
 * @param {import('playwright').Page} page
 * @returns
 */
module.exports.nuevoDia = async function (page) {
  await page.waitForSelector('[class="nav-link nav-fechas"]', {
    state: "visible",
  });

  const text = await page.locator(".nav-item").last().innerText();

  const [dia] = text?.split(",");

  return (
    {
      lunes: true,
      martes: true,
      viernes: true,
    }[dia] ?? false
  );
};
