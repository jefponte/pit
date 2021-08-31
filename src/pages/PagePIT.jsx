import {
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import PanelData from "../components/PanelData";
import PanelPDF from "../components/PanelPDF";
import { DataContext } from "../services/DataContext";
import resolucao from "../doc/resolucao.pdf";
import DataUser from "../components/DataUser";
import DataProfessional from "../components/DataProfessional";

class PagePIT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      siape: "",
      periodo: null,
      regime: null,
      etapa: 0,
      data: [],
    };
    this.handleStep = this.handleStep.bind(this);
  }
  handleStep(dados) {
    this.setState({ ...this.state, ...dados });
    if (this.state.etapa >= 3) {
      this.setState({
        etapa: 0,
      });
      return;
    }
    const novaEtapa = this.state.etapa + 1;
    this.setState({
      etapa: novaEtapa,
    });
  }
  onChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { state } = this;
    const formStep = [
      <DataUser
        aoEnviar={this.handleStep}
        defaultData={{ nome: this.state.nome, siape: this.state.siape }}
      />,
      <DataProfessional
        aoEnviar={this.handleStep}
        defaultData={{ periodo: this.state.periodo, regime: this.state.regime }}
      />,
      <PanelData aoEnviar={this.handleStep} />,
      <PanelPDF aoEnviar={this.handleStep} />,
    ];
    return (
      <Container maxWidth="sm">
        <DataContext.Provider value={state}>
          <br />
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Plano Individual de Trabalho (PIT)
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Utilize o formulário abaixo para gerar o PIT.
          </Typography>
          <p>
            <a href={resolucao}>Download da resolução</a>
          </p>

          <Stepper activeStep={state.etapa}>
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
        </DataContext.Provider>
      </Container>
    );
  }
}
export default PagePIT;
