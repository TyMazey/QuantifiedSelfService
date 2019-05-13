var fetch = require('node-fetch');
const baseUrl = 'https://api.edamam.com'
require('dotenv').config();

module.exports = class RecipeService {
  static requestRecipesForFood(food) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/search?q=${food}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}`)
      .then(response => response.json())
      .then(result => resolve(result.hits))
      .catch(error => reject(error))
    })
  }
}
