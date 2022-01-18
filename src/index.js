import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './Store';
import ShoppingCartStore from './ShoppingCartStore'

ReactDOM.render(
  <Store>
    <ShoppingCartStore>
      <App/>
    </ShoppingCartStore>
  </Store>,
  document.getElementById('root')
);
