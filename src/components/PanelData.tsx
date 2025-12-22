// src/components/PanelData.tsx
import React, { useMemo, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";

import {
  ActivityItem,
  Regime,
  TipoAtividade,
  TipoFuncao,
  Programa,
  PesquisaSubtipo,
  OrientacaoSituacao,
  OrientacaoNivelDT,
  OrientacaoTipoDT,
  OrientacaoTipoICIT,
} from "../pit/pit.types";
import { validatePIT } from "../pit/pit.rules";
import Element from "./Element";

/* -------------------------------------------------------------------------- */
/*  Combos existentes                                                         */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/*  Tipos de atividade                                                        */
/* -------------------------------------------------------------------------- */
const tiposAtividade: TipoAtividade[] = [
  { descricao: "ENSINO DE GRADUAÇÃO", id: 0, minimo: 4, maximo: 20 },
  { descricao: "ENSINO DE PÓS-GRADUAÇÃO STRICTO SENSU E LATO SENSU", id: 1, minimo: 0, maximo: 16 },
  { descricao: "ATIVIDADES COMPLEMENTARES DE ENSINO", id: 2, minimo: 8, maximo: 20 },
  { descricao: "PROGRAMAS E PROJETOS DE PESQUISA", id: 3, minimo: 8, maximo: 20 },
  { descricao: "PROGRAMAS E PROJETOS DE EXTENSÃO", id: 4, minimo: 8, maximo: 20 },
  { descricao: "ATIVIDADES DE GESTÃO", id: 5, minimo: 8, maximo: 40 },
  { descricao: "OUTRAS ATIVIDADES RELEVANTES", id: 6, minimo: 8, maximo: 20 },

  // NOVO (subtipos dentro)
  { descricao: "ATIVIDADES DE PESQUISA", id: 7, minimo: 0, maximo: 40 },
];

/* -------------------------------------------------------------------------- */
/*  Pesquisa: opções                                                          */
/* -------------------------------------------------------------------------- */
const pesquisaSubtipos: { value: PesquisaSubtipo; label: string }[] = [
  { value: "ORIENTACAO_MONOGRAFIA", label: "Orientação (Monografia)" },
  { value: "ORIENTACAO_DISSERTACOES_TESES", label: "Orientação (Dissertações e Teses)" },
  { value: "ORIENTACAO_IC_IT", label: "Orientação (Iniciação científica ou tecnológica)" },
  { value: "PROGRAMA_PROJETO_PESQUISA", label: "Programas e Projetos de pesquisa" },
];

const situacoes: { value: OrientacaoSituacao; label: string }[] = [
  { value: "A", label: "A - Em andamento" },
  { value: "C", label: "C - Concluído" },
  { value: "D", label: "D - Paralisado" },
  { value: "E", label: "E - Cancelado" },
];

const niveisDT: { value: OrientacaoNivelDT; label: string }[] = [
  { value: "O", label: "O - Orientador" },
  { value: "C", label: "C - Coorientador" },
];

const tiposDT: { value: OrientacaoTipoDT; label: string }[] = [
  { value: "S", label: "S - Stricto Sensu" },
  { value: "L", label: "L - Lato Sensu" },
];

const tiposICIT: { value: OrientacaoTipoICIT; label: string }[] = [
  { value: "IC", label: "IC - Iniciação Científica" },
  { value: "IT", label: "IT - Iniciação Tecnológica" },
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

  // campos comuns
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

  // NOVO: pesquisa
  const [pesquisaSubtipo, setPesquisaSubtipo] = useState<PesquisaSubtipo | "">("");

  // Monografia / IC-IT / DT
  const [pesquisaSituacao, setPesquisaSituacao] = useState<OrientacaoSituacao | "">("");
  const [pesquisaNomeOrientando, setPesquisaNomeOrientando] = useState("");

  // DT
  const [pesquisaNivelDT, setPesquisaNivelDT] = useState<OrientacaoNivelDT | "">("");
  const [pesquisaTipoDT, setPesquisaTipoDT] = useState<OrientacaoTipoDT | "">("");
  const [pesquisaNomePrograma, setPesquisaNomePrograma] = useState("");

  // IC/IT
  const [pesquisaTipoICIT, setPesquisaTipoICIT] = useState<OrientacaoTipoICIT | "">("");

  // Projeto/Programa pesquisa
  const [pesquisaTipoProjeto, setPesquisaTipoProjeto] = useState<"CD" | "CL" | "">("");
  const [pesquisaDataAprovacao, setPesquisaDataAprovacao] = useState("");
  const [pesquisaTitulo, setPesquisaTitulo] = useState("");

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

    // pesquisa
    setPesquisaSubtipo("");
    setPesquisaSituacao("");
    setPesquisaNomeOrientando("");
    setPesquisaNivelDT("");
    setPesquisaTipoDT("");
    setPesquisaNomePrograma("");
    setPesquisaTipoICIT("");
    setPesquisaTipoProjeto("");
    setPesquisaDataAprovacao("");
    setPesquisaTitulo("");

    setErrosHoras({ valido: true, texto: "" });
  }

  function validarHoras(value: string) {
    const n = Number(value);
    if (Number.isFinite(n) && n > 0 && n <= 10) {
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

  function requireFilled(label: string, value: string) {
    if (value.trim().length === 0) {
      throw new Error(`Campo obrigatório: ${label}`);
    }
  }

  function handleAdd() {
    try {
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

      // 0/1
      if (tipo.id === 0 || tipo.id === 1) {
        requireFilled("Código", codigo);
        requireFilled("Disciplina", disciplina);
        item = { ...base, codigo, disciplina };
      }
      // 2
      else if (tipo.id === 2) {
        if (!tipoFuncao) throw new Error("Campo obrigatório: Tipo");
        if (!programa) throw new Error("Campo obrigatório: Programa");
        item = {
          ...base,
          tipoFuncao,
          programa,
          orientando,
        };
      }
      // 3/4 (mantém teu comportamento atual)
      else if (tipo.id === 3 || tipo.id === 4) {
        if (!tipoFuncao) throw new Error("Campo obrigatório: Tipo");
        requireFilled("Data de Aprovação", dataAprovacao);
        requireFilled("Título", titulo);
        item = {
          ...base,
          tipoFuncao,
          dataAprovacao,
          titulo,
        };
      }
      // 5/6
      else if (tipo.id === 5 || tipo.id === 6) {
        requireFilled("Nº da Portaria", numeroPortaria);
        requireFilled("Data", dataPortaria);
        requireFilled("Cargo ou Função", cargoFuncao);
        item = { ...base, numeroPortaria, data: dataPortaria, cargoFuncao };
      }
      // 7 (NOVO - Atividades e Pesquisa)
      else if (tipo.id === 7) {
        if (!pesquisaSubtipo) throw new Error("Campo obrigatório: Subtipo de Pesquisa");

        // Monografia
        if (pesquisaSubtipo === "ORIENTACAO_MONOGRAFIA") {
          if (!pesquisaSituacao) throw new Error("Campo obrigatório: Situação");
          requireFilled("Nome do Orientando", pesquisaNomeOrientando);
          item = {
            ...base,
            pesquisaSubtipo,
            pesquisaSituacao,
            pesquisaNomeOrientando,
          };
        }

        // Dissertações e Teses
        if (pesquisaSubtipo === "ORIENTACAO_DISSERTACOES_TESES") {
          if (!pesquisaNivelDT) throw new Error("Campo obrigatório: Nível");
          if (!pesquisaTipoDT) throw new Error("Campo obrigatório: Tipo");
          if (!pesquisaSituacao) throw new Error("Campo obrigatório: Situação");
          requireFilled("Nome do Orientando", pesquisaNomeOrientando);
          requireFilled("Nome do Programa", pesquisaNomePrograma);

          item = {
            ...base,
            pesquisaSubtipo,
            pesquisaNivelDT,
            pesquisaTipoDT,
            pesquisaSituacao,
            pesquisaNomeOrientando,
            pesquisaNomePrograma,
          };
        }

        // IC/IT
        if (pesquisaSubtipo === "ORIENTACAO_IC_IT") {
          if (!pesquisaTipoICIT) throw new Error("Campo obrigatório: Tipo (IC/IT)");
          if (!pesquisaSituacao) throw new Error("Campo obrigatório: Situação");
          requireFilled("Nome do Orientando", pesquisaNomeOrientando);

          item = {
            ...base,
            pesquisaSubtipo,
            pesquisaTipoICIT,
            pesquisaSituacao,
            pesquisaNomeOrientando,
          };
        }

        // Programas e Projetos de pesquisa
        if (pesquisaSubtipo === "PROGRAMA_PROJETO_PESQUISA") {
          if (!pesquisaTipoProjeto) throw new Error("Campo obrigatório: Tipo (CD/CL)");
          requireFilled("Data de Aprovação", pesquisaDataAprovacao);
          requireFilled("Título", pesquisaTitulo);

          item = {
            ...base,
            pesquisaSubtipo,
            pesquisaTipoProjeto,
            pesquisaDataAprovacao,
            pesquisaTitulo,
          };
        }
      }

      onAdd(item);
      resetCampos();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Verifique os campos obrigatórios.";
      // reutiliza a “caixa” de warnings também pra erro local
      // (sem mexer no validatePIT)
      alert(msg);
    }
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

  function renderPesquisaForm() {
    return (
      <Stack spacing={2} sx={{ mt: 2 }}>
        <FormControl fullWidth required>
          <InputLabel id="pesquisa-subtipo-label">Subtipo</InputLabel>
          <Select
            labelId="pesquisa-subtipo-label"
            label="Subtipo"
            value={pesquisaSubtipo}
            onChange={(e) => {
              const v = e.target.value as PesquisaSubtipo | "";
              setPesquisaSubtipo(v);

              // reset campos específicos ao trocar o subtipo
              setPesquisaSituacao("");
              setPesquisaNomeOrientando("");
              setPesquisaNivelDT("");
              setPesquisaTipoDT("");
              setPesquisaNomePrograma("");
              setPesquisaTipoICIT("");
              setPesquisaTipoProjeto("");
              setPesquisaDataAprovacao("");
              setPesquisaTitulo("");
            }}
          >
            {pesquisaSubtipos.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Monografia */}
        {pesquisaSubtipo === "ORIENTACAO_MONOGRAFIA" && (
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <InputLabel id="situacao-label">Situação</InputLabel>
              <Select
                labelId="situacao-label"
                label="Situação"
                value={pesquisaSituacao}
                onChange={(e) => setPesquisaSituacao(e.target.value as OrientacaoSituacao)}
              >
                {situacoes.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              required
              label="Nome do Orientando"
              value={pesquisaNomeOrientando}
              onChange={(e) => setPesquisaNomeOrientando(e.target.value)}
              fullWidth
            />

            {horasField}
          </Stack>
        )}

        {/* Dissertações e Teses */}
        {pesquisaSubtipo === "ORIENTACAO_DISSERTACOES_TESES" && (
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <InputLabel id="nivel-dt-label">Nível</InputLabel>
              <Select
                labelId="nivel-dt-label"
                label="Nível"
                value={pesquisaNivelDT}
                onChange={(e) => setPesquisaNivelDT(e.target.value as OrientacaoNivelDT)}
              >
                {niveisDT.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel id="tipo-dt-label">Tipo</InputLabel>
              <Select
                labelId="tipo-dt-label"
                label="Tipo"
                value={pesquisaTipoDT}
                onChange={(e) => setPesquisaTipoDT(e.target.value as OrientacaoTipoDT)}
              >
                {tiposDT.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel id="situacao-dt-label">Situação</InputLabel>
              <Select
                labelId="situacao-dt-label"
                label="Situação"
                value={pesquisaSituacao}
                onChange={(e) => setPesquisaSituacao(e.target.value as OrientacaoSituacao)}
              >
                {situacoes.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              required
              label="Nome do Orientando"
              value={pesquisaNomeOrientando}
              onChange={(e) => setPesquisaNomeOrientando(e.target.value)}
              fullWidth
            />

            <TextField
              required
              label="Nome do Programa"
              value={pesquisaNomePrograma}
              onChange={(e) => setPesquisaNomePrograma(e.target.value)}
              fullWidth
            />

            {horasField}
          </Stack>
        )}

        {/* IC / IT */}
        {pesquisaSubtipo === "ORIENTACAO_IC_IT" && (
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <InputLabel id="tipo-icit-label">Tipo</InputLabel>
              <Select
                labelId="tipo-icit-label"
                label="Tipo"
                value={pesquisaTipoICIT}
                onChange={(e) => setPesquisaTipoICIT(e.target.value as OrientacaoTipoICIT)}
              >
                {tiposICIT.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel id="situacao-icit-label">Situação</InputLabel>
              <Select
                labelId="situacao-icit-label"
                label="Situação"
                value={pesquisaSituacao}
                onChange={(e) => setPesquisaSituacao(e.target.value as OrientacaoSituacao)}
              >
                {situacoes.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              required
              label="Nome do Orientando"
              value={pesquisaNomeOrientando}
              onChange={(e) => setPesquisaNomeOrientando(e.target.value)}
              fullWidth
            />

            {horasField}
          </Stack>
        )}

        {/* Programas e Projetos de pesquisa */}
        {pesquisaSubtipo === "PROGRAMA_PROJETO_PESQUISA" && (
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <InputLabel id="tipo-proj-label">Tipo</InputLabel>
              <Select
                labelId="tipo-proj-label"
                label="Tipo"
                value={pesquisaTipoProjeto}
                onChange={(e) => setPesquisaTipoProjeto(e.target.value as "CD" | "CL")}
              >
                <MenuItem value="CD">CD - Coordenador</MenuItem>
                <MenuItem value="CL">CL - Colaborador</MenuItem>
              </Select>
            </FormControl>

            <TextField
              required
              label="Data de Aprovação"
              type="date"
              value={pesquisaDataAprovacao}
              onChange={(e) => setPesquisaDataAprovacao(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              required
              label="Título"
              value={pesquisaTitulo}
              onChange={(e) => setPesquisaTitulo(e.target.value)}
              fullWidth
            />

            {horasField}
          </Stack>
        )}

        <Button variant="contained" onClick={handleAdd} disabled={!pesquisaSubtipo}>
          Adicionar
        </Button>
      </Stack>
    );
  }

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

    // 3/4 (mantido)
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
    if (tipo.id === 5 || tipo.id === 6) {
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

    // 7 (NOVO)
    if (tipo.id === 7) {
      return renderPesquisaForm();
    }

    return null;
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
