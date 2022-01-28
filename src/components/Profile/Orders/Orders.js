import './Orders.css'
import '../Profile.css'
import ServerRequest from '../../../services/ServerRequest'
import React, {useState, useEffect, useContext} from 'react';
import {Context} from '../../../Store.js'
import OrderComponent from './OrderComponent/OrderComponent'
import history from '../../../services/RouterHistory.js';
import {CSSTransition} from 'react-transition-group';

const Orders = () => {
    const [state, setState] = useContext(Context);
    const [orders, setOrders] = useState([]);

    useEffect(() =>{ 
        document.title = "Motile - Bestellungen"
        getOrders();
    }, [state]);

    let billingCallback = (childData) =>{
        console.log(childData);
    }

    async function getOrders(){
        let ordersResponse = await ServerRequest.getUserConfigurations();
        console.log(ordersResponse.data.message);
        if(ordersResponse.data.success)
            setOrders(ordersResponse.data.configs.configs.filter(config => config.bought === true))
        else
            setOrders([])
    }

    return (
        <div className="Orders pr-page grid-container">

            <h1 className="col-12 pr-title">Bestellungen</h1>

            {orders.map((order,index) =>{return(
                <OrderComponent key={index} order={order} isShoppingCartItem={false} buttonCallback={billingCallback}/>
            )})}

            <CSSTransition in={orders.length == 0} unmountOnExit timeout={0}>   
                <div className="or-content">
                    <div className="col-12 or-text">Keine bestellten Geräte gefunden.</div>
                    <div className='col-4 cf-new' onClick={() =>{history.push({pathname: '/Konfigurator'})}}>
                        <h3 className="cf-title">new</h3>
                        <img className="cf-new-img" src={process.env.PUBLIC_URL+'/Assets/smartphone_size.svg'} alt="" />  
                        <div className='cf-name'>Neu</div>
                        <div className='cf-new-gray1'/>
                        <div className='cf-new-gray2'/>
                        <div className='cf-new-gray3'>
                            <div/>
                            <div/>
                        </div>
                    </div>
                </div>
            </CSSTransition>

        </div>
    )
}

export default Orders
