module.exports = class RecipeSerializer {
  static formatOne(recipe) {
    return {
      name: recipe.name,
      calories: recipe.calories,
      imageUrl: recipe.imageUrl,
      recipeUrl: recipe.recipeUrl
    }
  }

  static formatAll(recipes) {
    recipes.map(function(recipe) {
      return RecipeSerializer.formatOne(recipe);
    })
  }
}
