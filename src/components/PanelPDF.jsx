import React, {Component} from 'react';
import Pdf from "react-to-pdf";
import LogoUNILABPreto from '../assets/img/logo-unilab-preto.png';
import {Button} from "@material-ui/core";
import {DataContext} from '../services/DataContext';

const ref = React.createRef();

class PanelPDF extends Component{
    static contextType = DataContext;
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    render(){
        return(

            <>
               {console.log(this.context)}
               
                <div className="Post" ref={ref}>
                    <div className="">
                        <img src={LogoUNILABPreto} width="50%" alt="Logo Unilab"/>
                        {this.props.data.nome}
                    </div>
                    <div className="table-responsive">
                        <h4>PLANO INDIVIDUAL DE TRABALHO PARA O SEMESTRE 2021.1</h4>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                <th scope="col">Tipo de Atividade</th>
                                <th scope="col">CH MÍN.</th>
                                <th scope="col">CH MÁX.</th>
                                <th scope="col">OBSERVAÇÕES</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>

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