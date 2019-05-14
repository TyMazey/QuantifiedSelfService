var IngredientSerializer = require('./ingredient_serializer');

module.exports = class RecipeSerializer {
  static formatOne(recipe) {
    return {
      id: recipe.id,
      name: recipe.name,
      calories: recipe.calories,
      imageUrl: recipe.imageUrl,
      recipeUrl: recipe.recipeUrl,
      ingredients: IngredientSerializer.formatAll(recipe)
    }
  }

  static formatAll(recipes) {
    return recipes.map(function(recipe) {
      return RecipeSerializer.formatOne(recipe);
    })
  }
}
