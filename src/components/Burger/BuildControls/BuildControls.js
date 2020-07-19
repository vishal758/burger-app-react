import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
const controls = [
    { lable: "Salad", type: 'salad'},
    { lable: "Bacon", type: 'bacon'},
    { lable: "Cheese", type: 'cheese'},
    { lable: "Meat", type: 'meat'}
]

const buildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.lable} 
                    label={ctrl.lable}
                    added={() => props.indregientAdded(ctrl.type)}
                    removed = {() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                    />
                ))
            }
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
}

export default buildControls