import React, { useState, useEffect, useRef } from 'react';

import Card from '../../UI/Card/Card';
import './Search.css';

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const inputRef = useRef()
  const [getInput, setInput] = useState('');

  useEffect(() => {
    setTimeout(() => {
      if (getInput === inputRef.current.value) {
        const query = getInput.length === 0 ? '' : `?orderBy="title"&equalTo="${getInput}"`;
        // console.log(query);
        fetch('https://react-hooks-skeleton-default-rtdb.firebaseio.com/ingredients.json' + query)
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
            onLoadIngredients(loadedIngredients);
          }).catch(errorCallback => {
            console.log(errorCallback);
          })
      }
    }, 500);
    return (() => {
      clearTimeout();
    })
  }, [getInput, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={getInput}
            onChange={(event) => setInput(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
