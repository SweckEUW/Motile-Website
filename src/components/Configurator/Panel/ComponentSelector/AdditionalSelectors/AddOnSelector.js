import './AddOnSelector.css'
import {React} from 'react'

const AddOnSelector = (props) => {

    function spawnComponent(index){
        let motilePart = props.motileParts.find(part => part.name === props.options[index].name);
        props.addComponent(motilePart,props.index1,true);
    }

    return (
        <div className="additionalSelectorContainer">
            {props.options.map((item,index) => (
                <div key={item.name} className="additionalSelector">
                    <span className='as-icon material-icons-outlined'>{item.icon}</span>
                    <span className='as-name'>{item.name}</span>
                    <div className="as-button" onClick={() =>{spawnComponent(index)}}>Einbauen</div>
                </div>
            ))}
        </div>
    )
}

export default AddOnSelector