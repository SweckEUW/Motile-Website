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
            <div className="col-6 st-shipment-pay-container">
                        <h3 className="col-12">Zahlungsmethoden</h3>
                        <div className="col-6">
                                <div id="csd-payment-swiper" className="swiper">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="swiper-slide-content">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/640px-PayPal.svg.png" alt="" />
                                                <p>{props.userData && props.userData.email}</p>
                                            </div>
                                            <div className="st-delete">
                                                <span className="material-icons-outlined">delete</span>
                                                <span>Entfernen</span>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="swiper-slide-content">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/2560px-Visa_2021.svg.png" alt="" />
                                                <p>{props.userData && props.userData.firstName + " " + props.userData.lastName}</p>
                                            </div>
                                            <div className="st-delete">
                                                <span className="material-icons-outlined">delete</span>
                                                <span>Entfernen</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="swiper-payment-pagination" />
                            </div>
                            <div className="col-6">
                            <div className="st-addAdress">
                                <div className="st-addAdress-content">
                                    <div className="st-addAdress-add">
                                        <span className="material-icons-outlined st-addAdress-plus">add</span>
                                    </div>
                                    <div className="st-addAdress-add">
                                        <p>Neue Zahlungsmethode hinzufügen</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 st-shipment-pay-container">
                        <h3 className="col-12">Adressen</h3>
                        <div className="col-6">
                            <div className="st-prv-swipables">
                                <div id="csd-shipment-swiper" className="swiper">
                                    <div className="swiper-wrapper">
                                        {props.userData ? props.userData.adresses.map((adress, index) => {
                                            return (
                                                <span key={index} className="swiper-slide">
                                                    <div className="swiper-slide-content">
                                                        <p>{adress.firstName + ' ' + adress.lastName}</p>
                                                        <p>{adress.street}</p>
                                                        <p>{adress.city}</p>
                                                        <p>{adress.country}</p>
                                                    </div>
                                                    <div className="st-delete" onClick={() =>{deleteAddress(index)}}>
                                                        <span className="material-icons-outlined">delete</span>
                                                        <span>Entfernen</span>
                                                    </div>
                                                </span>
                                            )
                                        }) : ""}
                                    </div>
                                </div>
                                <div id="swiper-shipment-pagination" />
                            </div>
                            </div>
                            <div className="col-6">
                            <div className="st-addAdress" onClick={() =>{toggleAddDressDialogue()}}>
                                <div className="st-addAdress-content">
                                    <div className="st-addAdress-add">
                                        <span className="material-icons-outlined st-addAdress-plus">add</span>
                                    </div>
                                    <div className="st-addAdress-add">
                                        <p>Neue Adresse hinzufügen</p>
                                    </div>                                
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default CustomerDataSelector
