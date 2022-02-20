import React, { useState, useEffect, useCallback } from 'react';
import IngredientForm from '../Ingredients/IngredientForm/IngredientForm';
import IngredientList from '../Ingredients/IngredientList/IngredientList';
import Search from './Search/Search';

const Ingredients = (props) => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react-hooks-skeleton-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => {
        return response.json()
      }).then(responseData => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(loadedIngredients);
      }).catch(errorCallback => {
        console.log(errorCallback);
      })
  }, []);


  useEffect(() => {
    // console.log(userIngredients);
  })


  const addIngredientHandler = (el) => {
    fetch('https://react-hooks-skeleton-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(el),
      headers: { 'Content-Type': 'application/json' }
    }).then(successCallback => {
      return successCallback.json();
    }).then(responseData => {
      setUserIngredients((oldIngredients) =>
        [...oldIngredients, { id: responseData.name, ...el }])
    }).catch(errorCallback => {
      console.log(errorCallback);
    });
  }

  const ehhe = useCallback((elem) => {
    setUserIngredients(elem);
  }, []);
  const removeIngredientHandler = (id) => {
    fetch(`https://react-hooks-skeleton-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(response => {
      setUserIngredients((oldIngredients) => {
        return (oldIngredients.filter(elem => elem.id !== id));
      })
    })
  }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={ehhe} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
