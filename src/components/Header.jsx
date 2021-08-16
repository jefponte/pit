import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LogoUNILAB from '../assets/img/logo-unilab.png';
import LogoDTI from '../assets/img/logodti.png';

class Header extends Component{

    render(){
        return(
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img width="213" src={LogoUNILAB} alt="Logo UNILAB" />
                </a>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/"  className="nav-link px-2 link-secondary">Home</Link></li>
                    <li> <Link  to="/form" className="nav-link px-2 link-dark">Formulário</Link></li>
                    

                </ul>

                <div className="col-md-3 text-end">
                    <img width="213" src={LogoDTI} alt="Logo UNILAB"/>
                </div>
                </header>
                        
                       

        );
    }

}
export default Header;