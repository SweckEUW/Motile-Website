import './ShoppingCart.css'
import ServerRequest from '../../services/ServerRequest'
import {ShoppingCartContext} from '../../ShoppingCartStore'
import React, {useContext, useEffect} from 'react';
import OrderComponent from '../Profile/Orders/OrderComponent/OrderComponent'

const Orders = () => {
    const [inShoppingCart, setShoppingCartItems] = useContext(ShoppingCartContext);

    useEffect(() =>{ 
        document.title = "Motile - Bestellungen"
    }, []);

    return (
        <div className="ShoppingCart pr-page">

            <h1 className="pr-title">Warenkorb</h1>

            {inShoppingCart.map((order,index) =>{return(
                <OrderComponent key={index} order={order}/>
            )})}

            <div className="sc-sum">
                <p>{'Summe (' + inShoppingCart.length + ' Artikel): ' + inShoppingCart.reduce((sum, element) => sum + parseFloat(element.price.match(/\d+/)[0]), 0) + ' €'}</p>
            </div>

            <span className='sc-to-checkout'>
                <div className='sc-button'>Zur Kasse</div>
            </span>

        </div>
    )
}

export default Orders
