import './Settings.css'
import '../Profile.css'
import Swiper, { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import ServerRequest from '../../../services/ServerRequest'
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../../Store.js'

const Configurations = () => {
    const [state, setState] = useContext(Context);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        document.title = "Motile - Einstellungen"
        getUserData();
        setTimeout(() => {
            new Swiper('#st-prv-swiper', {
                modules: [Pagination],
                spaceBetween: 50,
                allowTouchMove: false,
                pagination: {
                    el: '#swiper-pagination',
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
            setUserData([])
    }

    return (
        <div className="Settings pr-page">

            <h1 className="pr-title">Einstellungen</h1>

            <div className="st-block">
                <div className="st-acc">
                    <div className="st-acc-head">
                        <div className="st-acc-pic">
                            <img src={userData.profilePic} alt="" />
                        </div>
                        <div className="st-acc-overview">
                            <p>{userData.firstName + " " + userData.lastName}</p>
                            <button>Profil bearbeiten</button>
                        </div>
                    </div>
                    <div className="st-acc-data">
                        <div className="st-acc-row">
                            <p>E-Mail</p>
                            <p>benjaminjaeger.bj@gmail.com</p>
                        </div>
                        <div className="st-acc-row">
                            <p>Telefon</p>
                            <p>+49 1356 3345096</p>
                        </div>
                    </div>
                </div>
                <div className="st-prv-data">
                    <div className="st-prv-container">
                        <span>Zahlungsmethoden</span>
                        <div className="st-prv-options">

                        </div>
                    </div>
                    <div className="st-prv-container">
                        <span>Adressen</span>
                        <div className="st-prv-options">
                            <div className="st-prv-swipables">
                                <div id="st-prv-swiper" className="swiper">
                                    <div className="swiper-wrapper">
                                        {userData ? userData.adresses.map((adress, index) => {
                                            return (
                                                <span key={index} className="swiper-slide">
                                                    <div className="swiper-slide-content">
                                                        <div>{userData.firstName + ' ' + userData.lastName}</div>
                                                        <div>{adress.street}</div>
                                                        <div>{adress.city}</div>
                                                        <div>{adress.country}</div>
                                                    </div>
                                                    <div className="st-hr" />
                                                    <div className="st-delete">
                                                        <span className="material-icons">delete</span>
                                                        <span>Entfernen</span>
                                                    </div>
                                                </span>
                                            )
                                        }) : ""}
                                    </div>
                                </div>
                                <div id="swiper-pagination" />
                            </div>
                            <span className="st-adress-element st-addAdress">+ Neue Adresse hinzufügen</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configurations
