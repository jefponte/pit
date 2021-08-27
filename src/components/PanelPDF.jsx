import React, { useContext } from 'react';
import LogoUNILABPreto from '../assets/img/logo-unilab-preto.png';
import {Button} from "@material-ui/core";
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
function showTable12(data){
    return (<>
<div className="table-responsive">
    <table className="table table-bordered">
        <thead>
            <tr>
                <th>C&oacute;digo</th>
                <th >Disciplina</th>
                <th>Horas semanais</th>
                <th>Subtotal (x2)</th>
            </tr>
        </thead>
        <tbody>
            {data.map((element, index) => 
                <tr key={index}>
                    <td>{element.codigo}</td>
                    <td>{element.disciplina}</td>
                    <td>{element.horasSemanais}</td>
                    <td>{element.horasSemanais*2}</td>
                </tr>)
            }         
        </tbody>
    </table>   
</div>
    
    </>);
}
function showTableByType(data, idTipo){
    switch(idTipo){
        case 0:
            return showTable12(data);
        case 1: 
            return showTable12(data);
        default: 
            console.log("Desenvolvendo");
    }
}
function showData(data, idTipo){
    let dataPrint = [];
    data.data.forEach((element, index, array) => {
        if(element.tipo.id === idTipo){
            dataPrint.push(element);
        }
    });

    return(
    <>
    <p>{idTipo+1}. {tiposAtividade[idTipo].descricao}</p>
    {showTableByType(dataPrint, idTipo)}
    </>);
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
                <div className="">
                    Docente: {contextType.nome} | SIAPE: {contextType.siape}
                </div>
                {showData(contextType, 0)}
                {showData(contextType, 1)}
            </div>
            <Button type="submit" variant="contained" color="primary" onClick={handleExportWithMethod}>
                Gerar PDF
            </Button>
        </>



    );
}
export default PanelPDF;