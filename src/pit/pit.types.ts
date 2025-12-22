// src/pit/pit.types.ts

export type TipoAtividadeId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type TipoAtividade = {
  id: TipoAtividadeId;
  descricao: string;
  minimo: number;
  maximo: number;
};

export type Periodo = { descricao: string };
export type Regime = { descricao: string };

export type TipoFuncao = {
  descricao: string;
  sigla: string;
};

export type Programa = {
  descricao: string;
};

/* ===================== Atividades de Pesquisa ===================== */

export type OrientacaoSituacao = "A" | "C" | "D" | "E";

export type PesquisaSubtipo =
  | "ORIENTACAO_MONOGRAFIA"
  | "ORIENTACAO_DISSERTACOES_TESES"
  | "ORIENTACAO_IC_IT"
  | "PROGRAMA_PROJETO_PESQUISA";

export type OrientacaoNivelDT = "O" | "C";
export type OrientacaoTipoDT = "S" | "L";
export type OrientacaoTipoICIT = "IC" | "IT";

/* =========================== Item =========================== */

export type ActivityItem = {
  id: number;
  tipo: TipoAtividade;
  horasSemanais: number;

  /* Ensino */
  codigo?: string;
  disciplina?: string;

  /* Complementares */
  tipoFuncao?: TipoFuncao | null;
  programa?: Programa | null;
  orientando?: string;

  /* Pesquisa / Extensão */
  dataAprovacao?: string;
  titulo?: string;

  /* Gestão / Outras */
  numeroPortaria?: string;
  data?: string;
  cargoFuncao?: string;

  /* ===== Atividades de Pesquisa ===== */
  pesquisaSubtipo?: PesquisaSubtipo;

  pesquisaSituacao?: OrientacaoSituacao;

  pesquisaNomeOrientando?: string;

  pesquisaNivelDT?: OrientacaoNivelDT;
  pesquisaTipoDT?: OrientacaoTipoDT;
  pesquisaNomePrograma?: string;

  pesquisaTipoICIT?: OrientacaoTipoICIT;

  pesquisaTipoProjeto?: "CD" | "CL";
  pesquisaDataAprovacao?: string;
  pesquisaTitulo?: string;
};

/* =========================== Estado =========================== */

export type PITState = {
  nome: string;
  siape: string;
  periodo: Periodo | null;
  regime: Regime | null;
  etapa: number;
  data: ActivityItem[];
};
