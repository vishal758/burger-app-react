import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token) => {
    //we can also use getState here to get the token from
    //from the redux store
    return (dispatch) => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json?auth=' + token)
            .then(response => {
                const fetchedOrders = []
                for(let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
                // this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
                // this.setState({loading: false})
            })
    }
}

export const deleteOrderSuccess = () => {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        // response: response
    }
}

export const deleteOrderFail = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_FAIL,
        error: error
    }
}

export const deleteOrderStart = () => {
    return {
        type: actionTypes.DELETE_ORDER_START
    }
}

export const deleteOrder = (token, id) => {
    return dispatch => {
        dispatch(deleteOrderStart())
        axios.delete('/orders/' + id + ".json?auth=" + token)
        .then(response => {
            console.log(response)
            dispatch(deleteOrderSuccess())
        }) 
        .catch(err => {
            dispatch(deleteOrderFail(err))
        })
    }
}