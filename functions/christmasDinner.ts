export const christmasDinner = (dishes) => {
  if (!dishes || dishes.length === 0) return [];
  if (dishes[0].length === 0) return [[]];
  const ingredients: { [key: string]: string[] } = {};

  for (let i = 0; i < dishes.length; i++) {
    if (!dishes[i] || dishes[i].length === 0) return [[]];
    const dish = dishes[i][0];
    for (let j = 1; j < dishes[i].length; j++) {
      let ingredient = dishes[i][j];
      if (ingredient in ingredients) {
        ingredients[ingredient].push(dish);
      }
      if (!(ingredient in ingredients)) {
        ingredients[ingredient] = [dish];
      }
    }
  }
  return Object.entries(ingredients)
    .filter(([ingredient, dishes]) => dishes.length > 1)
    .map(([ingredient, dishes]) => [ingredient, ...dishes.sort()])
    .sort(([ingredientA], [ingredientB]) =>
      ingredientA.localeCompare(ingredientB)
    );
};
