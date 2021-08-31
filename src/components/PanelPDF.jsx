import React, { useContext } from "react";
import LogoUNILABPreto from "../assets/img/logo-unilab-preto.png";
import { Button, Typography } from "@material-ui/core";
import { DataContext } from "../services/DataContext";
import { savePDF } from "@progress/kendo-react-pdf";
import { useRef } from "react";

const tiposAtividade = [
  { descricao: "ENSINO DE GRADUAÇÃO", id: 0 },
  { descricao: "ENSINO DE PÓS-GRADUAÇÃO STRICTO SENSU E LATO SENSU", id: 1 },
  { descricao: "ATIVIDADES COMPLEMENTARES DE ENSINO", id: 2 },
  { descricao: "PROGRAMAS E PROJETOS DE PESQUISA", id: 3 },
  { descricao: "PROGRAMAS E PROJETOS DE EXTENSÃO", id: 4 },
  { descricao: "ATIVIDADES DE GESTÃO", id: 5 },
  { descricao: "OUTRAS ATIVIDADES RELEVANTES", id: 6 },
];

function showTable01(data) {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>C&oacute;digo</th>
              <th>Disciplina</th>
              <th>Horas semanais</th>
              <th>Subtotal (x2)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => (
              <tr key={index}>
                <td>{element.codigo}</td>
                <td>{element.disciplina}</td>
                <td>{element.horasSemanais}</td>
                <td>{element.horasSemanais * 2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function showTable2(data) {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Programa</th>
              <th>Horas semanais</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => (
              <tr key={index}>
                <td>{element.tipoFuncao.sigla}</td>
                <td>{element.programa}</td>
                <td>{element.horasSemanais}</td>
                <td>{element.horasSemanais}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function showTable34(data) {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Data de Aprovação</th>
              <th>Título</th>
              <th>Horas Semanais</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => (
              <tr key={index}>
                <td>{element.tipoFuncao.sigla}</td>
                <td>{element.dataAprovacao}</td>
                <td>{element.titulo}</td>
                <td>{element.horasSemanais}</td>
                <td>{element.horasSemanais}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function showTable56(data) {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nº da Portaria</th>
              <th>Data</th>
              <th>Cargo ou função</th>
              <th>Horas Semanais</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => (
              <tr key={index}>
                <td>{element.numeroPortaria}</td>
                <td>{element.data}</td>
                <td>{element.cargoFuncao}</td>
                <td>{element.horasSemanais}</td>
                <td>{element.horasSemanais}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function showTableByType(data, idTipo) {
  switch (idTipo) {
    case 0:
      return showTable01(data);
    case 1:
      return showTable01(data);
    case 2:
      return showTable2(data);
    case 3:
      return showTable34(data);
    case 4:
      return showTable34(data);
    case 5:
      return showTable56(data);
    case 6:
      return showTable56(data);
    default:
      console.log("Desenvolvendo");
  }
}
function showData(data, idTipo) {
  let dataPrint = [];
  data.data.forEach((element, index, array) => {
    if (element.tipo.id === idTipo) {
      dataPrint.push(element);
    }
  });
  if (dataPrint.length === 0) {
    return <></>;
  }

  return (
    <>
      <p>
        {idTipo + 1}. {tiposAtividade[idTipo].descricao}
      </p>
      {showTableByType(dataPrint, idTipo)}
    </>
  );
}

function PanelPDF({ aoEnviar }) {
  const contentArea = useRef(null);
  const handleExportWithMethod = (event) => {
    savePDF(contentArea.current, { paperSize: "A4" });
  };
  const contextType = useContext(DataContext);
  console.log(contextType);
  return (
    <>
      <Typography variant="h4" component="h2">
        Verifique as informações e depois clique em Gerar PDF
      </Typography>
        <form
         onSubmit={(event) => {
            event.preventDefault();
            aoEnviar();
          }}
        >
            <Button type="submit" variant="contained" color="primary">
                Voltar
            </Button>
        </form>
      <div className="Post" ref={contentArea}>
        <div className="d-flex justify-content-center">
          <img src={LogoUNILABPreto} width="50%" alt="Logo Unilab" />
          <br />
        </div>
        <div className="">
          <br />
          <p>
            PLANO INDIVIDUAL DE TRABALHO PARA O SEMESTRE {contextType.periodo.descricao}
          </p>
          <p>
            Docente: {contextType.nome} | SIAPE: {contextType.siape}
          </p>
          <br />
        </div>
        {showData(contextType, 0)}
        {showData(contextType, 1)}
        {showData(contextType, 2)}
        {showData(contextType, 3)}
        {showData(contextType, 4)}
        {showData(contextType, 5)}
        {showData(contextType, 6)}
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleExportWithMethod}
      >
        Gerar PDF
      </Button>
    </>
  );
}
export default PanelPDF;
