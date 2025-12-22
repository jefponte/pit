import React, { useMemo, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Divider,
  Alert,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import List from "@mui/material/List";


import { ActivityItem, Regime, TipoAtividade, TipoFuncao, Programa } from "../pit/pit.types";
import { validatePIT } from "../pit/pit.rules";
import Element from "./Element";

const tiposForm3: TipoFuncao[] = [
  { descricao: "Tutoria", sigla: "T" },
  { descricao: "Coordenação", sigla: "C" },
  { descricao: "Orientação", sigla: "O" },
  { descricao: "Reunião", sigla: "R" },
];

const tiposForm4: TipoFuncao[] = [
  { descricao: "Coordenador", sigla: "CD" },
  { descricao: "Colaborador", sigla: "CL" },
];

const programas: Programa[] = [
  { descricao: "PIBID" },
  { descricao: "Residência" },
  { descricao: "PET" },
  { descricao: "Monitoria" },
  { descricao: "Pulsar" },
  { descricao: "TCC de graduação ou pós-graduação" },
  { descricao: "Supervisão de estágio" },
  { descricao: "Reunião" },
];

const tiposAtividade: TipoAtividade[] = [
  { descricao: "ENSINO DE GRADUAÇÃO", id: 0, minimo: 4, maximo: 20 },
  { descricao: "ENSINO DE PÓS-GRADUAÇÃO STRICTO SENSU E LATO SENSU", id: 1, minimo: 0, maximo: 16 },
  { descricao: "ATIVIDADES COMPLEMENTARES DE ENSINO", id: 2, minimo: 8, maximo: 20 },
  { descricao: "PROGRAMAS E PROJETOS DE PESQUISA", id: 3, minimo: 8, maximo: 20 },
  { descricao: "PROGRAMAS E PROJETOS DE EXTENSÃO", id: 4, minimo: 8, maximo: 20 },
  { descricao: "ATIVIDADES DE GESTÃO", id: 5, minimo: 8, maximo: 40 },
  { descricao: "OUTRAS ATIVIDADES RELEVANTES", id: 6, minimo: 8, maximo: 20 },
];

type Props = {
  data: ActivityItem[];
  regime: Regime | null;
  onAdd: (item: ActivityItem) => void;
  onRemove: (id: number) => void;
  aoEnviar: () => void;
};

export default function PanelData({ data, regime, onAdd, onRemove, aoEnviar }: Props) {
  const [tipo, setTipo] = useState<TipoAtividade | null>(null);

  const [codigo, setCodigo] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [horasSemanais, setHorasSemanais] = useState<string>("");

  const [tipoFuncao, setTipoFuncao] = useState<TipoFuncao | null>(null);
  const [programa, setPrograma] = useState<Programa | null>(null);
  const [orientando, setOrientando] = useState("");

  const [dataAprovacao, setDataAprovacao] = useState("");
  const [titulo, setTitulo] = useState("");

  const [numeroPortaria, setNumeroPortaria] = useState("");
  const [dataPortaria, setDataPortaria] = useState("");
  const [cargoFuncao, setCargoFuncao] = useState("");

  const [errosHoras, setErrosHoras] = useState<{ valido: boolean; texto: string }>({
    valido: true,
    texto: "",
  });

  function resetCampos() {
    setCodigo("");
    setDisciplina("");
    setHorasSemanais("");
    setTipoFuncao(null);
    setPrograma(null);
    setOrientando("");
    setDataAprovacao("");
    setTitulo("");
    setNumeroPortaria("");
    setDataPortaria("");
    setCargoFuncao("");
    setErrosHoras({ valido: true, texto: "" });
  }

  function validarHoras(value: string) {
    const n = Number(value);
    if (n > 0 && n <= 10) {
      setErrosHoras({ valido: true, texto: "" });
      return true;
    }
    setErrosHoras({ valido: false, texto: "Digite um valor até 10" });
    return false;
  }

  const warnings = useMemo(() => {
    return validatePIT({
      etapa: 2,
      nome: "",
      siape: "",
      periodo: null,
      regime,
      data,
    });
  }, [data, regime]);

  function handleAdd() {
    if (!tipo) return;

    const ok = validarHoras(horasSemanais);
    if (!ok) return;

    const horas = Number(horasSemanais);

    const base: ActivityItem = {
      id: Date.now(),
      tipo,
      horasSemanais: horas,
    };

    let item: ActivityItem = base;

    if (tipo.id === 0 || tipo.id === 1) {
      item = { ...base, codigo, disciplina };
    } else if (tipo.id === 2) {
      item = { ...base, tipoFuncao: tipoFuncao ?? undefined, programa: programa ?? undefined, orientando };
    } else if (tipo.id === 3 || tipo.id === 4) {
      item = { ...base, tipoFuncao: tipoFuncao ?? undefined, dataAprovacao, titulo };
    } else {
      item = { ...base, numeroPortaria, data: dataPortaria, cargoFuncao };
    }

    onAdd(item);
    resetCampos();
  }

  const horasField = (
    <TextField
      required
      label="Horas Semanais"
      type="number"
      value={horasSemanais}
      onChange={(e) => setHorasSemanais(e.target.value)}
      onBlur={(e) => validarHoras(e.target.value)}
      error={!errosHoras.valido}
      helperText={errosHoras.texto}
      inputProps={{ step: 0.5 }}
      fullWidth
    />
  );

  function renderFormByTipo() {
    if (!tipo) {
      return (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Selecione uma atividade
        </Typography>
      );
    }

    // 0/1
    if (tipo.id === 0 || tipo.id === 1) {
      return (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField required label="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} fullWidth />
          <TextField required label="Disciplina" value={disciplina} onChange={(e) => setDisciplina(e.target.value)} fullWidth />
          {horasField}
          <Button variant="contained" onClick={handleAdd}>
            Adicionar
          </Button>
        </Stack>
      );
    }

    // 2
    if (tipo.id === 2) {
      return (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Autocomplete
            options={tiposForm3}
            value={tipoFuncao}
            onChange={(_, v) => setTipoFuncao(v)}
            getOptionLabel={(o) => o.descricao}
            renderInput={(params) => <TextField {...params} required label="Tipo" />}
          />

          <Autocomplete
            options={programas}
            value={programa}
            onChange={(_, v) => setPrograma(v)}
            getOptionLabel={(o) => o.descricao}
            renderInput={(params) => <TextField {...params} required label="Programa" />}
          />

          <TextField label="Nome do Orientando" value={orientando} onChange={(e) => setOrientando(e.target.value)} fullWidth />

          {horasField}

          <Button variant="contained" onClick={handleAdd}>
            Adicionar
          </Button>
        </Stack>
      );
    }

    // 3/4
    if (tipo.id === 3 || tipo.id === 4) {
      return (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Autocomplete
            options={tiposForm4}
            value={tipoFuncao}
            onChange={(_, v) => setTipoFuncao(v)}
            getOptionLabel={(o) => o.descricao}
            renderInput={(params) => <TextField {...params} required label="Tipo" />}
          />

          <TextField
            required
            label="Data de Aprovação"
            type="date"
            value={dataAprovacao}
            onChange={(e) => setDataAprovacao(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField required label="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} fullWidth />

          {horasField}

          <Button variant="contained" onClick={handleAdd}>
            Adicionar
          </Button>
        </Stack>
      );
    }

    // 5/6
    return (
      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField required label="Nº da Portaria" value={numeroPortaria} onChange={(e) => setNumeroPortaria(e.target.value)} fullWidth />

        <TextField
          required
          label="Data"
          type="date"
          value={dataPortaria}
          onChange={(e) => setDataPortaria(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField required label="Cargo ou Função" value={cargoFuncao} onChange={(e) => setCargoFuncao(e.target.value)} fullWidth />

        {horasField}

        <Button variant="contained" onClick={handleAdd}>
          Adicionar
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <Autocomplete
        options={tiposAtividade}
        value={tipo}
        onChange={(_, v) => {
          setTipo(v);
          resetCampos();
        }}
        getOptionLabel={(o) => o.descricao}
        renderInput={(params) => <TextField {...params} label="Tipo de Atividade" />}
      />

      {renderFormByTipo()}

      <Divider sx={{ my: 1 }} />

      <List>
        {data.map((atividade) => (
          <Element key={atividade.id} atividade={atividade} removeData={onRemove} />
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <Stack spacing={1}>
        {warnings.map((text, idx) => (
          <Alert severity="warning" key={idx}>
            {text}
          </Alert>
        ))}
      </Stack>

      <Button variant="contained" onClick={aoEnviar}>
        Avançar
      </Button>
    </Stack>
  );
}
