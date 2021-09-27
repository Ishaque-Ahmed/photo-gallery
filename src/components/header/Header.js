import React from 'react';
import Navigation from './Navigation';


const Header = () => {
    return (
        <div style={{
            top: "0", position: "fixed", zIndex: "100", width: "100%"
        }}>
            <Navigation />
        </div>
    );
}
export default Header;