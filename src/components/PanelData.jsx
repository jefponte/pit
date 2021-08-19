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
            codigo: "", 
            disciplina: "", 
            cargaHoraria: "",
            tipo: null

        }
        this.handleAdd = this.handleAdd.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleAdd(){
        this.context.nome = "Teste";
        this.setState({nome: "Teste"})

    }
    handleChange(event){
        const target = event.target,
        value = target.type === 'checkbox' ? target.checked : target.value,
        name = target.name;

        this.setState({
            [name]: value
        });
        console.log(this.state);
    }
    onTagsChange = (event, values) => {
        this.setState({
        tipo: values
        }, () => {
        console.log(this.state);
        });
    }




    render(){
        const {state} = this;
        const formsData = [
            <>
                <TextField value={state.codigo} name="codigo"  onChange={this.handleChange} id="codigo" label="Código" fullWidth variant="outlined" margin="normal"/>
                <TextField value={state.disciplina} name="disciplina" onChange={this.handleChange} id="disciplina" label="Disciplina" fullWidth variant="outlined" margin="normal"/><br/>
                <TextField value={state.cargaHoraria} name="cargaHoraria" onChange={this.handleChange} id="cargaHoraria" label="Carga Horária" fullWidth variant="outlined" margin="normal"/>
                <Button onClick={this.handleAdd}  type="submit" variant="contained" color="primary">
                    Adicionar
                </Button>
            </>,
            <>
            2
            </>,
            <>
            3
            </>,
            <>
            4
            </>,
            <>
            5
            </>, 
            <>
            6
            </>, 
            <>
            7
            </>];
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
            
            
            </>);
    }
}
export default PanelData;