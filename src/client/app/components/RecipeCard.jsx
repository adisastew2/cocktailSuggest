import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import $ from 'jquery';


export class RecipeCard extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <ul className="card">
        <div className="cardInfo">
          <li className="cardTextBGcolor header">{this.props.recipe.name}</li>
          <li className="cardTextBGcolor">{this.props.recipe.imageUrl}</li>
          <div className="cardTextBGcolor cardIngredHeader">INGREDIENTS</div>
          <li className="cardTextBGcolor">{this.props.recipe.ingredients}</li>
          <Link to={`/recipes/${this.props.recipe.id}`} className="cardTextBGcolor">Go to recipe page</Link>
        </div>
      </ul>
    );
  }
}