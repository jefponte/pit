import React from 'react';
import imagem from '../assets/img/404.png';
import resolucao from  '../doc/resolucao.pdf';
import { Button } from '@material-ui/core';

const Home = () => {

    return (
        <main>
            <p>Essa é uma demonstração do React</p>
            <a href={resolucao} target="_blank">Download da resolução</a>
            
        </main>
        );

}
export default Home;