import './OrderComponent.css'
import React, {useState} from 'react';

const OrderComponent = (props) => {
    const [dropdownIsActive, setDropdownActive] = useState(false); 

    function toggleDropdown(){
        setDropdownActive(!dropdownIsActive);
    }

    return (
        <div className="orc-block">

            <div className="orc-row orc-row-1">
                <span className="orc-date">{props.order.orderDate}</span>
                <span className="orc-number">{'Bestellnummer '+ props.order.number}</span>
            </div>

            <div className="orc-row orc-row-2">
                <img className="orc-Thumbnail" src={props.order.thumbnail} alt="" />
                <span className="orc-info">
                    <span className="orc-name">{props.order.name}</span>
                    <span>Zugestellt am</span>
                    <span className="orc-delivered">{props.order.deliveryDate}</span>
                </span>
                <span className="orc-buttons">
                    {/* <div className="or-button">Lieferung verfolgen</div> */}
                    <div className="orc-button" onClick={() => {props.buttonCallback(props.order.number)}}>{props.isShoppingCartItem ? 'Produkt entfernen': 'Rechnung herunterladen'}</div>
                </span> 
            </div>

            <div className="orc-row orc-row-3" onClick={toggleDropdown}>
                <div className='orc-parts'>
                    <span>Dieses Paket enthält:</span>
                    {props.order.parts.map((part,index) =>{return(
                        <span key={index} className="material-icons orc-part-icon">{part.component.metaData.icon}</span>
                    )})}
                    <span className="material-icons orc-dorpDown-icon">{dropdownIsActive ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</span>
                </div>
                
                <div className="orc-dropdown" style={{maxHeight: dropdownIsActive ? '500px' : '0px'}}>
                    {props.order.parts.map((part,index) =>{return(
                        <div key={index} className="orc-part-row">
                            <div className="orc-part-name">
                                <p className="material-icons orc-part-icon">{part.component.metaData.icon}</p>
                                <p>{part.component.name}</p>
                            </div>
                            <p className='orc-part-info'>
                                {part.settings.map((setting) =>{return(
                                    setting.selectedOptions.map(selectedOption => 
                                        selectedOption ? selectedOption + " " : ''
                                    )
                                )})}
                            </p>
                            
                            <p className='orc-part-price'>{part.component.metaData.price}</p>
                        </div>
                    )})}
                </div>
            </div>

            <div className="orc-row orc-row-4">
                <span>{'Gesamt: '+ props.order.price}</span>
            </div>

        </div>
    )
}

export default OrderComponent
