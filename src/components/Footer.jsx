import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
      
    },
  }));
  
const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
            UNILAB - Universidade da Integração Internacional da Lusofonia Afro-Brasileira
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
            DTI - Diretoria de Tecnologia da Informação
        </Typography>
        
      </footer>   
        
        );

}
export default Footer;