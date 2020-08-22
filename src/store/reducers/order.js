import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    isDeleted: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId})
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
        isDeleted: false
    }) 
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:            
            return purchaseBurgerSuccess(state, action)        
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {loading: false})            
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {loading: true, isDeleted: false})            
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false, isDeleted: false})             
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {loading: true, isDeleted: false})            
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {loading: false, isDeleted: false}) 
        case actionTypes.DELETE_ORDER_START:
            return updateObject(state, {loading: false, isDeleted: false}) 
        case actionTypes.DELETE_ORDER_SUCCESS:
            return updateObject(state, {loading: false, isDeleted: true})   
        case actionTypes.DELETE_ORDER_FAIL:
            return updateObject(state, {loading: true, isDeleted: false})
        default:
            return state
    }
}

export default reducer