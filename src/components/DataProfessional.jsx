import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";

function DataProfessional({ aoEnviar }) {
  const [periodo, setPeriodo] = useState("");
  const [regime, setRegime] = useState("");
  const [erros, setErros] = useState({
    periodo: { valido: true, texto: "" },
    regime: { valido: true, texto: "" },
  });

  function possoEnviar() {
    for (let campo in erros) {
      if (!erros[campo].valido) {
        return false;
      }
    }
    return true;
  }
  function validarPeriodo(event) {
    const { name, value } = event.target;
    const novoEstado = { ...erros };
    if (value.length < 5) {
      novoEstado[name] = {
        valido: false,
        texto: "O período deve ter ao menos 5 dígitos.",
      };
    } else {
      novoEstado[name] = { valido: true, texto: "" };
    }
    setErros(novoEstado);
  }
  function validarRegime(event) {
    const { name, value } = event.target;
    const novoEstado = { ...erros };
    if (value > 10 && value < 50) {
        novoEstado[name] = { valido: true, texto: "" };
      
    } else {
        novoEstado[name] = {
            valido: false,
            texto: "Digite um regime de trabalho válido.",
          };
    }
    setErros(novoEstado);
  }
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (possoEnviar()) {
          aoEnviar({ periodo, regime });
        }
      }}
    >
      <TextField
        required
        onBlur={validarPeriodo}
        error={!erros.periodo.valido}
        helperText={erros.periodo.texto}
        value={periodo}
        onChange={(event) => {
            setPeriodo(event.target.value);
        }}
        name="periodo"
        id="periodo"
        label="Período Letivo"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        required
        onBlur={validarRegime}
        error={!erros.regime.valido}
        helperText={erros.regime.texto}
        value={regime}
        onChange={(event) => {
            setRegime(event.target.value);
        }}
        type="number"
        name="regime"
        id="regime"
        label="Regime de Trabalho"
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
export default DataProfessional;
