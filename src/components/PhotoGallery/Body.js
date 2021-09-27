import React, { Component } from "react";
import Food from './Food';
import Education from './Education';
import Technology from './Technology';
import Nature from './Nature';
import PhotoGallery from "./PhotoGallery";
import Auth from "../auth/Auth";
import Logout from "../auth/Logout";
import { authCheck } from "../../redux/authActionCreators";

import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Body extends Component {
    componentDidMount() {
        this.props.authCheck();
    }
    render() {
        let routes = null;
        if (this.props.token === null) {
            routes = (<Switch>
                <Route path="/login" exact component={Auth} />
                <Redirect to="/login" />
            </Switch>
            )
        } else {
            routes = (
                <Switch>
                    <Route path="/" exact component={PhotoGallery} />
                    <Route path="/nature" exact component={Nature} />
                    <Route path="/food" exact component={Food} />
                    <Route path="/education" exact component={Education} />
                    <Route path="/technology" exact component={Technology} />
                    <Route path="/logout" exact component={Logout} />
                    <Redirect to="/" />
                </Switch>
            )

        }
        return (
            <div className="container">
                {routes}
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Body);