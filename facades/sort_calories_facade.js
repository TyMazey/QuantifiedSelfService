var Recipe = require('../models').Recipe;
var RecipeHelper = require('../helpers/recipe_helper');
var RecipeSerializer = require('../serializers/recipe_serializer');

module.exports = class SortCaloriesFacade {
  static sortRecipes(search, type) {
    return new Promise(function(resolve, reject) {
      checkSearch(search)
      .then(search => {
        sortSearched(search, type)
        .then(response => {resolve(response)})
        .catch(error => {reject(error)})
      })
      .catch(noSearch => {
        checkSortAllType(type)
        .then(response => {resolve(response)})
        .catch(error => {reject(error)})
      })
    })
  }
}

function checkSortAllType(type) {
  if (type === 0){
    return sortAllRecipes('calories');
  }
  else if (type === 1){
    return sortAllRecipes('totalTime');
  }
}

function checkSortType(search, type) {
  if (type === 0){
    return sortSearchedRecipes(search, 'calories');
  }
  else if (type === 1){
    return sortSearchedRecipes(search, 'totalTime');
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

function sortSearched(search, type) {
  return new Promise(function(resolve, reject) {
    RecipeHelper.findOrRequestRecipes(search)
    .then(recipes => {
      checkSortType(search, type)
      .then(sorted => {
        resolve({status: 200, body: RecipeSerializer.formatAll(sorted)})
      })
    })
    .catch(error => {
      reject({status: 500, body: error})
    })
  })
};

function sortSearchedRecipes(search, type) {
  return new Promise(function(resolve, reject) {
    Recipe.forQueryAndSort(search, type)
    .then(recipes => { resolve(recipes) })
    .catch(error => { reject(error) })
  })
}

function sortAllRecipes(type) {
  return new Promise(function(resolve, reject) {
    Recipe.noQuerySort(type)
    .then(sorted => {
      resolve({status: 200, body: RecipeSerializer.formatAll(sorted)})
    })
    .catch(error => {
      reject({status: 500, body: error})
    })
  })
}
