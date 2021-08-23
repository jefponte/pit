import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, {Component} from 'react';
import {DataContext} from '../services/DataContext';
import List from '@material-ui/core/List';
import Element from '../components/Element';

const tiposAtivComp = [
    {descricao: "tutoria", sigla: "T"},
    {descricao: "coordenação", sigla: "C"},
    {descricao: "orientação", sigla: "O"}
];

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
            horasSemanais: "",
            tipoAtividade: null, 
            tipo: null, 
            programa: "", 
            orientando: "", 
            dataAprovacao: "", 
            titulo: "", 
            numeroPortaria: "",
            data: "", 
            cargoFuncao: "" 

        };
        this.handleChange= this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.removeData = this.removeData.bind(this);
        this.resetState = this.resetState.bind(this);
    }
    removeData(itemId){
        console.log(itemId);

        let arrayData =  this.context.data;
        let dataIndex = arrayData.findIndex(atividade => atividade.id === itemId);
        arrayData.splice(dataIndex, 1);
        this.context.data = arrayData;

        this.setState(
            {
                codigo: "", 
                disciplina: "", 
                horasSemanais: "",
                tipoAtividade: null, 
                tipo: null, 
                programa: "", 
                orientando: "", 
                dataAprovacao: "", 
                titulo: "", 
                numeroPortaria: "",
                data: "", 
                cargoFuncao: ""  
            });
        
        

    }
    handleAdd(){
        const hora = this.state;
        const newData = Object.assign({}, hora, {id:(Date.now())});

        this.context.data.push(newData);
        this.resetState();
    }
    resetState(){
        this.setState({
            codigo: "", 
            disciplina: "", 
            horasSemanais: "",
            tipoAtividade: null, 
            tipo: null, 
            programa: "", 
            orientando: "", 
            dataAprovacao: "", 
            titulo: "", 
            numeroPortaria: "",
            data: "", 
            cargoFuncao: "" 

        });
    }
    handleChange(event){
        const target = event.target,
        value = target.type === 'checkbox' ? target.checked : target.value,
        name = target.name;
        this.setState({
            [name]: value
        });
        
    }
    onTagsChangeTipoAtividade = (event, values) => {
        this.setState({
            tipoAtividade: values
        });
    }
    onTagsChangeTipo = (event, values) => {
        this.setState({
            tipo: values
        });
    }

    render(){
        const {state} = this;
        const formsData = [
            <>
                <TextField value={state.codigo} name="codigo"  onChange={this.handleChange} id="codigo" label="Código" fullWidth variant="outlined" margin="normal"/>
                <TextField value={state.disciplina} name="disciplina" onChange={this.handleChange} id="disciplina" label="Disciplina" fullWidth variant="outlined" margin="normal"/><br/>
                <TextField value={state.horasSemanais} name="horasSemanais" onChange={this.handleChange} id="horasSemanais" label="Horas Semanais" fullWidth variant="outlined" margin="normal"/>
                <Button onClick={this.handleAdd}  type="submit" variant="contained" color="primary">
                    Adicionar
                </Button>
            </>,
            <>
                <TextField value={state.codigo} name="codigo"  onChange={this.handleChange} id="codigo" label="Código" fullWidth variant="outlined" margin="normal"/>
                <TextField value={state.disciplina} name="disciplina" onChange={this.handleChange} id="disciplina" label="Disciplina" fullWidth variant="outlined" margin="normal"/><br/>
                <TextField value={state.horasSemanais} name="horasSemanais" onChange={this.handleChange} id="horasSemanais" label="Horas Semanais" fullWidth variant="outlined" margin="normal"/>
                <Button onClick={this.handleAdd}  type="submit" variant="contained" color="primary">
                    Adicionar
                </Button>
            </>,
            <>
            
           <Autocomplete 
                margin="normal"
                id="tipo"
                options={tiposAtivComp}
                getOptionLabel={option => option.descricao}
                onChange={this.onTagsChangeTipo}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Tipo de Atividade" variant="outlined" />}
                /><br/>
            <TextField value={state.programa} name="programa" onChange={this.handleChange} id="programa" label="Programa" fullWidth variant="outlined" margin="normal"/><br/>
            <TextField value={state.programa} name="orientando" onChange={this.handleChange} id="orientando" label="Nome do Orientando" fullWidth variant="outlined" margin="normal"/>
            <TextField value={state.horasSemanais} name="horasSemanais" onChange={this.handleChange} id="horasSemanais" label="Horas Semanais" fullWidth variant="outlined" margin="normal"/>
            <Button onClick={this.handleAdd}  type="submit" variant="contained" color="primary">
                Adicionar
            </Button>
            </>,
            <>
            <Autocomplete 
                margin="normal"
                id="tipo"
                options={tiposAtivComp}
                getOptionLabel={option => option.descricao}
                onChange={this.onTagsChangeTipo}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Tipo de Atividade" variant="outlined" />}
                /><br/>
            <TextField value={state.dataAprovacao} name="dataAprovacao"  onChange={this.handleChange} id="dataAprovacao" label="Data de Aprovação" fullWidth variant="outlined" margin="normal"/>
            <TextField value={state.titulo} name="titulo" onChange={this.handleChange} id="titulo" label="Título" fullWidth variant="outlined" margin="normal"/><br/>
            <TextField value={state.horasSemanais} name="horasSemanais" onChange={this.handleChange} id="horasSemanais" label="Horas Semanais" fullWidth variant="outlined" margin="normal"/>
            <Button onClick={this.handleAdd}  type="submit" variant="contained" color="primary">
                Adicionar
            </Button>
            </>,
            <>
            <Autocomplete 
                margin="normal"
                id="tipo"
                options={tiposAtivComp}
                getOptionLabel={option => option.descricao}
                onChange={this.onTagsChangeTipo}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Tipo de Atividade" variant="outlined" />}
                /><br/>
            <TextField value={state.dataAprovacao} name="dataAprovacao"  onChange={this.handleChange} id="dataAprovacao" label="Data de Aprovação" fullWidth variant="outlined" margin="normal"/>
            <TextField value={state.titulo} name="titulo" onChange={this.handleChange} id="titulo" label="Título" fullWidth variant="outlined" margin="normal"/><br/>
            <TextField value={state.horasSemanais} name="horasSemanais" onChange={this.handleChange} id="horasSemanais" label="Horas Semanais" fullWidth variant="outlined" margin="normal"/>
            <Button onClick={this.handleAdd}  type="submit" variant="contained" color="primary">
                Adicionar
            </Button>
            </>, 
            <>
            
            <TextField value={state.numeroPortaria} name="numeroPortaria"  onChange={this.handleChange} id="numeroPortaria" label="Nº da Portaria" fullWidth variant="outlined" margin="normal"/>
            <TextField value={state.data} name="data" onChange={this.handleChange} id="data" label="Data" fullWidth variant="outlined" margin="normal"/><br/>
            <TextField value={state.cargoFuncao} name="cargoFuncao" onChange={this.handleChange} id="cargoFuncao" label="Cargo ou Função" fullWidth variant="outlined" margin="normal"/>
            <TextField value={state.horasSemanais} name="horasSemanais" onChange={this.handleChange} id="horasSemanais" label="Horas Semanais" fullWidth variant="outlined" margin="normal"/>
            <Button onClick={this.handleAdd}  type="submit" variant="contained" color="primary">
                Adicionar
            </Button>
            </>, 
            <>
            
            <TextField value={state.numeroPortaria} name="numeroPortaria"  onChange={this.handleChange} id="numeroPortaria" label="Nº da Portaria" fullWidth variant="outlined" margin="normal"/>
            <TextField value={state.data} name="data" onChange={this.handleChange} id="data" label="Data" fullWidth variant="outlined" margin="normal"/><br/>
            <TextField value={state.cargoFuncao} name="cargoFuncao" onChange={this.handleChange} id="cargoFuncao" label="Cargo ou Função" fullWidth variant="outlined" margin="normal"/>
            <TextField value={state.horasSemanais} name="horasSemanais" onChange={this.handleChange} id="horasSemanais" label="Horas Semanais" fullWidth variant="outlined" margin="normal"/>
            <Button onClick={this.handleAdd}  type="submit" variant="contained" color="primary">
                Adicionar
            </Button>
            </>];
        return (
        <>


           <Autocomplete 
                margin="normal"
                id="tipoAtividade"
                options={tiposAtividade}
                getOptionLabel={option => option.descricao}
                onChange={this.onTagsChangeTipoAtividade}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Tipo de Atividade" variant="outlined" />}
                /><br/>
                
            {(this.state.tipoAtividade)?formsData[this.state.tipoAtividade.id]:(<Typography variant="h4" component="h2">Selecione uma atividade</Typography>)}
            

            <List>
            {
                this.context.data.map((atividade, index) => 
                
                    <Element atividade={atividade} removeData={this.removeData} key={index}/>
                    
                    )
            }
            </List>
            </>);
    }
}
export default PanelData;