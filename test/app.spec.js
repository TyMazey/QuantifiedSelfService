var app = require('../app');
var request = require('supertest');
var shell = require('shelljs');

describe('Recipe API', () => {
  describe('Request recipe for a food', () => {
    test('Returns a list of recipes for a food', () => {
      return request(app).get('/api/v1/recipes?food=chicken')
        .then(response => {
          expect(response.status).toBe(200)
          expect(Array.isArray(response.data)).toBe(true)
          expect(response.data[0]).toHaveProperty('id')
          expect(response.data[0]).toHaveProperty('name')
          expect(response.data[0]).toHaveProperty('calories')
          expect(response.data[0]).toHaveProperty('imageUrl')
          expect(response.data[0]).toHaveProperty('recipeUrl')
        })
    })

    test('Returns a 400 if location not provided', () => {
      request(app).get('/api/v1/recipes')
        .then(response => {
          expect(response.status).toBe(400)
          expect(response.data.error).toBe("Food query parameter is required.")
        })
    })
  })
})