import React, { useState } from 'react';
import Card from '../../UI/Card/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
  const [imputName, setImputName] = useState('');
  const [inputAmount, setinputAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({ title: imputName, amount: inputAmount })
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>

          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text"
              id="title"
              value={imputName}
              onChange={event => { setImputName(event.target.value) }} />
          </div>

          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number"
              id="amount"
              value={inputAmount}
              onChange={event => { setinputAmount(event.target.value) }} />
          </div>

          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>

        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
