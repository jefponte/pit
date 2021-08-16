import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{

    render(){
        return(
            
            <header className="container">

                
                <Link to="/">Home</Link> ||
                <Link  to="/form">Formulário</Link>
                
            </header>
            

        );
    }

}
export default Header;