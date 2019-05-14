module.exports = class SortFacade {
  static sortRecipes(search) {
    checkSearch(search)
    .then(search => {
      return sortSearchedCalories(search)
    })
    .catch(noSearch => {
      return sortAllCalories()
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
