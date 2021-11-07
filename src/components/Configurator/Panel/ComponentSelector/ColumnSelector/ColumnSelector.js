import './ColumnSelector.css'
import {React} from 'react'

const ColumnSelector = (props) => {
    const options = props.options;
    const itemSize = {
        width: `${92 + stretchItem()}px`,
        height: '40px'
    }

    function stretchItem() {
        let longest = options.reduce(
            function (a, b) {
                return a.length > b.length ? a : b;
            }
        );

        if (longest.length >= 6) {
            const val = longest.length - 6; 
            return val * 14;
        } 

        return 0;
    }

    return (
        <div className="columnSelector">
            <ul>
                {options.map(item => (
                    <li style={itemSize} key={item}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ColumnSelector