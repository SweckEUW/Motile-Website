import './SwitchSelector.css'
import {React} from 'react'

const SwitchSelector = (props) => {

    return (
        <div className="switchSelectorContainer">
            {props.options.map((option,index)=> {
                return (
                <div className="switchSelector" key={option.icon}>
                    <span className='ss-icon material-icons-outlined'>{option.icon}</span>
                    <span className='ss-name'>{option.name}</span>
                    <label className="ss-switch">
                        <input type="checkbox" onChange={e => props.updateCurrentSettings(props.index1, props.index2, index, e.target.checked ? option.name : "")}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                )
            })}
        </div>
    )
}

export default SwitchSelector