module.exports = class IngredientSerializer {
  static formatOne(ingredient) {
    return {
      name: ingredient.name,
      quantity: ingredient.RecipeIngredient.quantity
    }
  }

  static formatAll(recipe) {
    return recipe.ingredients.map(function(ingredient) {
      return IngredientSerializer.formatOne(ingredient);
    })
  }
}
