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
        <div className="Settings pr-page">
            
            <h1 className="pr-title">Einstellungen</h1>
            <EditProfile userData={userData} updateState={setState}/>
            <AddAddress userData={userData} updateState={setState}/>

            <div className="st-block">
                <div className="st-acc">
                    <div className="st-acc-head">
                        <div className="st-acc-pic">
                            <img src={userData && userData.profilePic} alt="" />
                        </div>
                        <div className="st-acc-overview">
                            <p>{userData && userData.firstName + " " + userData.lastName}</p>
                            <button onClick={() =>{toggleEditProfileDialogue()}}>Profil bearbeiten</button>
                        </div>
                    </div>
                    <div className="st-acc-data">
                        <div className="st-acc-row">
                            <p>E-Mail</p>
                            <p>{userData && userData.email}</p>
                        </div>
                        <div className="st-acc-row">
                            <p>Telefon</p>
                            <p>{userData && userData.telephone}</p>
                        </div>
                    </div>
                </div>
                <div className="st-shipment-pay">
                    <div className="st-shipment-pay-container">
                        <span>Zahlungsmethoden</span>
                        <div className="st-shipment-pay-options">
                            <div className="st-shipment-pay-swipables">
                                <div id="st-payment-swiper" className="swiper">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="st-payment-method">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/640px-PayPal.svg.png" alt="" />
                                                <div>anna_tanke@gmx.de</div>
                                            </div>
                                            <div className="st-delete">
                                                <span className="material-icons">delete</span>
                                                <span>Entfernen</span>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="st-payment-method">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/2560px-Visa_2021.svg.png" alt="" />
                                                <div>Benjamin Jäger</div>
                                            </div>
                                            <div className="st-delete">
                                                <span className="material-icons">delete</span>
                                                <span>Entfernen</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="swiper-payment-pagination" />
                            </div>
                            <div className="st-addAdress">
                                <div className="st-addAdress-plus">+</div>
                                <div>Neue <br /> Zahlungsmethode <br /> hinzufügen</div>
                            </div>
                        </div>
                    </div>
                    <div className="st-shipment-pay-container">
                        <span>Adressen</span>
                        <div className="st-shipment-pay-options">
                            <div className="st-prv-swipables">
                                <div id="st-shipment-swiper" className="swiper">
                                    <div className="swiper-wrapper">
                                        {userData ? userData.adresses.map((adress, index) => {
                                            return (
                                                <span key={index} className="swiper-slide">
                                                    <div className="swiper-slide-content">
                                                        <div>{adress.firstName + ' ' + adress.lastName}</div>
                                                        <div>{adress.street}</div>
                                                        <div>{adress.city}</div>
                                                        <div>{adress.country}</div>
                                                    </div>
                                                    <div className="st-delete" onClick={() =>{deleteAddress(index)}}>
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
                            <div className="st-addAdress" onClick={() =>{toggleAddDressDialogue()}}>
                                <div className="st-addAdress-plus">+</div>
                                <div>Neue Adresse hinzufügen</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configurations
