// src/components/PanelPDF.tsx
import React, { useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import LogoUNILABPreto from "../assets/img/logo-unilab-preto.png";
import { PITState, ActivityItem } from "../pit/pit.types";

const tiposAtividade = [
  { descricao: "ENSINO DE GRADUAÇÃO", id: 0 },
  { descricao: "ENSINO DE PÓS-GRADUAÇÃO STRICTO SENSU E LATO SENSU", id: 1 },
  { descricao: "ATIVIDADES COMPLEMENTARES DE ENSINO", id: 2 },
  { descricao: "PROGRAMAS E PROJETOS DE PESQUISA", id: 3 },
  { descricao: "PROGRAMAS E PROJETOS DE EXTENSÃO", id: 4 },
  { descricao: "ATIVIDADES DE GESTÃO", id: 5 },
  { descricao: "OUTRAS ATIVIDADES RELEVANTES", id: 6 },
] as const;

/** Página A4 real no DOM (210mm x 297mm) */
const A4Paper = styled(Paper)(({ theme }) => ({
  width: "210mm",
  minHeight: "297mm",
  padding: "12mm",
  boxSizing: "border-box",
  background: "#fff",
  color: "#111",
  margin: "16px auto",
  borderRadius: 10,
  boxShadow: theme.shadows[3],
  overflow: "hidden",
  fontSize: "11pt",
  lineHeight: 1.35,

  [theme.breakpoints.down("md")]: {
    transform: "scale(0.92)",
    transformOrigin: "top center",
  },
  [theme.breakpoints.down("sm")]: {
    transform: "scale(0.84)",
    transformOrigin: "top center",
  },
}));

/** Cabeçalho tipo documento: logo em cima, texto embaixo */
const Header = styled("header")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3mm",
  paddingBottom: "6mm",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

/**
 * Logo com proporção preservada:
 * - height fixa (mm) => previsível no A4/PDF
 * - maxWidth evita estourar
 */
const Logo = styled("img")({
  height: "22mm",     // ajuste fino aqui (ex: 20mm, 24mm)
  width: "auto",
  maxWidth: "120mm",  // limite de largura pra não ficar “esticada”
  objectFit: "contain",
  display: "block",
});

/** Bloco central de textos */
const HeaderText = styled("div")({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1.5mm",
  width: "100%",
});

function formatDateBR(d: Date) {
  return `${d.getDate()}/${1 + d.getMonth()}/${d.getFullYear()}`;
}

function onlyType(items: ActivityItem[], idTipo: number) {
  return items.filter((e) => e.tipo.id === idTipo);
}

function totalHours(items: ActivityItem[]) {
  let subtotal = 0;
  items.forEach((element) => {
    const h = Number(element.horasSemanais || 0);
    if (element.tipo.id === 0 || element.tipo.id === 1) subtotal += 2 * h;
    else subtotal += h;
  });
  return subtotal;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack spacing={1} sx={{ mt: 2 }}>
      <Typography sx={{ fontWeight: 700, fontSize: "12pt" }}>{title}</Typography>
      {children}
    </Stack>
  );
}

function SimpleTable({
  head,
  rows,
  footer,
}: {
  head: string[];
  rows: (React.ReactNode[])[];
  footer?: React.ReactNode[];
}) {
  return (
    <Table
      size="small"
      sx={{
        width: "100%",
        tableLayout: "fixed",
        border: "1px solid",
        borderColor: "divider",
        "& th, & td": {
          padding: "6px",
          verticalAlign: "top",
          wordBreak: "break-word",
          fontSize: "10.5pt",
        },
        "& th": {
          fontWeight: 700,
          backgroundColor: "rgba(0,0,0,0.03)",
        },
      }}
    >
      <TableHead>
        <TableRow>
          {head.map((h, i) => (
            <TableCell key={i}>{h}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={i}>
            {r.map((c, j) => (
              <TableCell key={j}>{c}</TableCell>
            ))}
          </TableRow>
        ))}
        {footer && (
          <TableRow>
            {footer.map((c, j) => (
              <TableCell key={j} sx={{ fontWeight: j === 0 ? 700 : undefined }}>
                {c}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function renderByType(items: ActivityItem[], idTipo: number) {
  const dataPrint = onlyType(items, idTipo);
  if (dataPrint.length === 0) return null;

  const heading = `${idTipo + 1}. ${tiposAtividade[idTipo].descricao}`;

  if (idTipo === 0 || idTipo === 1) {
    const subtotal = dataPrint.reduce((acc, e) => acc + Number(e.horasSemanais || 0), 0);
    return (
      <Section title={heading}>
        <SimpleTable
          head={["Código", "Disciplina", "Horas semanais", "Subtotal (x2)"]}
          rows={dataPrint.map((e) => [e.codigo, e.disciplina, e.horasSemanais, "-"])}
          footer={["Subtotal (x2)", "-", "-", subtotal * 2]}
        />
      </Section>
    );
  }

  if (idTipo === 2) {
    const subtotal = dataPrint.reduce((acc, e) => acc + Number(e.horasSemanais || 0), 0);
    return (
      <Section title={heading}>
        <SimpleTable
          head={["Tipo", "Programa", "Horas semanais", "Subtotal"]}
          rows={dataPrint.map((e) => [
            e.tipoFuncao?.sigla,
            e.programa?.descricao,
            e.horasSemanais,
            e.horasSemanais,
          ])}
          footer={["Subtotal", "-", "-", subtotal]}
        />
      </Section>
    );
  }

  if (idTipo === 3 || idTipo === 4) {
    const subtotal = dataPrint.reduce((acc, e) => acc + Number(e.horasSemanais || 0), 0);
    return (
      <Section title={heading}>
        <SimpleTable
          head={["Tipo", "Data de Aprovação", "Título", "Horas Semanais", "Subtotal"]}
          rows={dataPrint.map((e) => [
            e.tipoFuncao?.sigla,
            e.dataAprovacao,
            e.titulo,
            e.horasSemanais,
            e.horasSemanais,
          ])}
          footer={["Subtotal", "-", "-", subtotal, ""]}
        />
      </Section>
    );
  }

  const subtotal = dataPrint.reduce((acc, e) => acc + Number(e.horasSemanais || 0), 0);
  return (
    <Section title={heading}>
      <SimpleTable
        head={["Nº da Portaria", "Data", "Cargo ou função", "Horas Semanais", "Subtotal"]}
        rows={dataPrint.map((e) => [
          e.numeroPortaria,
          e.data,
          e.cargoFuncao,
          e.horasSemanais,
          e.horasSemanais,
        ])}
        footer={["Subtotal", "-", "-", subtotal, ""]}
      />
    </Section>
  );
}

async function exportPDF_A4(contentEl: HTMLElement) {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = 210;
  const pageHeight = 297;

  const canvas = await html2canvas(contentEl, {
    scale: 2.5,
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pageHeight;
  }

  pdf.save("PIT.pdf");
}

type Props = {
  pit: PITState;
  aoEnviar: () => void;
};

export default function PanelPDF({ pit, aoEnviar }: Props) {
  const contentArea = useRef<HTMLDivElement | null>(null);
  const [exporting, setExporting] = useState(false);

  const dataStr = useMemo(() => formatDateBR(new Date()), []);

  const handleExport = async () => {
    if (!contentArea.current) return;
    setExporting(true);
    try {
      await exportPDF_A4(contentArea.current);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        Verifique as informações e depois clique em Gerar PDF
      </Typography>

      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          aoEnviar();
        }}
      >
        <Button type="submit" variant="contained">
          Voltar
        </Button>
      </Box>

      <A4Paper ref={contentArea}>
        <Header>
          <Logo src={LogoUNILABPreto} alt="Logo UNILAB" />

          <HeaderText>
            <Typography sx={{ fontSize: "14pt", fontWeight: 800, letterSpacing: 0.2 }}>
              PLANO INDIVIDUAL DE TRABALHO (PIT)
            </Typography>

            <Typography sx={{ fontSize: "11pt" }}>
              Semestre: <b>{pit.periodo?.descricao ?? ""}</b>
            </Typography>

            <Typography sx={{ fontSize: "11pt" }}>
              Docente: <b>{pit.nome}</b> &nbsp;|&nbsp; SIAPE: <b>{pit.siape}</b>
            </Typography>
          </HeaderText>
        </Header>

        <Divider sx={{ my: "6mm" }} />

        {renderByType(pit.data, 0)}
        {renderByType(pit.data, 1)}
        {renderByType(pit.data, 2)}
        {renderByType(pit.data, 3)}
        {renderByType(pit.data, 4)}
        {renderByType(pit.data, 5)}
        {renderByType(pit.data, 6)}

        <Section title="Carga Horária Semanal Total">
          <SimpleTable
            head={["Total", ""]}
            rows={[[<b key="t">{totalHours(pit.data)} horas</b>, ""]]}
          />
        </Section>

        <Box sx={{ mt: "8mm" }}>
          <Typography sx={{ fontSize: "11pt" }}>Data: {dataStr}</Typography>
        </Box>

        <Box sx={{ mt: "12mm", textAlign: "right" }}>
          <Typography sx={{ fontSize: "11pt" }}>
            _____________________________________
          </Typography>
          <Typography sx={{ mt: "3mm", fontSize: "11pt" }}>
            Assinatura do Docente
          </Typography>
        </Box>
      </A4Paper>

      <Button variant="contained" onClick={handleExport} disabled={exporting}>
        {exporting ? "Gerando..." : "Gerar PDF"}
      </Button>
    </Stack>
  );
}
