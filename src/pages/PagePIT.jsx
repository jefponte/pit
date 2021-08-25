import { Button, Container, Step, StepLabel, Stepper, TextField, Typography } from '@material-ui/core';
import React, {Component} from 'react';
import PanelData from '../components/PanelData';
import PanelPDF from '../components/PanelPDF';
import {DataContext} from '../services/DataContext';


class PagePIT extends Component{
    constructor(props){
        super(props);
        this.state = {
            nome: '',
            siape: '',
            periodo: '',
            regime: '',
            etapa: 0, 
            data: []
        }
        this.handleStep = this.handleStep.bind(this);
    }
    handleStep(){
        if(this.state.etapa >= 3){
            this.setState({
                etapa: 0
            });
            return;
        }
        const novaEtapa = this.state.etapa+1;
        this.setState({
            etapa: novaEtapa
        });
    }
    onChange = input => e => {
        this.setState({[input]: e.target.value});
    }
   
    render(){
        const {state} = this;
        const formStep = [
        <>
            <TextField value={this.state.nome} onChange={this.onChange('nome')} id="nome" label="Nome" variant="outlined" fullWidth margin="normal"/>
            <TextField value={this.state.siape} onChange={this.onChange('siape')} id="siape" label="SIAPE" variant="outlined" fullWidth margin="normal"/>
        </>, 
        <>
            <TextField value={this.state.periodo} onChange={this.onChange('periodo')} id="nome" label="Período Letivo" variant="outlined" fullWidth margin="normal"/>
            <TextField value={this.state.regime} onChange={this.onChange('regime')} id="regime" label="Regime de Trabalho" variant="outlined" fullWidth margin="normal"/>
        </>, 
        <>
            <PanelData/>
        </>,
        <>
            <Typography variant="h4" component="h2">
            Verifique as informações e depois clique em Gerar PDF
            </Typography><br/><br/>
        </>];
        return (

            <Container maxWidth="sm">
                <DataContext.Provider value={state}>
                   
                    <Stepper activeStep={state.etapa}>
                        <Step><StepLabel>Pessoal</StepLabel></Step>
                        <Step><StepLabel>Profissional</StepLabel></Step>
                        <Step><StepLabel>Carga Horária</StepLabel></Step>
                    </Stepper>
                    {formStep[state.etapa]}
                    <Button onClick={this.handleStep}  type="submit" variant="contained" color="primary">
                        {state.etapa === 3 ? "Revisar" : "Avançar"}
                    </Button>
                    {state.etapa === 3? <PanelPDF data={{nome:this.state.nome}}/> : ""}
                </DataContext.Provider>
            </Container>
            
        );
    }

}
export default PagePIT;