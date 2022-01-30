import React, {useState, useEffect} from 'react';
import ServerRequest from './services/ServerRequest';


export const ShoppingCartContext = React.createContext();

const ShoppingCartStore = ({ children }) => {
    const [inShoppingCart, setShoppingCartItems] = useState(() => {
        const localData = localStorage.getItem('items');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(()=>{
        localStorage.setItem('items', JSON.stringify(inShoppingCart));
    }, [inShoppingCart])

    return(
        <ShoppingCartContext.Provider value ={[inShoppingCart, setShoppingCartItems]}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartStore;