var Recipe = require('../models').Recipe;
var RecipeHelper = require('../helpers/recipe_helper');
var RecipeSerializer = require('../serializers/recipe_serializer');
var pry = require('pryjs')

module.exports = class SortCaloriesFacade {
  static sortRecipes(search) {
    return new Promise(function(resolve, reject) {
      checkSearch(search)
      .then(search => {
        sortSearchedCalories(search)
        .then(response => {resolve(response)})
        .catch(error => {reject(error)})
      })
      .catch(noSearch => {
        sortAllCalories()
        .then(response => {resolve(response)})
        .catch(error => {reject(error)})
      })
    })
  }
}

function checkSearch(search) {
  return new Promise(function(resolve, reject) {
    if (search){
      resolve(search);
    }else {
      reject();
    }
  })
};

function sortSearchedCalories(search) {
  return new Promise(function(resolve, reject) {
    RecipeHelper.findOrRequestRecipes(search)
    .then(recipes => {
      sortCalorieRecipes(search)
      .then(sorted => {
        resolve({status: 200, body: RecipeSerializer.formatAll(sorted)})
      })
    })
    .catch(error => {
      reject({status: 500, body: error})
    })
  })
};

function sortCalorieRecipes(search) {
  return new Promise(function(resolve, reject) {
    Recipe.forQueryAndSort(search, 'calories')
    .then(recipes => { resolve(recipes) })
    .catch(error => { reject(error) })
  })
}

function sortAllCalories() {
  return new Promise(function(resolve, reject) {
    Recipe.noQuerySort('calories')
    .then(sorted => {
      resolve({status: 200, body: RecipeSerializer.formatAll(sorted)})
    })
    .catch(error => {
      reject({status: 500, body: error})
    })
  })
}
