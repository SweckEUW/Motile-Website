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

const Configurations = () => {
    const [state, setState] = useContext(Context);
    const [inShoppingCart, setShoppingCartItems] = useContext(ShoppingCartContext);
    const [configurations, setConfigurations] = useState([]);

    useEffect(() =>{ 
        getConfigurations();
    }, [state]);

    useEffect(() =>{ 
        document.title = "Motile - Geräte";
    }, []);

    useEffect(() =>{ 
        initSwipers();
    }, [configurations]);

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
        <div className="Configurations pr-page grid-container">
            <h1 className="pr-title col-12">Geräte</h1>

            <CSSTransition in={configurations.length == 0} unmountOnExit timeout={0}>   
                <div className="col-12 cf-text">Keine gekauften oder gespeicherten Geräte gefunden.</div>
            </CSSTransition>

            {/* Meine Geräte */}
            <CSSTransition in={configurations.filter(configuration => configuration.bought).length != 0} unmountOnExit timeout={0}>
                <div className="col-4">
                    <div className="cf-owned">
                        <h3 className="cf-title">Meine Geräte</h3>
                        <div id="cf-Swiper-owned" className="swiper"> 
                            <div className="swiper-wrapper">
                                {configurations.filter(configuration => configuration.bought).map((configuration,index) =>{return(
                                    <div key={index} className="cf-configuration swiper-slide">
                                        <img className="cf-thumbnail" src={configuration.thumbnail ? configuration.thumbnail : "http://localhost:5000/Placeholder/phone_placeholder.png"} alt=""/>
                                        <div className="cf-name">{configuration.name}</div>
                                        <div className="cf-info">{'gekauft '+configuration.orderDate}</div>
                                        <div className="cf-button cf-upgrade" onClick={() =>{editeConfiguration(configuration)}}>Upgrade</div>
                                        <div className="cf-link" onClick={()=>{history.push({pathname: '/Profil/Bestellungen'})}}>Details anzeigen &gt;</div>
                                    </div>
                                )})}
                            </div> 
                        </div>
                        <div id="cf-Swiper-owned-pagination"/>
                    </div>
                </div>
            </CSSTransition>
                
            {/* Gespeicherte Geräte */}
            <CSSTransition in={configurations.filter(configuration => !configuration.bought).length != 0} unmountOnExit timeout={0}>
                <div className="col-4 cf-saved">
                    <h3 className="cf-title">Gespeicherte Geräte</h3>
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

            <div className='col-4 cf-new' style={{marginLeft: configurations.length != 0 ? '' : '0px'}} onClick={() =>{history.push({pathname: '/Konfigurator'})}}>
                <h3 className="cf-title">new</h3>
                <img className="cf-new-img" src={process.env.PUBLIC_URL+'/Assets/smartphone_size.svg'} alt="" />  
                <div className='cf-name'>Neu</div>
                <div className='cf-new-gray1'/>
                <div className='cf-new-gray2'/>
                <div className='cf-new-gray3'>
                    <div/>
                    <div/>
                </div>
            </div>
        </div>
    )
}
export default Configurations
