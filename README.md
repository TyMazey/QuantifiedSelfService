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

##### Requesting recipes sorted by calories

You can request a list of recipes to be sorted by calories from lowest to highest by making a `GET` request to `/api/v1/sort/calories`. You can filter recipes further by adding an optional query parameter for food type for example `/api/v1/sort/calories?food=chicken`

A successful request will result in a 200 status code, and a list of recipes. This will include attributes for the recipes including a list of ingredients for the recipe. If no food parameter is given it will return all recipes currently in the database. If a parameter is given it will only return recipes for that food type.
`
An example response will look like:
```HTTP
status: 200
body:
{
  [
    {
        "id": 12,
        "name": "Skirt Steak and Hanger Steak",
        "calories": 322,
        "totalTime": 200,
        "imageUrl": "https://www.edamam.com/web-img/28e/28e26b8817b74263d70dd9480c112d83.jpg",
        "recipeUrl": "http://www.cookstr.com/recipes/skirt-steak-and-hanger-steak",
        "ingredients": [
            {
                "name": "5 to 6 ounces skirt steak or hanger steak",
                "quantity": 155
            },
            {...}
        ]
    },
    {...}
  ]  
}
```

##### Requesting recipes sorted by prep time

You can request a list of recipes to be sorted by total prep time from lowest to highest by making a `GET` request to `/api/v1/sort/totalTime`. You can filter recipes further by adding an optional query parameter for food type for example `/api/v1/sort/totalTime?food=chicken`

A successful request will result in a 200 status code, and a list of recipes. This will include attributes for the recipes including a list of ingredients for the recipe. If no food parameter is given it will return all recipes currently in the database. If a parameter is given it will only return recipes for that food type.
`
An example response will look like:
```HTTP
status: 200
body:
{
  [
    {
        "id": 12,
        "name": "Skirt Steak and Hanger Steak",
        "calories": 322,
        "totalTime": 200,
        "imageUrl": "https://www.edamam.com/web-img/28e/28e26b8817b74263d70dd9480c112d83.jpg",
        "recipeUrl": "http://www.cookstr.com/recipes/skirt-steak-and-hanger-steak",
        "ingredients": [
            {
                "name": "5 to 6 ounces skirt steak or hanger steak",
                "quantity": 155
            },
            {...}
        ]
    },
    {...}
  ]  
}
```

##### Requesting recipes sorted by ingredients

You can request a list of recipes to be sorted by the count of ingredients from lowest to highest by making a `GET` request to `/api/v1/sort/ingredients`. You can filter recipes further by adding an optional query parameter for food type for example `/api/v1/sort/ingredients?food=chicken`

A successful request will result in a 200 status code, and a list of recipes. This will include attributes for the recipes including a list of ingredients for the recipe. If no food parameter is given it will use all recipes currently in the database for the request. If a parameter is given it will also perform a lookup for new recipes for that food type should they not be present in the database already.

An example response will look like:
```HTTP
status: 200
body:

[
    {
        "id": 8,
        "name": "Twistin’ Chicken",
        "calories": 708,
        "imageUrl": "https://www.edamam.com/web-img/245/245252a20f66378b825b918781a422b4.jpg",
        "recipeUrl": "http://www.cookstr.com/recipes/twistinrsquo-chicken",
        "ingredients": [
            {
                "name": "2 egg whites",
                "quantity": 52
            },
            {
                "name": "2 boneless, skinless chicken breasts , or 1 pound chicken tenders",
                "quantity": 544
            },
            {
                "name": "juice from ½ lemon",
                "quantity": 29
            },
            {
                "name": "2 teaspoons cornstarch",
                "quantity": 5
            }
        ]
    },
    {...}
]
```
