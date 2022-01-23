import './Colorpicker.css';
import React, {useEffect} from 'react';

    function Colorpicker(){

    return (
        <div className='Colorpicker'>
            <span className="material-icons-outlined">palette</span>
            <div className='Color'></div>
            <div className='Color'></div>
            <div className='Color'></div>
        </div>
    )
}

export default Colorpicker;