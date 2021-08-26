import React from 'react';
import LogoUNILABPreto from '../assets/img/logo-unilab-preto.png';
import {Button} from "@material-ui/core";
import jsPDF from "jspdf";
import "jspdf-autotable";

class PanelPDF extends React.Component {

  constructor() {
    super();
    this.state = {
      people: [
        { name: "Keanu ReevesKeanu ReevesKeanu ReevesKeanu Reeves", profession: "Actor" },
        { name: "Lionel Messi", profession: "Football Player" },
        { name: "Cristiano Ronaldo", profession: "Football Player" },
        { name: "Jack Nicklaus", profession: "Golf Player" },
      ]
    }
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Código Teste";
    const headers = [["NAME", "PROFESSION"]];

    const data = this.state.people.map(elt=> [elt.name, elt.profession]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

  render() {
    return (
      <div>
        <Button type="submit" variant="contained" color="primary" onClick={() => this.exportPDF()}>Generate Report</Button>
      </div>
    );
  }
}

export default PanelPDF;

/*

import React, { useContext } from 'react';

import {DataContext} from '../services/DataContext';
import { savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';




const tiposAtividade = [
    { descricao: 'ENSINO DE GRADUAÇÃO', id: 0 },
    { descricao: 'ENSINO DE PÓS-GRADUAÇÃO STRICTO SENSU E LATO SENSU', id: 1},
    { descricao: 'ATIVIDADES COMPLEMENTARES DE ENSINO', id: 2 },
    { descricao: 'PROGRAMAS E PROJETOS DE PESQUISA', id: 3 },
    { descricao: 'PROGRAMAS E PROJETOS DE EXTENSÃO', id: 4 },
    { descricao: "ATIVIDADES DE GESTÃO", id: 5 },
    { descricao: 'OUTRAS ATIVIDADES RELEVANTES', id: 6 }
];

function printData(data){

        return(<>
            <p>Teste</p>
            
            
            {
                tiposAtividade.map((atividade, index) => 
                
                <>

                </>
                )
            }
                

        </>
        );

    
}

function PanelPDF()
{
    const contentArea = useRef(null);
    const handleExportWithMethod = (event) => {
        savePDF(contentArea.current, {paperSize: "A4"});
    };
    const contextType = useContext(DataContext);
    
    return(

        <>
            <div className="Post"  ref={contentArea}>
                <div className="d-flex justify-content-center">
                    <img src={LogoUNILABPreto} width="50%" alt="Logo Unilab"/><br/>
                </div>
                    <p>
                        PLANO INDIVIDUAL DE TRABALHO PARA O SEMESTRE:<br/>{contextType.periodo}
                    </p>
                
                <div className="">
                <p>Docente: {contextType.nome} | SIAPE: {contextType.siape}</p>
                
                    {printData(contextType.data)}
                    
                </div>
                
            </div>
            <Button type="submit" variant="contained" color="primary" onClick={handleExportWithMethod}>
                Gerar PDF
            </Button>
        </>



    );
}
export default PanelPDF;*/