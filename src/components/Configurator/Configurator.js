import './Configurator.css';
import React, {useState, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import SizeChooser from './SizeChooser/SizeChooser';
import BabylonView from './/BabylonView/BabylonView';
import Panel from './Panel/Panel';
import Colorpicker from './Colorpicker/Colorpicker';
import history from '../../services/RouterHistory';

function Configurator(){
    const [sizeChooserVisible, setSizeChooserVisible] = useState(true);
    const [tabletSelected, setTabletSelected] = useState(false);

    useEffect(() =>{ 
        if(history.location.state && history.location.state.editMode)
            setTabletSelected(history.location.state.configuration.isTablet)
            
        return () => {
            setSizeChooserVisible(true);
        }
    }, []);

    return (
        <div className='Configurator'>
            <CSSTransition in={sizeChooserVisible} classNames="fade" timeout={400} unmountOnExit>
                <SizeChooser setSizeChooserVisible={setSizeChooserVisible} setTabletSelected={setTabletSelected}/>
            </CSSTransition>
            <CSSTransition in={!sizeChooserVisible} classNames="fade" timeout={400} unmountOnExit>
                <div>
                    <BabylonView tabletSelected={tabletSelected}/>
                    <Panel tabletSelected={tabletSelected}/>
                    <Colorpicker/>
                </div>
            </CSSTransition>
        </div>
    );
}

export default Configurator;
