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
        return(
        
            <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={atividade.tipo.descricao}
              secondary={atividade.disciplina+" - "+atividade.horasSemanais}
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