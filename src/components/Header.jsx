import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import LogoUNILAB from '../assets/img/logo-unilab.png';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img width="213" src={LogoUNILAB} alt="Logo UNILAB" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>

  );
}
export default Header;