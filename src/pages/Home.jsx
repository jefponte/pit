import { Container, Typography } from '@material-ui/core';
import React from 'react';
import resolucao from  '../doc/resolucao.pdf';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
}));
const Home = () => {
    const classes = useStyles();
    return (
            <Container maxWidth="sm">
                <main>
                    <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Plano Individual de Trabalho (PIT)
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Semestralmente, cada docente apresentará
                            ao seu instituto de lotação e de exercício,
                            para aprovação e em data por este fixada,
                            o seu Plano Individual de Trabalho (PIT).
                        </Typography>
                        <p><a href={resolucao}>Download da resolução</a></p>
                    </Container>
                    </div>
                </main>
            </Container>
        );

}
export default Home;