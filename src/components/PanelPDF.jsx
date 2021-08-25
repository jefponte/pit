import React, {Component} from 'react';
import Pdf from "react-to-pdf";
import LogoUNILABPreto from '../assets/img/logo-unilab-preto.png';
import {Button} from "@material-ui/core";
import {DataContext} from '../services/DataContext';

const ref = React.createRef();

class PanelPDF extends Component{
    static contextType = DataContext;

    render(){
        return(

            <>
                <div className="Post"  ref={ref}>
                    <div className="d-flex justify-content-center">
                        <img src={LogoUNILABPreto} width="50%" alt="Logo Unilab"/><br/>
                    </div>
                    <div className="">
                        <h4>PLANO INDIVIDUAL DE TRABALHO PARA O SEMESTRE {this.context.periodo}</h4>
                    </div>

                    
                    <div className="table-responsive">
                        
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Disciplina</th>
                                <th scope="col">Horas Semanais</th>
                                <th scope="col">Subtotal (x2)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.context.data.map((atividade, index) => 
                                    <tr  key={index}>
                                        <th scope="row">{atividade.codigo}</th>
                                        <td>{atividade.disciplina}</td>
                                        <td>{atividade.horasSemanais}</td>
                                        <td>{atividade.horasSemanais*2}</td>
                                    </tr>
                                    )}

                            </tbody>
                        </table>

                    </div>
                </div>
                


                <Pdf targetRef={ref} filename="post.pdf">
                    {({ toPdf }) => 
                    <Button type="submit" variant="contained" color="primary" onClick={toPdf}>
                        Gerar PDF
                    </Button>}
                </Pdf>

            </>



        );
    }

}
export default PanelPDF;