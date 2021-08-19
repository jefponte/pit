import { Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, {Component} from 'react';
import {DataContext} from '../services/DataContext';

const tiposAtividade = [
    { descricao: 'ENSINO DE GRADUAÇÃO', id: 0 },
    { descricao: 'ENSINO DE PÓS-GRADUAÇÃO STRICTO SENSU E LATO SENSU', id: 1},
    { descricao: 'ATIVIDADES COMPLEMENTARES DE ENSINO', id: 2 },
    { descricao: 'PROGRAMAS E PROJETOS DE PESQUISA', id: 3 },
    { descricao: 'PROGRAMAS E PROJETOS DE EXTENSÃO', id: 4 },
    { descricao: "ATIVIDADES DE GESTÃO", id: 5 },
    { descricao: 'OUTRAS ATIVIDADES RELEVANTES', id: 6 }
];


class PanelData extends Component{
    static contextType = DataContext;
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
        this.mudar = this.mudar.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
    }
    mudar(){
        this.context.nome = "Teste";
        this.setState({nome: "Teste"})

    }
    
  onTagsChange = (event, values) => {
    this.setState({
      tipo: values
    }, () => {
      console.log(this.state);
    });
  }




    render(){
 
        const formsData = [
            <>
                <TextField value="" id="Disciplina" label="Disciplina" variant="outlined" fullWidth margin="normal"/>
            </>,<>2</>,<>3</>,<>4</>,<>5</>, <>6</>, <>7</>];
        return (
        <>
                    {console.log(this.context)}


           <Autocomplete
                id="tipo-atividade"
                options={tiposAtividade}
                getOptionLabel={option => option.descricao}
                onChange={this.onTagsChange}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Tipo de Atividade" variant="outlined" />}
                />
                
            {(this.state.tipo)?formsData[this.state.tipo.id]: "Selecione um tipo de Atividade." }
            <Button onClick={this.mudar}  type="submit" variant="contained" color="primary">
                Teste
            </Button>
            </>);
    }
}
export default PanelData;