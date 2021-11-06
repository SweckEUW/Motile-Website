import './Configurations.css'
import ServerRequest from '../../services/ServerRequest'
import React, {useState ,useEffect} from 'react';

const Configurations = () => {
    const [configurations, setConfigurations] = useState([]);

    useEffect(() =>{ 
        getConfigurations();
    }, []);

    async function getConfigurations(){
        let configurationsResponse = await ServerRequest.getMotileConfigurations();
        console.log(configurationsResponse.data.message);
        if(configurationsResponse.data.success)
            setConfigurations(configurationsResponse.data.configs.configs)
    }

    return (
        <div className="Configurations">
           {configurations.map((configuration,index) =>{return(
                <div key={index} className="cf-block">
                    <div className="">{configuration.cpu}</div>
                    <div className="">{configuration.camera}</div>
                    <div className="">{configuration.dac}</div>
                    <div className="">{configuration.battery}</div>
                </div>
            )})}
            <h1>{configurations.length ? '' : 'Bitte Anmelden'}</h1>
        </div>
    )
}

export default Configurations
