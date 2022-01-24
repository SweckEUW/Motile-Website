import './Settings.css'
import '../Profile.css'
import Swiper, { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import ServerRequest from '../../../services/ServerRequest'
import React, { useState, useEffect, useContext } from 'react';
import EditProfile from './EditProfile/EditProfile.js'
import AddAddress from './AddAdress/AddAddress.js'
import { Context } from '../../../Store.js'

const Configurations = () => {
    const [state, setState] = useContext(Context);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserData();
        document.title = "Motile - Einstellungen"
        setTimeout(() => {
            new Swiper('#st-shipment-swiper', {
                modules: [Pagination],
                spaceBetween: 50,
                allowTouchMove: false,
                pagination: {
                    el: '#swiper-shipment-pagination',
                    clickable: true
                },
                observer: true
            });
        }, 10);
        setTimeout(() => {
            new Swiper('#st-payment-swiper', {
                modules: [Pagination],
                spaceBetween: 50,
                allowTouchMove: false,
                pagination: {
                    el: '#swiper-payment-pagination',
                    clickable: true
                },
                observer: true
            });
        }, 10);
    }, [state]);

    function toggleEditProfileDialogue(){
        document.dispatchEvent(new CustomEvent("toggleEditProfileDialogue"));
    }

    function toggleAddDressDialogue() {
        document.dispatchEvent(new CustomEvent("addAddressDialogueVisible"));
    }

    async function getUserData() {
        let userDataResponse = await ServerRequest.getUserData();
        console.log(userDataResponse.data.message);
        if (userDataResponse.data.success)
            setUserData(userDataResponse.data.userData)
        else
            setUserData(null)
    }

    async function deleteAddress(addressIndex) {
        console.log(userData.adresses[addressIndex].id);
        let removeAddressResponse = await ServerRequest.removeAddress(userData.adresses[addressIndex].id)

        if(removeAddressResponse.data.success)
            setState(state => ({...state}));
    }

    return (
        <div className="Settings grid-container">
            
            <h1 className="col-12 pr-title">Einstellungen</h1>
            <EditProfile userData={userData} updateState={setState}/>
            <AddAddress userData={userData} updateState={setState}/>

                <div className="col-12 st-acc">
                    <div className="st-acc-head">
                        <div className="col-4 col-m-6">
                            <img className="st-acc-pic" src={userData && userData.profilePic} alt="" />
                        </div>
                        <div className="col-8 col-m-6 st-acc-overview">
                            <h2>{userData && userData.firstName + " " + userData.lastName}</h2>
                            <button onClick={() =>{toggleEditProfileDialogue()}}>Profil bearbeiten</button>
                        </div>
                    </div>
                    <div className="st-acc-data">
                        <div className="st-acc-row">
                            <p className="col-4">E-Mail</p>
                            <p className="col-8">{userData && userData.email}</p>
                        </div>
                        <div className="st-acc-row">
                            <p className="col-4">Telefon</p>
                            <p className="col-8">{userData && userData.telephone}</p>
                        </div>
                    </div>
                </div>

                    <div className="col-6 st-shipment-pay-container">
                        <h3 className="col-12">Zahlungsmethoden</h3>
                        <div className="col-6">
                                <div id="st-payment-swiper" className="swiper">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="swiper-slide-content">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/640px-PayPal.svg.png" alt="" />
                                                <p>{userData && userData.email}</p>
                                            </div>
                                            <div className="st-delete">
                                                <span className="material-icons-outlined">delete</span>
                                                <span>Entfernen</span>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="swiper-slide-content">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/2560px-Visa_2021.svg.png" alt="" />
                                                <p>{userData && userData.firstName + " " + userData.lastName}</p>
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
                                <div id="st-shipment-swiper" className="swiper">
                                    <div className="swiper-wrapper">
                                        {userData ? userData.adresses.map((adress, index) => {
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

export default Configurations
