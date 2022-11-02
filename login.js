module.exports.login = async (page, {user, pass}) => {
  await page.goto("https://jack.q10.com/login?ReturnUrl=%2F");
  await page.getByPlaceholder("Nombre de usuario").click();
  await page.getByPlaceholder("Nombre de usuario").fill("mlondono@q10.com");
  await page.getByPlaceholder("Contraseña").click();
  await page.getByPlaceholder("Contraseña").fill("manuelq10");
  await page.getByRole("button", { name: "Ingresar" }).click();
  await page.getByRole("link", { name: "Administrativo" }).click();
};