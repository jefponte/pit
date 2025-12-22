import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { Periodo, Regime } from "../pit/pit.types";

const periodos: Periodo[] = [
  { descricao: "2025.1" }, { descricao: "2025.2" }, { descricao: "2026.1" }, { descricao: "2026.2" },
];

const regimes: Regime[] = [
  { descricao: "20 horas" },
  { descricao: "40 horas" },
  { descricao: "40 horas DE" },
];

type Props = {
  defaultData: { periodo: Periodo | null; regime: Regime | null };
  aoEnviar: (dados: { periodo: Periodo; regime: Regime }) => void;
};

export default function DataProfessional({ aoEnviar, defaultData }: Props) {
  const [periodo, setPeriodo] = useState<Periodo | null>(defaultData.periodo);
  const [regime, setRegime] = useState<Regime | null>(defaultData.regime);

  const canSubmit = Boolean(periodo && regime);

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={(event) => {
        event.preventDefault();
        if (periodo && regime) aoEnviar({ periodo, regime });
      }}
    >
      <Autocomplete
        options={periodos}
        value={periodo}
        onChange={(_, v) => setPeriodo(v)}
        getOptionLabel={(o) => o.descricao}
        renderInput={(params) => <TextField {...params} required label="Período Letivo" />}
      />

      <Autocomplete
        options={regimes}
        value={regime}
        onChange={(_, v) => setRegime(v)}
        getOptionLabel={(o) => o.descricao}
        renderInput={(params) => <TextField {...params} required label="Regime de Trabalho" />}
      />

      <Button type="submit" variant="contained" disabled={!canSubmit}>
        Avançar
      </Button>
    </Stack>
  );
}
