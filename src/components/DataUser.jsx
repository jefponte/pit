import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";

function DataUser({ aoEnviar, defaultData }) {
  const [nome, setNome] = useState(defaultData.nome);
  const [siape, setSiape] = useState(defaultData.siape);
  const [erros, setErros] = useState({
    siape: { valido: true, texto: "" },
    nome: { valido: true, texto: "" },
  });

  function validarNome(event) {
    const { name, value } = event.target;
    const novoEstado = { ...erros };
    if (value.length < 2) {
      novoEstado[name] = {
        valido: false,
        texto: "O nome deve ter ao menos 2 dígitos.",
      };
    } else {
      novoEstado[name] = { valido: true, texto: "" };
    }
    setErros(novoEstado);
  }
  function validarSiape(event) {
    const { name, value } = event.target;
    const novoEstado = { ...erros };
    if (value.length < 7) {
      novoEstado[name] = {
        valido: false,
        texto: "O SIAPE deve ter ao menos 7 dígitos.",
      };
    } else {
      novoEstado[name] = { valido: true, texto: "" };
    }
    setErros(novoEstado);
  }
  function possoEnviar() {
    for (let campo in erros) {
      if (!erros[campo].valido) {
        return false;
      }
    }
    return true;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (possoEnviar()) {
          aoEnviar({ nome, siape });
        }
      }}
    >
      <TextField
        required
        name="nome"
        onBlur={validarNome}
        error={!erros.nome.valido}
        helperText={erros.nome.texto}
        value={nome}
        onChange={(event) => {
          setNome(event.target.value);
        }}
        id="nome"
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        required
        name="siape"
        onBlur={validarSiape}
        error={!erros.siape.valido}
        helperText={erros.siape.texto}
        value={siape}
        onChange={(event) => {
          setSiape(event.target.value);
        }}
        id="siape"
        label="SIAPE"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Avançar
      </Button>
    </form>
  );
}

export default DataUser;
