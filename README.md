# Quantified Self Service

### Using the application

##### Requesting recipes containing a food

You may request a list of recipes containing a food by submitting a `GET` request to the endpoint `/api/v1/recipes?food=chicken` with a required query parameter `food` set to the type of food you wish to search for.

A successful request will return a 200 status and contain an array of recipe objects including the `id`, `name`, `calories`, `imageUrl`, and `recipeUrl`. A sample response can be found below:

``` HTTP
status: 200
body:


[
  {
      "id": 1,
      "name": "Chicken Vesuvio",
      "calories": 4230,
      "imageUrl": "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
      "recipeUrl": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html"
  },
  {...}
]
```

In the event a food is not provided, the application will return a 400 status code and an error message indicating the reason for the failed request, shown below:

``` HTTP
status: 200
body:

{
    "error": "Food query parameter is required."
}
```
