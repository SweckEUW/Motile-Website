import './AddOnSelector.css'
import {React} from 'react'

const AddOnSelector = (props) => {
    const options = props.options;

    return (
        <div className="additionalSelectorContainer">
            {options.map(item => (
                <div key={item.name} className="additionalSelector">
                    <span className='as-icon material-icons-outlined'>{item.icon}</span>
                    <span className='as-name'>{item.name}</span>
                    <div className="as-button">Einbauen</div>
                </div>
            ))}
        </div>
    )
}

export default AddOnSelector