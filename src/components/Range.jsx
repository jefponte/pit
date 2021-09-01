import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 4,
    label: '4h(min)',
  },
  {
    value: 20,
    label: '20h(max)',
  }
];

function valuetext(value) {
  return `${value}h`;
}

export default function Range({tipo}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography gutterBottom>
        {tipo.descricao}
      </Typography><br/><br/>
      <Slider
        max={tipo.maximo}
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="on"
      />
    </div>
  );
}