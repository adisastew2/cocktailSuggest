import React from 'react';
import Ingredient from './Ingredient.jsx';
import $ from 'jquery';


class RecipePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      recipe: {
        id: 0,
        name: '',
        imageUrl: '',
        ingredients: [],
        measurements: [],
        instructions: ''
      }
    }
    this.getRecipePage = this.getRecipePage.bind(this);
    this.getRecipePage();
  }

  getRecipePage() {
    console.log('params: ', this.props.match.params.id);

    var self = this;

    $.ajax({
      method: 'GET',
      url: '/api/recipes/' + this.props.match.params.id,
      dataType: 'json',
      success: function(data) {
        console.log('getRecipePage data: ', data);
        self.setState({
          recipe: data
        });
      },
      error: function(err) {
        console.log('error in getRecipePage: ', err);
      }
    });
  }


  render() {
    console.log(this.state.recipe);

    return (
      <div>
        <h1>{this.state.recipe.name}</h1>
        <img src={this.state.recipe.imageUrl}></img>
        <h3>Ingredients: </h3>
        <ol>
          {this.state.recipe.ingredients.map((ingredient, index) => 
            <Ingredient ingredient={ingredient} measure={this.state.recipe.measurements[index]} key={index} />
          )}
        </ol>
        <h3>How to make it:</h3>
        <p>{this.state.recipe.instructions}</p>
      </div>
    );
  }
}



export default RecipePage; 