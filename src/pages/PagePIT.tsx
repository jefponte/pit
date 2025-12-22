import React, { useMemo, useReducer } from "react";
import { Container, Step, StepLabel, Stepper, Typography, Box, Link } from "@mui/material";

import resolucao from "../doc/resolucao.pdf";
import { PITState, ActivityItem, Periodo, Regime } from "../pit/pit.types";
import PanelData from "../components/PanelData";
import PanelPDF from "../components/PanelPDF";
import DataUser from "../components/DataUser";
import DataProfessional from "../components/DataProfessional";

type Action =
  | { type: "SET_USER"; payload: { nome: string; siape: string } }
  | { type: "SET_PRO"; payload: { periodo: Periodo; regime: Regime } }
  | { type: "ADD_ACTIVITY"; payload: ActivityItem }
  | { type: "REMOVE_ACTIVITY"; payload: { id: number } }
  | { type: "NEXT_STEP" };

const initialState: PITState = {
  nome: "",
  siape: "",
  periodo: null,
  regime: null,
  etapa: 0,
  data: [],
};

function reducer(state: PITState, action: Action): PITState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "SET_PRO":
      return { ...state, ...action.payload };
    case "ADD_ACTIVITY":
      return { ...state, data: [...state.data, action.payload] };
    case "REMOVE_ACTIVITY":
      return { ...state, data: state.data.filter((x) => x.id !== action.payload.id) };
    case "NEXT_STEP":
      // mantém o comportamento original: etapa 3 -> volta pra 0
      return { ...state, etapa: (state.etapa >= 3 ? 0 : (state.etapa + 1)) as PITState["etapa"] };
    default:
      return state;
  }
}

export default function PagePIT() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const formStep = useMemo(() => {
    return [
      <DataUser
        key="step0"
        aoEnviar={(payload) => {
          dispatch({ type: "SET_USER", payload });
          dispatch({ type: "NEXT_STEP" });
        }}
        defaultData={{ nome: state.nome, siape: state.siape }}
      />,

      <DataProfessional
        key="step1"
        aoEnviar={(payload) => {
          dispatch({ type: "SET_PRO", payload });
          dispatch({ type: "NEXT_STEP" });
        }}
        defaultData={{ periodo: state.periodo, regime: state.regime }}
      />,

      <PanelData
        key="step2"
        data={state.data}
        regime={state.regime}
        onAdd={(item) => dispatch({ type: "ADD_ACTIVITY", payload: item })}
        onRemove={(id) => dispatch({ type: "REMOVE_ACTIVITY", payload: { id } })}
        aoEnviar={() => dispatch({ type: "NEXT_STEP" })}
      />,

      <PanelPDF
        key="step3"
        pit={state}
        aoEnviar={() => dispatch({ type: "NEXT_STEP" })} // “Voltar” = resetar wizard como antes
      />,
    ];
  }, [state]);

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Plano Individual de Trabalho (PIT)
      </Typography>

      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Utilize o formulário abaixo para gerar o PIT.
      </Typography>

      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Link href={resolucao} underline="hover">
          Download da resolução
        </Link>
      </Box>

      <Stepper activeStep={state.etapa} sx={{ mb: 3 }}>
        <Step>
          <StepLabel>Identificação</StepLabel>
        </Step>
        <Step>
          <StepLabel>Profissional</StepLabel>
        </Step>
        <Step>
          <StepLabel>Carga Horária</StepLabel>
        </Step>
      </Stepper>

      {formStep[state.etapa]}
    </Container>
  );
}
