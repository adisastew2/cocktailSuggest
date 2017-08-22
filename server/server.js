var express = require('express');
var axios = require('axios');
const bodyParser = require('body-parser');
const db = require('../DB');

var app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../src/client/public'));


// currently not using this
app.get('/recipes', (req, res) => {
  //assuming req.body is a string
  db.getRecipes(req.body, (err, data)=>{
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/getRecipes', (req, res) => { 
  console.log('HELLO', req.body);

  var ingredientsTypedIn = req.body['array[]'];
  var ingredientsList = '';

  
  if (Array.isArray(ingredientsTypedIn)) {
  // if there are multiple ingredients typed in
    for (var i = 0; i < ingredientsTypedIn.length; i++){
      if ( i === ingredientsTypedIn.length - 1 ){
        ingredientsList += ingredientsTypedIn[i];
      } else {
        ingredientsList += ingredientsTypedIn[i] + ',';
      }
    }
  } else if (typeof ingredientsTypedIn === 'string') { 
    // if there is only one ingredint typed in
    ingredientsList += ingredientsTypedIn;
  }

  console.log("ingredientsList: ", ingredientsList);

  const fakeRecipes = [
    {
      id: 1,
      name: 'Margarita',
      ingredients: ['Tequila', 'Triple sec', 'Lime juice', 'Salt'],
      measurements: ['1 1/2 oz', '1/2 oz', '1 oz', '0 oz'],
      instructions: 'Rub rim of cocktail glass with lime juice, dip rim in salt. Shake all ingredients with ice, strain into the salt-rimmed glass, and serve.',
      imageUrl: "http://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg"

    },
    {
      id: 2,      
      name: 'Margarita#2',
      ingredients: ['Tequila', 'Triple sec', 'Lemon juice', 'Salt'],
      measurements: ['1 1/2 oz', '1/2 oz', '1 oz', '0 oz'],
      instructions: 'Rub rim of margarita glass with lemon juice, dip rim in salt. Shake all ingredients with ice, strain into the salt-rimmed glass, and serve. (See also Frozen Margarita.)',
      imageUrl: "null"

    },
    {
      id: 3,      
      name: 'BlueMargarita',
      ingredients: ['Tequila', 'Blue Curacao', 'Lime juice', 'Salt'],
      measurements: ['1 1/2 oz', '1 oz', '1 oz', 'Coarse'],
      instructions: 'Rub rim of cocktail glass with lime juice. Dip rim in coarse salt. Shake tequila, blue curacao, and lime juice with ice, strain into the salt-rimmed glass, and serve.',
      imageUrl: "http://www.thecocktaildb.com/images/media/drink/qtvvyq1439905913.jpg"

    },
    {
      id: 4,      
      name: 'PeachMargarita',
      ingredients: ['Tequila', 'Peach schnapps', 'Sweet and sour', 'Grenadine'],
      measurements: ['1 oz', '1 oz', '1 oz', 'dash'],
      instructions: 'Pour tequila, peach schnapps, and sweet & sour over ice. Add grenadine and stir slightly. The drink should fade from yellow to red. You can also put ingredients in a blender with ice for a frozen version.',
      imageUrl: "null"

    },
    {
      id: 5,
      name: 'MidoriMargarita',
      ingredients: ['Tequila', 'Triple sec', 'Lime juice', 'Midori melon liqueur', 'Salt'],
      measurements: ['1 1/2 oz', '1/2 oz', '1 oz fresh', '1/2 oz'],
      instructions: 'Moisten rim of cocktail glass with lime juice and dip in salt. Shake ingredients together, and pour into glass filled with crushed ice. Option: Mix above ingredients with one cup of ice in blender for a smooth, "granita" type drink.',
      imageUrl: "http://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg"

    }
  ]

  // res.status(201).send(fakeRecipes);


  db.getRecipes(ingredientsList, function(err, data){
    if ( err ) { 
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/ingredients', (req, res) => {

  const fakeIngredients = [
    {
      name: "Tequila"
    },
    {
      name: "Triple sec"
    },
    {
      name: "Lime juice"
    },
    {
      name: "Salt"
    },
  ];

  // res.status(200).send(fakeIngredients);

  db.getIngredients(function(err, data){
    if( err ) { res.status(500).send(err); }
    console.log('RYAN', data);
    res.send(data);
  });
});

app.get('/api/recipes/:id', (req, res) => {

  var fakeRecipePage = {
    id: 1,
    name: 'Margarita',
    ingredients: ['Tequila', 'Triple sec', 'Lime juice', 'Salt'],
    measurements: ['1 1/2 oz', '1/2 oz', '1 oz', '0 oz'],
    instructions: 'Rub rim of cocktail glass with lime juice, dip rim in salt. Shake all ingredients with ice, strain into the salt-rimmed glass, and serve.',
    imageUrl: "http://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg"

  }



  // res.status(200).send(fakeRecipePage);

  db.grabIdRecipe(req.params.id, function(err, data){
    if ( err ) { 
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });

});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
