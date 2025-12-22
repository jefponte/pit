import { Typography, Box, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";


export function Footer() {


    return (
        <Box component="footer" sx={{ px: 2, mt: 'auto' }}>
            <Typography variant="h6" align="center" gutterBottom>
                UNILAB - Universidade da Integração Internacional da Lusofonia Afro-Brasileira
            </Typography>
            <Typography variant="subtitle1" align="center" component="p">
                DTI - Diretoria de Tecnologia da Informação
            </Typography>
        </Box>
    );
}
