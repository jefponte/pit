import React from 'react';
import imagem from '../assets/img/404.png';

const Page404 = () => {

    return (
        <main>
            <img src={imagem} alt="nao encontrada"/>
            <p>Página não encontrada</p>
            
        </main>
        );

}
export default Page404;