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
        <div className="Orders pr-page">

            <h1 className="pr-title">Bestellungen</h1>

            {orders.map((order,index) =>{return(
                <OrderComponent key={index} order={order} isShoppingCartItem={false} buttonCallback={billingCallback}/>
            )})}

            <CSSTransition in={orders.length == 0} unmountOnExit timeout={0}>   
                <div>
                    <div className="or-text">Keine bestellten Geräte gefunden.</div>
                    <div className='or-new' onClick={() =>{history.push({pathname: '/Konfigurator'})}}>
                        <img className="or-new-img" src={process.env.PUBLIC_URL+'/Assets/smartphone_size.svg'} alt="" />  
                        <div className='or-new-text'>Neu</div>
                        <div className='or-new-gray1'/>
                        <div className='or-new-gray2'/>
                        <div className='or-new-gray3'>
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
