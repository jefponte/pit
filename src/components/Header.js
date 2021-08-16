import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{

    render(){
        return(
            
            <header className="container">
                <Link to="/">Teste</Link> ||
                <Link  to="/sobre">Teste</Link>
                
            </header>
            

        );
    }

}
export default Header;