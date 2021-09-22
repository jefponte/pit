import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';


class Element extends Component{
    constructor(props){
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
    }
    deleteItem(){
        const props = this.props;
        const id = props.atividade.id;
        this.props.removeData(id);
    }
    render(){
        const atividade = this.props.atividade;
        let descricaoExibir = "";
        switch(atividade.tipo.id){
          case 0:
            descricaoExibir = atividade.disciplina+" - "+(2*atividade.horasSemanais) +" horas(2x)"; 
            break;
          case 1:
            descricaoExibir = atividade.disciplina+" - "+(2*atividade.horasSemanais) +" horas(2x)"; 
            break;  
          case 3:
            descricaoExibir = atividade.titulo+" - "+atividade.horasSemanais+" horas";
            break;
          case 4:
            descricaoExibir = atividade.titulo+" - "+atividade.horasSemanais+" horas";
            break;
          case 5:
            descricaoExibir = atividade.cargoFuncao+" - "+atividade.horasSemanais+" horas";
            break;
          case 6:
              descricaoExibir = atividade.cargoFuncao+" - "+atividade.horasSemanais+" horas";
              break;
          case 2:
            descricaoExibir = atividade.programa.descricao+" - "+atividade.horasSemanais+" horas"; 
            break;
          default:
            descricaoExibir = ""; 
            break;
        }
       
        return(
        
            <ListItem
            button
            >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={atividade.tipo.descricao}
              secondary={descricaoExibir}
            />
            <ListItemSecondaryAction onClick={this.deleteItem.bind(this)}>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
            );
    }
}
export default Element;