import React, { Component } from 'react';
import Header from './header/Header';
import Body from './PhotoGallery/Body';

class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                <Body />
            </div>
        )
    }
}
export default Main;