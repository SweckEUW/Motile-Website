import '../SettingModals.css'
import {CSSTransition} from 'react-transition-group';
import React, { useState, useCallback } from 'react';
import ServerRequest from '../../../../services/ServerRequest';
import { v4 as uuidv4 } from 'uuid';

const AddAdress = (props) => {
    const [addAddressDialogueVisible, setAddAddressDialogueVisible] = useState(false);
    const [dummyData, setDummyData] = useState({
        firstName: "Vorname",
        lastName: "Nachname",
        street: "Musterstraße 8",
        city: "12345 Musterstadt",
        country: "Deutschland"
    })

    document.addEventListener("addAddressDialogueVisible", toggleAddAddressDialogueVisible);
    function toggleAddAddressDialogueVisible() {
        setAddAddressDialogueVisible(!addAddressDialogueVisible);
    }

    async function saveAdress() {
        let firstName = document.getElementById("st-mod-firstname").value
        let lastName = document.getElementById("st-mod-lastname").value
        let street = document.getElementById("st-mod-street").value
        let city = document.getElementById("st-mod-city").value
        let country = document.getElementById("st-mod-country").value
    
        let addAddressResponse = await ServerRequest.addAddress({
            id: uuidv4(),
            firstName: firstName,
            lastName: lastName,
            street: street,
            city: city,
            country: country
        });

        if(addAddressResponse.data.success)
            toggleAddAddressDialogueVisible();
            props.updateState(state => ({...state}));
    }

    return (
        <div className="AddAdress">
            <CSSTransition in={addAddressDialogueVisible} classNames="fade" timeout={400} unmountOnExit>
                <div className="st-mod-dialogue">
                    <div className="st-mod-container">
                        <h1 className="st-mod-title">Neue Adresse</h1>

                        <div className="st-mod-close-button" onClick={() =>{toggleAddAddressDialogueVisible()}}>
                            <span className="material-icons">close</span>
                        </div>

                        <div className="st-mod-input">
                            <div className="st-mod-input-info">
                                <p className="st-mod-form-title">Vorname</p>
                            </div>
                            <input id="st-mod-firstname" className="st-mod-form-input" type="text" defaultValue={dummyData.firstName}/>
                        </div>

                        <div className="st-mod-input">
                            <div className="st-mod-input-info">
                                <p className="st-mod-form-title">Nachname</p>
                            </div>
                            <input id="st-mod-lastname" className="st-mod-form-input" type="text" defaultValue={dummyData.lastName}/>
                        </div>

                        <div className="st-mod-input">
                            <div className="st-mod-input-info">
                                <p className="st-mod-form-title">Straße und Hausnummer</p>
                            </div>
                            <input id="st-mod-street" className="st-mod-form-input" type="text" defaultValue={dummyData.street}/>
                        </div>

                        <div className="st-mod-input">
                            <div className="st-mod-input-info">
                                <p className="st-mod-form-title">PLZ und Stadt</p>
                            </div>
                            <input id="st-mod-city" className="st-mod-form-input" type="text" defaultValue={dummyData.city}/>
                        </div>

                        <div className="st-mod-input">
                            <div className="st-mod-input-info">
                                <p className="st-mod-form-title">Land</p>
                            </div>
                            <input id="st-mod-country" className="st-mod-form-input" type="text" defaultValue={dummyData.country}/>
                        </div>

                        <div className="st-mod-confirm" onClick={() =>{saveAdress()}}>
                            <span>Speichern</span>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default AddAdress
