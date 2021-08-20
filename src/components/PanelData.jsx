import { Button, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, {Component} from 'react';
import {DataContext} from '../services/DataContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

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

        };
        this.handleAdd = this.handleAdd.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleAdd(){
        const hora = this.state;
        this.context.data.push(hora);
        this.setState({
            codigo: "", 
            disciplina: "", 
            cargaHoraria: "",
            tipo: null

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
    onTagsChange = (event, values) => {
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
                value={this.state.tipo}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Tipo de Atividade" variant="outlined" />}
                />
                
            {(this.state.tipo)?formsData[this.state.tipo.id]:(<Typography variant="h4" component="h2">Selecione uma atividade</Typography>)}
            

            <List>
            {
                this.context.data.map(atividade => 
                
                    <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={atividade.tipo.descricao}
                      secondary={atividade.disciplina+" - "+atividade.cargaHoraria}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                    )
            }
            </List>
            </>);
    }
}
export default PanelData;