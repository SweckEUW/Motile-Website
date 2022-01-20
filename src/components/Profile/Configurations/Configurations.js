import './Configurations.css'
import '../Profile.css'
import ServerRequest from '../../../services/ServerRequest'
import React, {useState, useEffect, useContext} from 'react';
import {Context} from '../../../Store.js'
import {ShoppingCartContext} from '../../../ShoppingCartStore'
import history from '../../../services/RouterHistory.js';
import Swiper , { Pagination } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import {CSSTransition} from 'react-transition-group';

const Configurations = (props) => {
    const [state, setState] = useContext(Context);
    const [inShoppingCart, setShoppingCartItems] = useContext(ShoppingCartContext);
    const [configurations, setConfigurations] = useState([]);

    useEffect(() =>{ 
        document.title = "Motile - Geräte"
        getConfigurations();
        initSwipers();
    }, [state]);

    async function getConfigurations(){
        let configurationsResponse = await ServerRequest.getUserConfigurations();
        console.log(configurationsResponse.data.message);
        if(configurationsResponse.data.success)
            setConfigurations(configurationsResponse.data.configs.configs)
        else
            setConfigurations([])     
    }
    
    function initSwipers(){
        setTimeout(() => {
            new Swiper('#cf-Swiper-owned',{
                modules: [Pagination],
                spaceBetween: 50,
                allowTouchMove: false,
                pagination: {
                  el: '#cf-Swiper-owned-pagination',
                  clickable: true
                },
                observer: true
            });

            new Swiper('#cf-Swiper-saved',{
                modules: [Pagination],
                spaceBetween: 50,
                allowTouchMove: false,
                pagination: {
                  el: '#cf-Swiper-saved-pagination',
                  clickable: true
                },
                observer: true
            });


          }, 10);    
    }

    function addToShoppingCart(configuration) {
        setShoppingCartItems([...inShoppingCart, configuration])
    }

    function editeConfiguration(configuration){
        history.push({
            pathname: '/Konfigurator',
            state: {
                editMode: true,
                configuration: configuration
            }
        })
    }

    async function deleteConfiguration(configuration){
        let removeConfigurationResponse = await ServerRequest.removeUserConfiguration(configuration);
        console.log(removeConfigurationResponse.data.message);
        if(removeConfigurationResponse.data.success)
            getConfigurations();
    }

    return (
        <div className="Configurations pr-page">

            <h1 className="pr-title">Geräte</h1>
            
            <div className="cf-block">

                {/* Meine Geräte */}
                <CSSTransition in={configurations.filter(configuration => configuration.bought).length != 0} unmountOnExit timeout={0}>
                    <div className="cf-owned" style={{marginRight: configurations.filter(configuration => !configuration.bought).length != 0 ? '' : '0px'}}>
                        <span className="cf-title">Meine Geräte</span>
                        <div id="cf-Swiper-owned" className="swiper"> 
                            <div className="swiper-wrapper">
                                {configurations.filter(configuration => configuration.bought).map((configuration,index) =>{return(
                                    <div key={index} className="cf-configuration swiper-slide">
                                        <img className="cf-thumbnail" src={configuration.thumbnail ? configuration.thumbnail : "http://localhost:5000/Placeholder/phone_placeholder.png"} alt=""/>
                                        <div className="cf-name">{configuration.name}</div>
                                        <div className="cf-info">{'gekauft '+configuration.orderDate}</div>
                                        <div className="cf-button cf-upgrade" onClick={() =>{editeConfiguration(configuration)}}>Upgrade</div>
                                        <div className="cf-link">Details anzeigen &gt;</div>
                                    </div>
                                )})}
                            </div> 
                        </div>
                        <div id="cf-Swiper-owned-pagination"/>

                    </div>
                </CSSTransition>
                
                {/* Gespeicherte Geräte */}
                <CSSTransition in={configurations.filter(configuration => !configuration.bought).length != 0} unmountOnExit timeout={0}>
                    <div className="cf-saved">
                        <span className="cf-title">Gespeicherte Geräte</span>
                        <div id="cf-Swiper-saved" className="swiper"> 
                            <div className="swiper-wrapper">
                                {configurations.filter(configuration => !configuration.bought).map((configuration,index) =>{return(
                                    <div key={index} className="cf-configuration cf-saved-configuration swiper-slide">
                                        <img className="cf-thumbnail" src={configuration.thumbnail ? configuration.thumbnail : "http://localhost:5000/Placeholder/phone_placeholder.png"} alt=""/>
                                        <div className="cf-name">{configuration.name}</div> 
                                        <div className="cf-info">{configuration.price}</div>
                                        <div className="cf-button" onClick={() => addToShoppingCart(configuration)}>In den Warenkorb</div>
                                        <div className="cf-link-container">
                                            <span className="cf-link" onClick={() =>{editeConfiguration(configuration)}}>bearbeiten</span>
                                            <span className="cf-link" onClick={() =>{deleteConfiguration(configuration)}}>löschen</span>  
                                        </div>
                                    </div>
                                )})} 
                            </div>                   
                        </div>
                        <div id="cf-Swiper-saved-pagination"/>
                        
                    </div>
                </CSSTransition>

                <CSSTransition in={configurations.length == 0} unmountOnExit timeout={0}>
                    <div className='cf-no-configurations'>
                        <div className="cf-no-configurations-text">Keine gekauften oder gespeichterten Geräte gefunden.</div>
                        <div className="cf-button" onClick={() =>{history.push({pathname: '/Konfigurator'})}}>Erstelle eine neue Konfiguration</div>
                    </div>
                </CSSTransition>
                 
            </div>
        </div>
    )
}
//
export default Configurations
