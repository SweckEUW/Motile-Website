import React, {useState} from 'react';


export const ShoppingCartContext = React.createContext();

const ShoppingCartStore = ({ children }) => {
    const [inShoppingCart, setShoppingCartItems] = useState([]);

    return(
        <ShoppingCartContext.Provider value ={[inShoppingCart, setShoppingCartItems]}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartStore;