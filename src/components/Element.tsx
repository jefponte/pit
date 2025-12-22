import React from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

import { ActivityItem } from "../pit/pit.types";

type Props = {
  atividade: ActivityItem;
  removeData: (id: number) => void;
};

export default function Element({ atividade, removeData }: Props) {
  let descricaoExibir = "";

  switch (atividade.tipo.id) {
    case 0:
    case 1:
      descricaoExibir = `${atividade.disciplina ?? ""} - ${2 * atividade.horasSemanais} horas(2x)`;
      break;
    case 3:
    case 4:
      descricaoExibir = `${atividade.titulo ?? ""} - ${atividade.horasSemanais} horas`;
      break;
    case 5:
    case 6:
      descricaoExibir = `${atividade.cargoFuncao ?? ""} - ${atividade.horasSemanais} horas`;
      break;
    case 2:
      descricaoExibir = `${atividade.programa?.descricao ?? ""} - ${atividade.horasSemanais} horas`;
      break;
    default:
      descricaoExibir = "";
  }

  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>

      <ListItemText primary={atividade.tipo.descricao} secondary={descricaoExibir} />

      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => removeData(atividade.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
