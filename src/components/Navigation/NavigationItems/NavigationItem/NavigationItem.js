import React from 'react'
import classes from '../NavigationItem/NavigationItem.module.css'
import { NavLink } from 'react-router-dom'
const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink 
                to={props.link}
                exact = {props.exact}
                activeClassName={classes.active}> {props.children}
            </NavLink>
        </li>
    )
}

export default navigationItem