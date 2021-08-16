import React from 'react';
import imagem from '../assets/img/404.png';

import { Button } from '@material-ui/core';

const Pagina404 = () => {

    return (
        <main>
            <img src={imagem} alt="nao encontrada"/>
            <p>Página não encontrada</p>
            <Button color="primary"  variant="contained" color="primary">Hello World</Button>
        </main>
        );

}
export default Pagina404;