import React, { useState } from "react";
import { Button, TextField, Stack } from "@mui/material";

type Props = {
  defaultData: { nome: string; siape: string };
  aoEnviar: (dados: { nome: string; siape: string }) => void;
};

export default function DataUser({ aoEnviar, defaultData }: Props) {
  const [nome, setNome] = useState(defaultData.nome);
  const [siape, setSiape] = useState(defaultData.siape);

  const [erros, setErros] = useState({
    siape: { valido: true, texto: "" },
    nome: { valido: true, texto: "" },
  });

  function validarNome(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value.trim().length < 2) {
      setErros((prev) => ({ ...prev, nome: { valido: false, texto: "O nome deve ter ao menos 2 dígitos." } }));
    } else {
      setErros((prev) => ({ ...prev, nome: { valido: true, texto: "" } }));
    }
  }

  function validarSiape(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value.trim().length < 7) {
      setErros((prev) => ({ ...prev, siape: { valido: false, texto: "O SIAPE deve ter ao menos 7 dígitos." } }));
    } else {
      setErros((prev) => ({ ...prev, siape: { valido: true, texto: "" } }));
    }
  }

  function possoEnviar() {
    return erros.nome.valido && erros.siape.valido;
  }

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={(event) => {
        event.preventDefault();
        if (possoEnviar()) aoEnviar({ nome, siape });
      }}
    >
      <TextField
        required
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        onBlur={validarNome}
        error={!erros.nome.valido}
        helperText={erros.nome.texto}
        fullWidth
      />

      <TextField
        required
        label="SIAPE"
        value={siape}
        onChange={(e) => setSiape(e.target.value)}
        onBlur={validarSiape}
        error={!erros.siape.valido}
        helperText={erros.siape.texto}
        type="number"
        fullWidth
      />

      <Button type="submit" variant="contained">
        Avançar
      </Button>
    </Stack>
  );
}
