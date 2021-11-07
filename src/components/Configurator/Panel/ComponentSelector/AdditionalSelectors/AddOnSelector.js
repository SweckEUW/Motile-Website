import './AddOnSelector.css'
import {React} from 'react'

const AddOnSelector = (props) => {
    const options = props.options;

    return (
        <div className="additionalSelector">
            {options.map(item => (
                <div key={item} className="opt-row">
                    <div className="opt-head">
                        <p>{item}</p>
                    </div>
                    <div className="opt-btn">
                        <div className="opt-btn-build">Einbauen</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AddOnSelector