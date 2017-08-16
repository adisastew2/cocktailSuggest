import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export class SelectBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: '',
      vetIngredients: [],
      ingredNotFound: false
    };

    this.updateText = this.updateText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    var vettedIngredients = [];
    //remove white spaces 
    var refactorText = this.state.text;
    refactorText = refactorText.replace(/\s/g,'');
    var self = this;

    //check if ingredients exist in db
    $.ajax({
      url:'/ingredients',
      type: 'GET',
      success: function(data){
        //data is ingredients list from db
        //see which ingredients exist in db
        refactorText = refactorText.split(',');
        //item is user input
        //ingredient is list of ingredeients from db
        refactorText.forEach( function (item) {
          data.forEach( function (ingredient) {
            item = item.toLowerCase();
            if (item === ingredient.name.toLowerCase().replace(/\s/g,'')){
              //put vetted ingredients into array
              vettedIngredients.push(item);
              //remove error msg
              self.setState({ingredNotFound: false});
            }
          })
        })

        //pass vetted ingredients list to app component (this.state.ingredients in app component)
        self.props.handler(vettedIngredients);

        if ( vettedIngredients.length === 0 ){
          self.setState({ingredNotFound: true})
        }

        self.setState({vetIngredients: vettedIngredients});

      },
      error: function(data){
        console.log('get request FAILED', error);
      }
    })
  }

  //grab value from text box and set state on change
  updateText(e){
    this.setState({text: e.target.value});
  }

  render(){
    if (this.state.ingredNotFound === true){
       return(
        <div>
          Seperate ingredients by commas
          <form>
            <input type='text' placeholder='enter your ingredients' value={this.state.text} onChange={this.updateText}></input>
            <input type='submit' value='Submit' onClick={this.onSubmit}></input>
          </form>
          <p>No ingredients found matching query</p>
        </div>
      );
    } else if (this.state.vetIngredients[0] !== undefined){
      //render vetted ingredients list
      return(
        <div>
          Seperate ingredients by commas
          <form>
            <input type='text' placeholder='enter your ingredients' value={this.state.text} onChange={this.updateText}></input>
            <input type='submit' value='Submit' onClick={this.onSubmit}></input>
          </form>
          <p> Selected Ingredients <br/>
          (ingredients not available are not displayed)
          </p>
          <ul>
          {this.state.vetIngredients.map( (item, index) => {
            return(<li key={index} >{item}</li>)
          })}
          </ul>
        </div>
      );
    //render if no ingredients listed yet
    } else {
      return(
        <div>
          Seperate ingredients by commas
          <form>
            <input type='text' placeholder='enter your ingredients' value={this.state.text} onChange={this.updateText}></input>
            <input type='submit' value='Submit' onClick={this.onSubmit}></input>
          </form>
        </div>
      );
    }
  }
}