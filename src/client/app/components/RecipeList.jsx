import React from 'react';
import ReactDOM from 'react-dom';
import { RecipeCard } from './RecipeCard.jsx';
import $ from 'jquery';

/**
*Requests recipes from the db that contain the user inputted
*Renders recipe cards 
*/

export class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };

    this.getRecipes = this.getRecipes.bind(this);
    this.getRecipes();
  }

  //get recipes that have the user inputted ingredients in the recipe ingredients list from db
  getRecipes() {
    var self = this; 

    $.ajax({
      url: '/getRecipes',
      type: 'POST',
      data: {array: this.props.list},
      success: function(data) {
        //if only one recipe is returned data is an object
        //if more than one recipe is returned data is an array
        console.log('post success');
        if (Array.isArray(data)){
          self.setState({recipes: data})
        } else {
          self.setState({recipes: [data]})
        }
      },
      error: function(error) {
        console.log('error: ', error);
      }
    });
  }

  render() {
    //render if there is anything to render
    if ( this.state.recipes[0] !== undefined ) {
      return (
        <div>
        {
          this.state.recipes.map( (item, index) => {
            return (<RecipeCard key={index} recipe={item}/>);
          })
        }
        </div>
      );
    //if no input
    } else {
      return (<div></div>);
    }
    
  }
}