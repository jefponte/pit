import { TextField } from '@material-ui/core';
import React, {Component} from 'react';
import {Container, Typography, Button} from "@material-ui/core";
import PDF from '../components/PDF';


class FormPIT extends Component {
    state = {
        nome: '',
        siape: '',
        periodo: '',
        regime: '',
        postSubmitted: false
    }

    onChange = input => e => {
        this.setState({[input]: e.target.value});
    }
    submitPost = (e) => {
        e.preventDefault();
        this.setState({
            postSubmitted: true
        });
    } 
    render(){
        return (
            <Container maxWidth="sm">
                
                <Typography variant="h3" component="h1">
                    Gerar PIT
                </Typography>
                <Typography variant="h4" component="h2">
                    Entre com suas informações
                </Typography>
                <form>
                    <TextField onChange={this.onChange('nome')} id="nome" label="Nome" variant="outlined" fullWidth margin="normal"/>
                    <TextField onChange={this.onChange('siape')} id="siape" label="SIAPE" variant="outlined" fullWidth margin="normal"/>
                    <TextField  onChange={this.onChange('periodo')}  id="periodo" label="Período Letivo" variant="outlined" fullWidth margin="normal"/>
                    <TextField  onChange={this.onChange('regime')}  id="regime" label="Regime de Trabalho" variant="outlined" fullWidth margin="normal"/>
                    <Button onClick={this.submitPost}  type="submit" variant="contained" color="primary">
                        Enviar
                    </Button>
                </form>
                <PDF title={this.state.nome} content={this.state.siape} image={this.state.periodo} />
            </Container>
            );
    }
    

}
export default FormPIT;