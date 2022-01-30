import './Colorpicker.css';
import React from 'react';

    function Colorpicker(){

        function changeBridgeColor(color){
            document.dispatchEvent(new CustomEvent("changeBridgeColor", {detail:{color: color}}));
        }
        
        return (
            <div className='Colorpicker'>
                <span className="material-icons-outlined">palette</span>
                <div className='Color' style={{background: '#000000'}} onClick={e => changeBridgeColor("#000000")}></div>
                <div className='Color' style={{background: '#AFD7CE'}} onClick={e => changeBridgeColor("#AFD7CE")}></div>
                <div className='Color' style={{background: '#82353F'}} onClick={e => changeBridgeColor("#82353F")}></div>
                <div className='Color' style={{background: '#D43536'}} onClick={e => changeBridgeColor("#D43536")}></div>
                <div className='Color' style={{background: '#D4ACAA'}} onClick={e => changeBridgeColor("#D4ACAA")}></div>
                <div className='Color' style={{background: '#E9EC67'}} onClick={e => changeBridgeColor("#E9EC67")}></div>
                <div className='Color' style={{background: '#4D7A91'}} onClick={e => changeBridgeColor("#4D7A91")}></div>
                <div className='Color' style={{background: '#AFB0B4'}} onClick={e => changeBridgeColor("#AFB0B4")}></div>
            </div>
        )
}

export default Colorpicker;