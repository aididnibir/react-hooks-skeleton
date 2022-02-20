import React, { useContext } from 'react';
import Ingredients from '../src/components/Ingredients/Ingredients';
import Auth from './components/UI/Auth/Auth'
import { AuthContext } from './context/auth-context'

const App = (props) => {
  let content = <Auth />
  const authCheck = useContext(AuthContext);

  if (authCheck.isAuth) {
    content = <Ingredients />;
  }
  return content;
};

export default App;
