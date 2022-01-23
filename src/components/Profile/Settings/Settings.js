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
        <div className="Settings pr-page">
            
            <h1 className="pr-title">Einstellungen</h1>
            <EditProfile userData={userData} updateState={setState}/>

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
                <CustomerDataSelector userData={userData}/>
            </div>
        </div>
    )
}

export default Configurations
