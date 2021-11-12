import './Settings.css'
import '../Profile.css'
import ServerRequest from '../../../services/ServerRequest'
import React, {useState ,useEffect} from 'react';

const Configurations = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() =>{ 
        getUserData();
    }, []);

    async function getUserData(){
        let userDataResponse = await ServerRequest.getUserData();
        console.log(userDataResponse.data.message);
        console.log(userDataResponse.data.userData);
        if(userDataResponse.data.success)
            setUserData(userDataResponse.data.userData)
    }

    return (
        <div className="Settings pr-page">

            <h1 className="pr-title">Einstellungen</h1>
            
            <div className="st-block">
                <div className="st-setting st-account">Kontoinformationen</div>
                <div className="st-setting st-payment">Zahlungsmethoden</div>
                <div className="st-setting">
                    <span>Adressen</span>
                    <div className="st-adresses">
                        {userData ? userData.adresses.map((adress,index) =>{return(
                            <span key={index} className="st-adress-element">
                                <div>{userData.firstName + ' ' + userData.lastName}</div>
                                <div>{adress.street}</div>
                                <div>{adress.city}</div>
                                <div>{adress.country}</div>
                                <div>{adress.telephone}</div>
                                <div className="st-hr"/>
                                <div className="st-delete">
                                    <span className="material-icons">delete</span>
                                    <span>Entfernen</span>
                                </div>
                            </span>
                        )}) : ""} 
                        <span className="st-adress-element st-addAdress">+ Neue Adresse hinzufügen</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configurations
