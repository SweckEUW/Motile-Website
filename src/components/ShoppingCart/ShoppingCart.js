import './ShoppingCart.css'
import ServerRequest from '../../services/ServerRequest'
import {ShoppingCartContext} from '../../ShoppingCartStore'
import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import OrderComponent from '../Profile/Orders/OrderComponent/OrderComponent'

const Orders = () => {
    const [inShoppingCart, setShoppingCartItems] = useContext(ShoppingCartContext);

    useEffect(() =>{ 
        document.title = "Motile - Bestellungen"
    }, []);

    let deleteItemCallback = (childData) =>{
        let filteredItems = inShoppingCart.filter(item => item.number === childData);
        let shoppingCartCopy = [...inShoppingCart];
        shoppingCartCopy.splice(shoppingCartCopy.indexOf(filteredItems[0]), 1);

        setShoppingCartItems([...shoppingCartCopy]);
    }

    return (
        <div className="ShoppingCart pr-page">

            <h1 className="pr-title">Warenkorb</h1>

            {inShoppingCart.map((order,index) =>{return(
                <OrderComponent key={index} order={order} isShoppingCartItem={true} buttonCallback={deleteItemCallback}/>
            )})}

            <div className="sc-sum">
                <p>{'Summe (' + inShoppingCart.length + ' Artikel): ' + inShoppingCart.reduce((sum, element) => sum + parseFloat(element.price.match(/\d+/)[0]), 0) + ' €'}</p>
            </div>

            <span className='sc-to-checkout'>
                {inShoppingCart.length > 0 ? (
                        <Link to="/Kasse" className="sc-to-checkout-link">
                            <div className={`sc-button  ${inShoppingCart.length <= 0 ? 'button-inactive' : 'button-active'}`}>Zur Kasse</div>         
                        </Link>
                    ) :
                    <div className={`sc-button  ${inShoppingCart.length <= 0 ? 'button-inactive' : 'button-active'}`}>Zur Kasse</div>
                }
            </span>
        </div>
    )
}

export default Orders
