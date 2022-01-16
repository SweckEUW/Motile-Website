import './ShoppingCart.css'
import ServerRequest from '../../services/ServerRequest'
import React, {useState, useEffect} from 'react';
import OrderComponent from '../Profile/Orders/OrderComponent/OrderComponent'

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() =>{ 
        document.title = "Motile - Bestellungen"
        getOrders();
    }, []);

    async function getOrders(){
        let ordersResponse = await ServerRequest.getUserConfigurations();
        console.log(ordersResponse.data.message);
        if(ordersResponse.data.success)
            setOrders(ordersResponse.data.configs.configs.filter(config => config.bought === true))
        else
            setOrders([])
    }

    return (
        <div className="ShoppingCart pr-page">

            <h1 className="pr-title">Warenkorb</h1>

            {orders.map((order,index) =>{return(
                <OrderComponent key={index} order={order}/>
            )})}

            <div className="sc-sum">
                <p>{'Summe (' + orders.length + ' Artikel): ' + orders.reduce((sum, element) => sum + element.price, 0)}</p>
            </div>

            <span className='sc-to-checkout'>
                <div className='sc-button'>Zur Kasse</div>
            </span>

        </div>
    )
}

export default Orders
