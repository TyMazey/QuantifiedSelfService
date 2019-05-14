var app = require('../app');
var request = require('supertest');
var shell = require('shelljs');

describe('Recipe API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
  })

  describe('Request recipe for a food', () => {
    test('Returns a list of recipes for a food', () => {
      return request(app).get('/api/v1/recipes?food=chicken')
        .then(response => {
          expect(response.status).toBe(200)
          expect(Array.isArray(response.body)).toBe(true)
          expect(response.body[0]).toHaveProperty('id')
          expect(response.body[0]).toHaveProperty('name')
          expect(response.body[0]).toHaveProperty('calories')
          expect(response.body[0]).toHaveProperty('imageUrl')
          expect(response.body[0]).toHaveProperty('recipeUrl')
          expect(response.body[0]).toHaveProperty('ingredients')
          expect(Array.isArray(response.body[0].ingredients)).toBe(true)
        })
    })

    test('Returns a 400 if location not provided', () => {
      request(app).get('/api/v1/recipes')
        .then(response => {
          expect(response.status).toBe(400)
          expect(response.body.error).toBe("Food query parameter is required.")
        })
    })
  })
  describe('Sort recipes for a food', () => {
    test('returns a list recipes sorted by the calories from highest to lowest', () => {
      request(app).get('/api/v1/sort/calories?food=chicken')
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body[0]).toHaveProperty('calories')
        expect(response.body[0].calories).toBe()
        expect(response.body[1].calories).toBe()
        expect(response.body[2].calories).toBe()
      })
    })
  })
})
