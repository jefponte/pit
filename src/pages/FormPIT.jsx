import { Step, StepLabel, Stepper, TextField } from '@material-ui/core';
import React, {Component} from 'react';
import {Container, Typography, Button} from "@material-ui/core";


import PanelPDF from '../components/PanelPDF';

class FormPIT extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            nome: '',
            siape: '',
            periodo: '',
            regime: '',
            ch: '',
            etapa: 0
        }
        this.formEtapa.bind(this);
        
    }
    
    onChange = input => e => {
        this.setState({[input]: e.target.value});
    }
    handlerAvancar = (e) => {
        e.preventDefault();
        if(this.state.etapa >= 3){
            alert("Esta é a última etapa.");
            return;
        }
        const novaEtapa = this.state.etapa+1;
        this.setState({
            etapa: novaEtapa
        });
    } 
    handlerVoltar = (e) => {
        e.preventDefault();
        if(this.state.etapa <= 0){
            alert("Você está na primeira etapa.");
            return;
        }
        const novaEtapa = this.state.etapa-1;    
        this.setState({
            etapa: novaEtapa
        });
        
    } 


    formEtapa(etapa){
        switch(etapa){
            case 0:
                return (
                    <>
                        <TextField value={this.state.nome} onChange={this.onChange('nome')} id="nome" label="Nome" variant="outlined" fullWidth margin="normal"/>
                        <TextField value={this.state.siape} onChange={this.onChange('siape')} id="siape" label="SIAPE" variant="outlined" fullWidth margin="normal"/>
                        
                    </>

                )
            break;
            case 1:
                return (
                    <>
                        <TextField value={this.state.periodo} onChange={this.onChange('periodo')} id="nome" label="Período Letivo" variant="outlined" fullWidth margin="normal"/>
                        <TextField value={this.state.regime} onChange={this.onChange('regime')} id="regime" label="Regime de Trabalho" variant="outlined" fullWidth margin="normal"/>
                    </>

                );
                break;
            case 2:
                return (
                    <>
                        <TextField value={this.state.ch} onChange={this.onChange('ch')} id="ch" label="Carga Horária" variant="outlined" margin="normal"/>
                        <TextField onChange={this.onChange('siape')} id="siape" label="SIAPE" variant="outlined" margin="normal"/><br/><br/>
                    </>

                );
                break;
            case 3:
                    return (
                        <>
                            <Typography variant="h4" component="h2">
                            Verifique as informações e depois clique em Gerar PDF
                            </Typography><br/><br/>
                        </>
    
                    );
                    break;
            default:
                return (<>Erro</>);
                break;
        }
    }

    showPanelPDF(etapa){
        if(etapa == 3){
            return (<PanelPDF data={{nome:this.state.nome}}/>);
        }
    }
    render(){
        return (
            <Container maxWidth="sm">
                <Stepper activeStep={this.state.etapa}>
                    <Step><StepLabel>Pessoal</StepLabel></Step>
                    <Step><StepLabel>Profissional</StepLabel></Step>
                    <Step><StepLabel>Carga Horária</StepLabel></Step>
                </Stepper>


                <form>
                    {this.formEtapa(this.state.etapa)}
                    
                    <Button onClick={this.handlerVoltar}  type="submit" variant="contained" color="primary">
                        Voltar
                    </Button>
                    
                    <Button onClick={this.handlerAvancar}  type="submit" variant="contained" color="primary">
                        Avançar
                    </Button>
                </form>
                {this.showPanelPDF(this.state.etapa)}
            </Container>
            );
    }
    

}
export default FormPIT;