import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import Aux from '../../hoc/Aux/Aux'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token)
    }

    deleteOrderHandler = (id) => {
        console.log("del btn clicked id", id)
        this.props.onDeleteOrder(this.props.token, id)
    }
    
    render() {
        let orders = <Spinner />
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                    <Order 
                        key = {order.id}
                        ingredients = {order.ingredients}
                        price = {order.price} 
                        clicked = {() => this.deleteOrderHandler(order.id)}
                    />
                ))            
        }

        let redirectUrl = null
        console.log("isDeleted: ", this.props.deleted)
        // console.log("loading: ", this.props.loading)
        if(this.props.deleted) {
            redirectUrl = <Redirect to="/"/>
        }
        return (
            <Aux>
                {redirectUrl}
                <div>
                    {orders}
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        deleted: state.order.isDeleted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
        onDeleteOrder: (token, id) => dispatch(actions.deleteOrder(token, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))