import { Container, Typography } from '@material-ui/core';
import React from 'react';
import resolucao from  '../doc/resolucao.pdf';

const Home = () => {

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h2">
                Plano Individual de Trabalho (PIT)
            </Typography>
            
            <p>Semestralmente, cada docente apresentará ao seu instituto de lotação e de exercício, para aprovação e em data por este fixada, o seu Plano Individual de Trabalho (PIT), no qual estarão discriminadas, por período leƟvo, todas as suas aƟvidades relacionadas à aƟvidade relacionada à docência, pesquisa, extensão e gestão.</p>
            <p><a href={resolucao}>Download da resolução</a></p>
            
        </Container>
        );

}
export default Home;