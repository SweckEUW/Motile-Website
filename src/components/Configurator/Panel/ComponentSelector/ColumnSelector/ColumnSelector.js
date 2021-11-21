import './ColumnSelector.css'
import {React} from 'react'

const ColumnSelector = (props) => {
    const options = props.options;
    const itemSize = {
        width: `${92 + stretchItem()}px`,
        height: '40px'
    }

    function stretchItem() {
        let longest = options.reduce(
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
            {options.map((item,index) => (
                <label className="cs-button-container" key={item}>
                    <input className="cs-button-input" type="radio" name={id} style={itemSize} defaultChecked={index == 0}/>
                    <span className="cs-button">
                        {item}
                    </span> 
                </label>
            ))}
        </div>
    )
}

export default ColumnSelector