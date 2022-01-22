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
            component = <ColumnSelector options={props.options} heading={props.heading} index1={props.index1} index2={props.index2} updateCurrentSettings={props.updateCurrentSettings}/>
            break;
        case 'switch': 
            component = <SwitchSelector options={props.options} heading={props.heading} index1={props.index1} index2={props.index2} updateCurrentSettings={props.updateCurrentSettings}/> 
            break;
        case 'rows': 
            component = <RowSelector options={props.options} heading={props.heading} index1={props.index1} index2={props.index2} updateCurrentSettings={props.updateCurrentSettings}/> 
            break;
        case 'addon': 
            component = <AddOnSelector options={props.options} heading={props.heading} index1={props.index1} index2={props.index2} updateCurrentSettings={props.updateCurrentSettings} addComponent={props.addComponent} motileParts={props.motileParts}/> 
            break;
        default: 
            component = <ColumnSelector options={props.options} heading={props.heading} index1={props.index1} index2={props.index2} updateCurrentSettings={props.updateCurrentSettings}/>
            break;
    }

    return (
        <div className="component">
            <h3 className="h3"><span>{props.heading}</span></h3>
            {component}
        </div>
    )
}

export default ComponentSelector
