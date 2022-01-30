import './ColumnSelector.css'
import {React} from 'react'

const ColumnSelector = (props) => {
    const itemSize = {
        width: `${92 + stretchItem()}px`,
        // height: '40px'
    }

    function stretchItem() {
        if(props.options[0] == "MediaTek Dimensity")
            return 15
        
        let longest = props.options.reduce(
            function (a, b) {
                return a.length > b.length ? a : b;
            }
        );

        if (longest.length >= 6) {
            const val = longest.length - 6; 
            return val * 14;
        } 

        return 0;
    }
    function guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    let id = guidGenerator();

    return (
        <div className="columnSelector">
            {props.options.map((item,index) => (
                <label className="cs-button-container" key={item.name} style={itemSize}>
                    <input className="cs-button-input" type="radio" name={id} defaultChecked={index == 0} onChange={e => props.updateCurrentSettings(props.index1, props.index2, 0, e.target.checked ? item.name : "")}/>
                    <span className="cs-button">
                        {item.name}
                    </span> 
                </label>
            ))}
        </div>
    )
}

export default ColumnSelector