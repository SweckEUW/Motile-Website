import './Configurations.css'
import '../Profile.css'
import ServerRequest from '../../../services/ServerRequest'
import React, {useState ,useEffect} from 'react';

const Configurations = () => {
    // const [configurations, setConfigurations] = useState([]);

    useEffect(() =>{ 
        getConfigurations();
    }, []);

    async function getConfigurations(){
        let configurationsResponse = await ServerRequest.getMotileConfigurations();
        console.log(configurationsResponse.data.message);
        console.log(configurationsResponse.data.configs);
        // if(configurationsResponse.data.success)
        //     setConfigurations(configurationsResponse.data.configs.configs)
    }

    let configurations = [
        {
            bought: true,
            name: "Walter",
            price: "250 €",
            date: "10/2021",
            thumbnail: process.env.PUBLIC_URL+'/Assets/phone_placeholder.png',
        },

        {
            bought: false,
            name: "Manfred",
            price: "350 €",
            date: "10/2021",
            thumbnail: process.env.PUBLIC_URL+'/Assets/phone_placeholder.png',
        },

        {
            bought: false,
            name: "Rüdiger",
            price: "350 €",
            date: "10/2021",
            thumbnail: process.env.PUBLIC_URL+'/Assets/phone_placeholder.png',
        },
    ]

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
                            <div className="cf-info">{'gekauft '+configuration.date}</div>
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
