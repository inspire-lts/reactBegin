import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './containers/login/login.jsx'
import Admin from './containers/admin/admin.jsx'



export default class App extends Component {
    render() {
        return (
            <div className="app">
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/admin' component={Admin}></Route>
                    <Redirect to='/login'/>
                </Switch>
            </div>
        )
    }
}