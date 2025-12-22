export type Periodo = { descricao: string };
export type Regime = { descricao: "20 horas" | "40 horas" | "40 horas DE" | string };

export type TipoAtividade = {
  descricao: string;
  id: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  minimo: number;
  maximo: number;
};

export type TipoFuncao = { descricao: string; sigla: string };
export type Programa = { descricao: string };

export type ActivityItem = {
  id: number;
  tipo: TipoAtividade;

  // 0/1
  codigo?: string;
  disciplina?: string;

  // 2
  tipoFuncao?: TipoFuncao;
  programa?: Programa;
  orientando?: string;

  // 3/4
  dataAprovacao?: string;
  titulo?: string;

  // 5/6
  numeroPortaria?: string;
  data?: string;
  cargoFuncao?: string;

  // comum
  horasSemanais: number;
};

export type PITState = {
  etapa: 0 | 1 | 2 | 3;
  nome: string;
  siape: string;
  periodo: Periodo | null;
  regime: Regime | null;
  data: ActivityItem[];
};
