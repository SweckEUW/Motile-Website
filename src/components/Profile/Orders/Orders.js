import './Orders.css'
import '../Profile.css'
import ServerRequest from '../../../services/ServerRequest'
import React, {useState, useEffect, useContext} from 'react';
import {Context} from '../../../Store.js'
import OrderComponent from './OrderComponent/OrderComponent'
import {CSSTransition} from 'react-transition-group';
import history from '../../../services/RouterHistory.js';

const Orders = () => {
    const [state, setState] = useContext(Context);
    const [orders, setOrders] = useState([]);

    useEffect(() =>{ 
        document.title = "Motile - Bestellungen"
        getOrders();
    }, [state]);

    async function getOrders(){
        let ordersResponse = await ServerRequest.getUserConfigurations();
        console.log(ordersResponse.data.message);
        if(ordersResponse.data.success)
            setOrders(ordersResponse.data.configs.configs.filter(config => config.bought === true))
        else
            setOrders([])
    }

    return (
        <div className="Orders pr-page">

            <h1 className="pr-title">Bestellungen</h1>

            {orders.map((order,index) =>{return(
                <OrderComponent key={index} order={order}/>
            )})}

            <CSSTransition in={orders.length == 0} unmountOnExit timeout={0}>
                <div className='or-no-orders'>
                    <div className="or-no-orders-text">Keine bestellten Geräte gefunden.</div>
                    <div className="or-button" onClick={() =>{history.push({pathname: '/Konfigurator'})}}>Erstelle eine neue Konfiguration</div>
                </div>
            </CSSTransition>

        </div>
    )
}

export default Orders
