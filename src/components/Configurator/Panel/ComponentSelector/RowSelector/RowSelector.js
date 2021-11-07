import './RowSelector.css'
import {React} from 'react'

const RowSelector = (props) => {
    const options = props.options;

    return (
        <div className="rowSelector">
            {options.map(item => (
                <div key={item.head} className="row">
                    <div className="row-head">
                        <p>{item.head}</p>
                    </div>
                    <div className="row-additional">
                        <p>{item.additionalInfo}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RowSelector