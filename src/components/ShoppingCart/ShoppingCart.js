// import '../Profile/Orders/Orders.css'
// import '../Profile/Orders/Profile.css'
import './ShoppingCart.css'
import ServerRequest from '../../services/ServerRequest'
import React, {useState, useEffect, useContext} from 'react';
import {Context} from '../../Store.js'

const Orders = () => {
    const [state, setState] = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [dropdownIsActive, setDropdownActive] = useState(true); 

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

    function toggleDropdown(){
        setDropdownActive(!dropdownIsActive);
    }

    return (
        <div className="Orders pr-page">

            <h1 className="pr-title">Warenkorb</h1>

            {orders.map((order,index) =>{return(
                <div key={index} className="sc-block">

                    {/* <div className="sc-row sc-row-1">
                        <span className="or-date">{order.orderDate}</span>
                        <span className="sc-number">{'Bestellnummer '+order.number}</span>
                    </div> */}

                    <div className="sc-row sc-row-2">
                        <img src={order.thumbnail} alt="" />
                        <div className="sc-info">
                            <span className="sc-name">{order.name}</span>
                            <span className="sc-delivered">
                                <span>Lieferung bis</span>
                                <span>{order.deliveryDate}</span>
                            </span>
                        </div>
                        <span className="sc-buttons">
                            <div className="sc-button">Aus Warenkorb entfernen</div>
                        </span> 
                    </div>

                    <div className="sc-row sc-row-3">
                        <span>Dieses Paket enthält:</span>
                        {order.parts.map((part,index) =>{return(
                            <span key={index} className="material-icons sc-part-icon">{part.component.metaData.icon}</span>
                        )})}
                        <span className="material-icons sc-dorpDown-icon" onClick={toggleDropdown}>{dropdownIsActive ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</span>
                    </div>
                    {dropdownIsActive ? (
                        <div className="sc-part-rows">
                            {orders.map((order,index) =>{return(
                                order.parts.map((part,index) =>{return(
                                    <div className="sc-part-row">
                                        <div className="sc-part-name">
                                            <p className="material-icons sc-part-icon">{part.component.metaData.icon}</p>
                                            <p>{part.component.name}</p>
                                        </div>
                                        <p className='sc-part-info'>Snapdragon 750     16GB RAM</p>
                                        <p className='sc-part-price'>{part.component.metaData.price}</p>
                                    </div>
                                )})
                            )})}
                        </div>
                    ) : (
                        <div></div>
                    )}

                    <div className="sc-row sc-row-4">
                        <span>{'Gesamt: '+order.price}</span>
                    </div>

                </div>
            )})}

            <div className="sc-sum">
                <p>{'Summe (' + orders.length + ' Artikel): ' + orders.reduce((sum, element) => sum + element.price, 0)}</p>
            </div>

            <span className='sc-to-checkout'>
                <div className='sc-button'>
                        Zur Kasse
                </div>
            </span>

        </div>
    )
}

export default Orders
