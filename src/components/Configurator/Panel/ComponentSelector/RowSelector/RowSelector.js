import './RowSelector.css'
import {React} from 'react'

const RowSelector = (props) => {
    function guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    let id = guidGenerator();

    function update(additionalinfo,motilePart,price){
        props.updateCurrentSettings(props.index1, props.index2, 0, additionalinfo);
        props.updateCurrentSettings(props.index1, props.index2, 1, motilePart);
        props.updateCurrentPrices(props.index1, props.index2, parseInt(price));
    }

    return (
        <div className="rowSelector">
            {props.options.map((item,index) => (
                <label className="rs-button-container" key={index}>
                    <input className="rs-button-input" type="radio" name={id} defaultChecked={index == 0} onClick={e => update(item.additionalInfo ? item.additionalInfo : item.head, item.motilePart, item.addPrice)}/>
                    <span className="rs-button">
                        <div className='row-img-wrapper'>
                            <img src={item.img ? item.img.replace("http://localhost:5000/","https://motile-website.vercel.app/") : ''} alt=""/>
                        </div>
                        <div className='rs-info'>
                            <p className="rs-info-head">{item.head}</p>
                            <p className="rs-info-additional">{item.additionalInfo}</p>
                        </div>
                    </span> 
                </label>
            ))}
        </div>
    )
}

export default RowSelector