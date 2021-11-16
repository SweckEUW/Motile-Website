import './Configurations.css'
import '../Profile.css'
import ServerRequest from '../../../services/ServerRequest'
import React, {useState, useEffect, useContext} from 'react';
import {Context} from '../../../Store.js'

const Configurations = () => {
    const [state, setState] = useContext(Context);
    const [configurations, setConfigurations] = useState([]);

    useEffect(() =>{ 
        document.title = "Motile - Geräte"
        getConfigurations();
    }, [state]);

    async function getConfigurations(){
        let configurationsResponse = await ServerRequest.getUserConfigurations();
        console.log(configurationsResponse.data.message);
        if(configurationsResponse.data.success)
            setConfigurations(configurationsResponse.data.configs.configs)
        else
            setConfigurations([])
    }

    return (
        <div className="Configurations pr-page">

            <h1 className="pr-title">Geräte</h1>
            
            <div className="cf-block">

                <div className="cf-owned">
                    <span className="cf-title">Meine Geräte</span>
                    {configurations.filter(configuration => configuration.bought).map((configuration,index) =>{return(
                        <div key={index} className="cf-configuration">
                            <img src={configuration.thumbnail} alt=""/>
                            <div className="cf-name">{configuration.name}</div>
                            <div className="cf-info">{'gekauft '+configuration.orderDate}</div>
                            <div className="cf-button cf-upgrade">Upgrade</div>
                            <div className="cf-link">Details anzeigen &gt;</div>
                        </div>
                    )})}
                </div>
                
                <div className="cf-saved">
                    <span className="cf-title">gespeicherte Geräte</span>
                    <div className="cf-saved-configurations">
                        {configurations.filter(configuration => !configuration.bought).map((configuration,index) =>{return(
                            <div key={index} className="cf-configuration cf-saved-configuration">
                                <img src={configuration.thumbnail} alt=""/>
                                <div className="cf-name">{configuration.name}</div>
                                <div className="cf-info">{configuration.price}</div>
                                <div className="cf-button">In den Warenkorb</div>
                                <div className="cf-link-container">
                                    <span className="cf-link">bearbeiten</span>
                                    <span className="cf-link">löschen</span>
                                </div>
                            </div>
                        )})} 
                    </div>
                </div>
                 
            </div>
            
        </div>
    )
}

export default Configurations
