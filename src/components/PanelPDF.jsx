import React, { useContext } from 'react';
import LogoUNILABPreto from '../assets/img/logo-unilab-preto.png';
import {Button} from "@material-ui/core";
import {DataContext} from '../services/DataContext';
import { savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';



function PanelPDF()
{
    const contentArea = useRef(null);
    const handleExportWithMethod = (event) => {
        savePDF(contentArea.current, {paperSize: "A4"});
    };
    const contextType = useContext(DataContext);

    return(

        <>
            {console.log(contextType)}
            <div className="Post"  ref={contentArea}>
                <div className="d-flex justify-content-center">
                    <img src={LogoUNILABPreto} width="50%" alt="Logo Unilab"/><br/>
                </div>
                <div className="">
                    TesteCódigo
                </div>
                
            </div>
            <Button type="submit" variant="contained" color="primary" onClick={handleExportWithMethod}>
                Gerar PDF
            </Button>
        </>



    );
}
export default PanelPDF;