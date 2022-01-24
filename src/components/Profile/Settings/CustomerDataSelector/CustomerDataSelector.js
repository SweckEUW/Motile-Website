import './CustomerDataSelector.css'
import Swiper, { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import ServerRequest from '../../../../services/ServerRequest'
import React, { useState, useEffect, useContext } from 'react';
import EditProfile from '../EditProfile/EditProfile.js'
import AddAddress from '../AddAdress/AddAddress'
import { Context } from '../../../../Store'

const CustomerDataSelector = (props) => {
    const [state, setState] = useContext(Context);
    let shipmentSwiper;
    let paymentSwiper;

    useEffect(() => {
        setTimeout(() => {
            shipmentSwiper = new Swiper('#csd-shipment-swiper', {
                modules: [Pagination],
                spaceBetween: 50,
                allowTouchMove: false,
                pagination: {
                    el: '#swiper-shipment-pagination',
                    clickable: true
                },
                observer: true
            });
            shipmentSwiper.on('slideChange', function () {
               props.adressCallback ? props.adressCallback(this.activeIndex) : console.log('kein Adresscallback gegeben');
            })
        }, 10);
        setTimeout(() => {
            paymentSwiper = new Swiper('#csd-payment-swiper', {
                modules: [Pagination],
                spaceBetween: 50,
                allowTouchMove: false,
                pagination: {
                    el: '#swiper-payment-pagination',
                    clickable: true
                },
                observer: true
            });
            paymentSwiper.on('slideChange', function () {
                props.adressCallback ? props.paymentCallback(this.activeIndex) : console.log('kein Paymentcallback gegeben');
             })
        }, 10);
    }, [state]);


    function toggleAddDressDialogue() {
        document.dispatchEvent(new CustomEvent("addAddressDialogueVisible"));
    }

    async function deleteAddress(addressIndex) {
        console.log(props.userData.adresses[addressIndex].id);
        let removeAddressResponse = await ServerRequest.removeAddress(props.userData.adresses[addressIndex].id)

        if(removeAddressResponse.data.success)
            setState(state => ({...state}));
    }

    return (
        <div className="CustomerDataSelector">
            
            <AddAddress userData={props.userData} updateState={setState}/>

            <div className="csd-shipment-pay">
                <div className="csd-shipment-pay-container">
                    <span>Zahlungsmethoden</span>
                    <div className="csd-shipment-pay-options">
                        <div className="csd-shipment-pay-swipables">
                            <div id="csd-payment-swiper" className="swiper">
                                <div className="swiper-wrapper">
                                    {props.userData && props.userData.paymentMethods ? props.userData.paymentMethods.map((option, index) => {
                                        return (
                                            <span key={index} className="swiper-slide">
                                                <div className="csd-payment-method">
                                                    <img src={option.previewImg} alt="" />
                                                    <div>{option.user}</div>
                                                </div>
                                                <div className="csd-delete">
                                                    <span className="material-icons">delete</span>
                                                    <span>Entfernen</span>
                                                </div>
                                            </span>
                                        )
                                    }): ""}
                                </div>
                            </div>
                            <div id="swiper-payment-pagination" />
                        </div>
                        <div className="csd-addAdress">
                            <div className="csd-addAdress-plus">+</div>
                            <div>Neue <br /> Zahlungsmethode <br /> hinzufügen</div>
                        </div>
                    </div>
                </div>
                <div className="csd-shipment-pay-container">
                    <span>Adressen</span>
                    <div className="csd-shipment-pay-options">
                        <div className="csd-prv-swipables">
                            <div id="csd-shipment-swiper" className="swiper">
                                <div className="swiper-wrapper">
                                    {props.userData ? props.userData.adresses.map((adress, index) => {
                                        return (
                                            <span key={index} className="swiper-slide">
                                                <div className="swiper-slide-content">
                                                    <div>{adress.firstName + ' ' + adress.lastName}</div>
                                                    <div>{adress.street}</div>
                                                    <div>{adress.city}</div>
                                                    <div>{adress.country}</div>
                                                </div>
                                                <div className="csd-delete" onClick={() =>{deleteAddress(index)}}>
                                                    <span className="material-icons">delete</span>
                                                    <span>Entfernen</span>
                                                </div>
                                            </span>
                                        )
                                    }) : ""}
                                </div>
                            </div>
                            <div id="swiper-shipment-pagination" />
                        </div>
                        <div className="csd-addAdress" onClick={() =>{toggleAddDressDialogue()}}>
                            <div className="csd-addAdress-plus">+</div>
                            <div>Neue Adresse hinzufügen</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerDataSelector
