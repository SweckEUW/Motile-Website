import './SwitchSelector.css'
import {React} from 'react'

const SwitchSelector = (props) => {

    return (
        <div className="switchSelectorContainer">
            {props.options.map((option)=> {
                return (
                <div className="switchSelector" key={option}>
                    <h4>{option}</h4>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                </div>
                )
            })}
        </div>
    )
}

export default SwitchSelector