// import '../Profile/Orders/Orders.css'
// import '../Profile/Orders/Profile.css'
import ServerRequest from '../../services/ServerRequest'
import React, {useState, useEffect, useContext} from 'react';
import {Context} from '../../Store.js'

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

            <h1 className="pr-title">Warenkorb</h1>

            {orders.map((order,index) =>{return(
                <div key={index} className="or-block">

                    {/* <div className="or-row or-row-1">
                        <span className="or-date">{order.orderDate}</span>
                        <span className="or-number">{'Bestellnummer '+order.number}</span>
                    </div> */}

                    <div className="or-row or-row-2">
                        <img src={order.thumbnail} alt="" />
                        <span className="or-info">
                            <span className="or-name">{order.name}</span>
                            <span>Lieferung bis</span>
                            <span className="or-delivered">{order.deliverDate}</span>
                        </span>
                        <span className="or-buttons">
                            <div className="or-button">Aus Warenkorb entfernen</div>
                        </span> 
                    </div>

                    <div className="or-row or-row-3">
                        <span>Dieses Paket enthält:</span>
                        {order.parts.map((part,index) =>{return(
                            <span key={index} className="material-icons or-part-icon">{part.icon}</span>
                        )})}
                        <span className="material-icons or-dorpDown-icon">keyboard_arrow_down</span>
                    </div>

                    <div className="or-row or-row-4">
                        <span>{'Gesamt: '+order.price}</span>
                    </div>

                </div>
            )})}

        </div>
    )
}

export default Orders
