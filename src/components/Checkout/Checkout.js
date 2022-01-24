import './Checkout.css'
import ServerRequest from '../../services/ServerRequest'
import {Link} from "react-router-dom";
import Swiper, { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import React, {useState, useEffect, useContext} from 'react';
import { Context } from '../../Store'
import CustomerDataSelector from '../Profile/Settings/CustomerDataSelector/CustomerDataSelector';
import {ShoppingCartContext} from '../../ShoppingCartStore'

const Checkout = () => {
    const [state, setState] = useContext(Context);
    const [inShoppingCart, setShoppingCartItems] = useContext(ShoppingCartContext);
    const [userData, setUserData] = useState(null);
    const [selectedPaymentMethod, setPaymentMethod] = useState(null);
    const [selectedAdress, setAdress] = useState(null);
    const [orders, setOrders] = useState([]);

    let paymentCallback = (childData) =>{
        setPaymentMethod(childData);
    }

    let adressCallback = (childData) =>{
        setAdress(childData);
    }

    useEffect(() => {
        getOrders()
        getUserData();
        document.title = "Motile - Kasse";
        setTimeout(() => {
            new Swiper('#co-product-swiper', {
                modules: [Pagination],
                spaceBetween: 50,
                allowTouchMove: false,
                pagination: {
                    el: '#swiper-product-pagination',
                    clickable: true
                },
                observer: true
            });
        }, 10);
    }, [state]);

    async function getUserData() {
        let userDataResponse = await ServerRequest.getUserData();
        console.log(userDataResponse.data.message);
        if (userDataResponse.data.success)
            setUserData(userDataResponse.data.userData)
        else
            setUserData(null)
    }

    async function getOrders(){
        let ordersResponse = await ServerRequest.getUserConfigurations();
        console.log(ordersResponse.data.message);
        if(ordersResponse.data.success)
            setOrders(ordersResponse.data.configs.configs)
        else
            setOrders([])
    }


    async function orderProducts() {
        let shoppingCartNumbers = inShoppingCart.map((order, index) => order.number);
    
        const toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index)
        function countInArray(array, what) {
            return array.filter(item => item == what).length;
        }
        
        const duplicateShoppingCartItems = toFindDuplicates(shoppingCartNumbers);
        let uniqueDuplicates = [...new Set(duplicateShoppingCartItems)];
        let uniqueShoppingCartNumbers =  [...new Set(shoppingCartNumbers)];

        for (let uniqueShoppingCartNumber of uniqueShoppingCartNumbers) {
            if (uniqueDuplicates.includes(uniqueShoppingCartNumber)) {
                let amount = countInArray(shoppingCartNumbers, uniqueShoppingCartNumber)
                let buyItemRequest = await ServerRequest.buyConfig(uniqueShoppingCartNumber);
                console.log(buyItemRequest.data.message);
                for (let i = 0; i < amount - 1; i++) {
                    let data = orders.filter(order => order.number === uniqueShoppingCartNumber)[0];
                    data.bought = true;
                    let saveResponse = await ServerRequest.saveUserConfiguration(data);
                    console.log(saveResponse.data.message);
                    console.log(saveResponse.data);
                }
            }
            else {
                let buyItemRequest = await ServerRequest.buyConfig(uniqueShoppingCartNumber);
                console.log(buyItemRequest.data.message) 
            }
        }

        setShoppingCartItems([]);
    }

    return (
        <div className="Checkout pr-page">
            <h1 className="pr-title">Kasse</h1>
            <div className="co-container">
                <CustomerDataSelector userData={userData} paymentCallback={paymentCallback} adressCallback={adressCallback}/>
                <div className="co-product-swipables">
                    <div id="co-product-swiper" className="swiper">
                        <div className="swiper-wrapper">
                            {inShoppingCart.map((order, index)=> {
                                return (
                                    <div key={index} className="swiper-slide">
                                        <div className="co-selected-product">
                                            <div className="co-product-img">
                                                <img src={order.thumbnail} alt="" />
                                            </div>
                                            <div className="co-product-info-container">
                                                <div className="product-info">
                                                    <span className='co-product-name'>{order.name}</span>
                                                    <p>{order.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div id="swiper-product-pagination" />

                    <Link to="/Kaufbestätigung" className="co-to-confirmation">
                        <div className="co-product-buy-button" onClick={orderProducts}>
                            Jetzt kaufen
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Checkout
