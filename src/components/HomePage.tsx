import {
  Container,
  Typography,
  Link as MuiLink,
  Box,
  Button,

} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";



export const HomePage: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 8 }}>
    <Typography
      variant="h2"
      component="h1"
      align="center"
      sx={{ fontWeight: 700, mb: 2 }}
    >
      Plano Individual de Trabalho (PIT)
    </Typography>
    <Typography
      variant="h6"
      align="center"
      color="text.secondary"
      sx={{ mb: 6 }}
    >
      Utilize o formulário abaixo para gerar o PIT.
    </Typography>

    Aqui é espaço pra conteúdo


  </Container>
);