import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {...}
    // }
    state = {
        //nameOfIngredient: Amt
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount() {
        axios.get("https://burger-react-app-50038.firebaseio.com/ingredients.json")
        .then(response => {
            this.setState({
                ingredients: response.data
            })
        }).catch(error => {
            this.setState({error: true})
        })
    }

    //sum is the constantly updated current sum
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map((igKey) => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el
        }, 0)
        this.setState( {
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount

        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState( {
            ingredients: updatedIngredient,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredient)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if(oldCount <= 0) return
        const updatedCount = oldCount - 1
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount

        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState( {
            ingredients: updatedIngredient,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredient)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {        
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })

    }

    render() {
        // console.log(this.state.ingredients)
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        indregientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        price = {this.state.totalPrice}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler}
                    />     
                </Aux>             
            )
            orderSummary = <OrderSummary 
            price = {this.state.totalPrice}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            ingredients={this.state.ingredients} />  

        }
        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler( BurgerBuilder, axios )