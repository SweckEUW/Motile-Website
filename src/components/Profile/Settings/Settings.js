import './Settings.css'
import '../Profile.css'
import ServerRequest from '../../../services/ServerRequest'
import React, { useState, useEffect, useContext } from 'react';
import EditProfile from './EditProfile/EditProfile.js'
import AddAddress from './AddAdress/AddAddress.js'
import CustomerDataSelector from './CustomerDataSelector/CustomerDataSelector';
import { Context } from '../../../Store.js'

const Configurations = () => {
    const [state, setState] = useContext(Context);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserData();
        document.title = "Motile - Einstellungen"
    }, [state]);

    function toggleEditProfileDialogue(){
        document.dispatchEvent(new CustomEvent("toggleEditProfileDialogue"));
    }

    async function getUserData() {
        let userDataResponse = await ServerRequest.getUserData();
        console.log(userDataResponse.data.message);
        if (userDataResponse.data.success)
            setUserData(userDataResponse.data.userData)
        else
            setUserData(null)
    }

    return (
        <div className="Settings grid-container">
            
            <h1 className="col-12 pr-title">Einstellungen</h1>
            <EditProfile userData={userData} updateState={setState}/>

                <div className="col-12 st-acc">
                    <div className="st-acc-head">
                        <div className="col-4 col-m-6">
                            <div className="st-acc-pic-container">
                                <img className="st-acc-pic" src={userData && userData.profilePic} alt="" />
                            </div>
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
                <CustomerDataSelector userData={userData}/>
        </div>
    )
}

export default Configurations
