import React from 'react';
import Pdf from "react-to-pdf";

const ref = React.createRef();


const PDF = (props) => {
    return(
        <>
            <div className="Post" ref={ref}>
                <div className="">
                    <img src="img/logo-unilab.png" width="50%" alt="Logo Unilab"/>
                    <h1>{props.title}</h1>
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
                            <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Pdf targetRef={ref} filename="post.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Gerar PDF</button>}
            </Pdf>
        </>
    );
}

export default PDF;