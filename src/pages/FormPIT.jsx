import React, {Component} from 'react';
import { Step, StepLabel, Stepper, TextField } from '@material-ui/core';
import {Container, Typography, Button} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PanelPDF from '../components/PanelPDF';


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const tiposAtividade = [
    { title: 'ENSINO DE GRADUAÇÃO', id: 1 },
    { title: 'ENSINO DE PÓS-GRADUAÇÃO STRICTO SENSU E LATO SENSU', id: 2 },
    { title: 'ATIVIDADES COMPLEMENTARES DE ENSINO', id: 3 },
    { title: 'PROGRAMAS E PROJETOS DE PESQUISA', id: 4 },
    { title: 'PROGRAMAS E PROJETOS DE EXTENSÃO', id: 5 },
    { title: "ATIVIDADES DE GESTÃO", id: 6 },
    { title: 'OUTRAS ATIVIDADES RELEVANTES', id: 7 }
  ];

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
                        <Button onClick={this.handlerAvancar}  type="submit" variant="contained" color="primary">
                            Avançar
                        </Button>
                    </>

                )
            break;
            case 1:
                return (
                    <>
                        <TextField value={this.state.periodo} onChange={this.onChange('periodo')} id="nome" label="Período Letivo" variant="outlined" fullWidth margin="normal"/>
                        <TextField value={this.state.regime} onChange={this.onChange('regime')} id="regime" label="Regime de Trabalho" variant="outlined" fullWidth margin="normal"/>
                        <Button onClick={this.handlerAvancar}  type="submit" variant="contained" color="primary">
                            Avançar
                        </Button>
                    </>

                );
                break;
            case 2:
                return (
                    <>
                        <Autocomplete
                            id="tipo-atividade"
                            options={tiposAtividade}
                            getOptionLabel={(option) => option.title}
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Tipo de Atividade" variant="outlined" />}
                            />

                        <TextField  id="codigo" label="Código" variant="outlined" margin="normal"/>
                        <TextField  id="disciplina" label="Disciplina" variant="outlined" margin="normal"/>
                        <TextField  id="hs" label="Horas semanais" variant="outlined" fullWidth margin="normal"/>
                        
                        <Button onClick={this.handlerAvancar}  type="submit" variant="contained" color="primary">
                            Avançar
                        </Button>
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
                </form>
                {this.showPanelPDF(this.state.etapa)}
            </Container>
            );
    }
    

}
export default FormPIT;