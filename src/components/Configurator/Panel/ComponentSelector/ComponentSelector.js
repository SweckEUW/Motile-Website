import './ComponentSelector.css'
import {React} from 'react'
import ColumnSelector from './ColumnSelector/ColumnSelector'
import SwitchSelector from './SwitchSelector/SwitchSelector'
import AddOnSelector from './AdditionalSelectors/AddOnSelector'
import RowSelector from './RowSelector/RowSelector'

const ComponentSelector = (props) => {

    let component = "";

    switch(props.type) {
        case 'columns':
            component = <ColumnSelector options = {props.options} heading={props.heading}/>
            break;
        case 'switch': 
            component = <SwitchSelector options = {props.options} heading={props.heading}/> 
            break;
        case 'rows': 
            component = <RowSelector options = {props.options} heading={props.heading}/> 
            break;
        case 'addon': 
            component = <AddOnSelector options = {props.options} heading={props.heading}/> 
            break;
        default: 
            component = <ColumnSelector options = {props.options} heading={props.heading}/>
            break;
    }

    return (
        <div className="component">
            <h3><span>{props.heading}</span></h3>
            {component}
        </div>
    )
}

export default ComponentSelector
