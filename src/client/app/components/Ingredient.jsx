import React from 'react';

const Ingredient = (props) => (
  <div>
    <li>{props.ingredient}, measures: {props.measure}.</li>   
  </div>
)

export default Ingredient; 