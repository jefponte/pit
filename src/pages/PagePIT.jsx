import { Button, Container, Step, StepLabel, Stepper, TextField, Typography } from '@material-ui/core';
import React, {Component} from 'react';
import PanelData from '../components/PanelData';
import PanelPDF from '../components/PanelPDF';
import {DataContext} from '../services/DataContext';
import resolucao from  '../doc/resolucao.pdf';

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
                <DataContext.Provider value={state}><br/>
                    <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                            Plano Individual de Trabalho (PIT)
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Semestralmente, cada docente apresentará
                            ao seu instituto de lotação e de exercício,
                            para aprovação e em data por este fixada,
                            o seu Plano Individual de Trabalho (PIT).
                    </Typography>
                    <p><a href={resolucao}>Download da resolução</a></p>

                    <Stepper activeStep={state.etapa}>
                        <Step><StepLabel>Pessoal</StepLabel></Step>
                        <Step><StepLabel>Profissional</StepLabel></Step>
                        <Step><StepLabel>Carga Horária</StepLabel></Step>
                    </Stepper>
                    {formStep[state.etapa]}
                    <Button onClick={this.handleStep}  type="submit" variant="contained" color="primary">
                        {state.etapa === 3 ? "Revisar" : "Avançar"}
                    </Button>
                    {state.etapa === 3? <PanelPDF/> : ""}
                </DataContext.Provider>
            </Container>
            
        );
    }

}
export default PagePIT;