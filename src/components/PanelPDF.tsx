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
import { useReactToPrint } from "react-to-print";

import LogoUNILABPreto from "../assets/img/logo-unilab-preto.png";
import { ActivityItem, PITState } from "../pit/pit.types";

const tiposAtividade = [
  { descricao: "ENSINO DE GRADUAÇÃO", id: 0 },
  { descricao: "ENSINO DE PÓS-GRADUAÇÃO STRICTO SENSU E LATO SENSU", id: 1 },
  { descricao: "ATIVIDADES COMPLEMENTARES DE ENSINO", id: 2 },
  { descricao: "PROGRAMAS E PROJETOS DE PESQUISA", id: 3 },
  { descricao: "PROGRAMAS E PROJETOS DE EXTENSÃO", id: 4 },
  { descricao: "ATIVIDADES DE GESTÃO", id: 5 },
  { descricao: "OUTRAS ATIVIDADES RELEVANTES", id: 6 },
  { descricao: "ATIVIDADES DE PESQUISA", id: 7 },
] as const;

/* -------------------------------------------------------------------------- */
/*  A4 + estilos de impressão                                                 */
/* -------------------------------------------------------------------------- */

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

  // visualização em telas menores
  [theme.breakpoints.down("md")]: {
    transform: "scale(0.92)",
    transformOrigin: "top center",
  },
  [theme.breakpoints.down("sm")]: {
    transform: "scale(0.84)",
    transformOrigin: "top center",
  },

  "@media print": {
    margin: 0,
    borderRadius: 0,
    boxShadow: "none",
    transform: "none",
    width: "auto",
    minHeight: "auto",
    padding: "12mm",
    overflow: "visible",
  },
}));

const PrintRoot = styled("div")({
  // Evita que o print pegue scale/transform do preview
  "@media print": {
    transform: "none !important",
  },
});

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3mm",
  paddingBottom: "6mm",
  borderBottom: `1px solid ${theme.palette.divider}`,
  breakInside: "avoid",
  pageBreakInside: "avoid",
}));

const Logo = styled("img")({
  height: "22mm",
  width: "auto",
  maxWidth: "120mm",
  objectFit: "contain",
  display: "block",
});

const HeaderText = styled("div")({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1.5mm",
  width: "100%",
});

const SectionWrap = styled("section")({
  marginTop: "10px",
  breakInside: "avoid",
  pageBreakInside: "avoid",
});

const SignatureBlock = styled("section")({
  marginTop: "12mm",
  breakInside: "avoid",
  pageBreakInside: "avoid",
});

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

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
    <SectionWrap>
      <Stack spacing={1}>
        <Typography sx={{ fontWeight: 700, fontSize: "12pt" }}>{title}</Typography>
        {children}
      </Stack>
    </SectionWrap>
  );
}

function SimpleTable({
  head,
  rows,
  footer,
}: {
  head: string[];
  rows: (React.ReactNode[])[]; // cada linha = cells
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

        breakInside: "avoid",
        pageBreakInside: "avoid",
      }}
    >
      <TableHead>
        <TableRow sx={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
          {head.map((h, i) => (
            <TableCell key={i}>{h}</TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={i} sx={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
            {r.map((c, j) => (
              <TableCell key={j}>{c}</TableCell>
            ))}
          </TableRow>
        ))}

        {footer && (
          <TableRow sx={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
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

/* -------------------------------------------------------------------------- */
/*  Render tabelas (0..6)                                                     */
/* -------------------------------------------------------------------------- */

function renderByType(items: ActivityItem[], idTipo: number) {
  const dataPrint = onlyType(items, idTipo);
  if (dataPrint.length === 0) return null;

  const heading = `${idTipo + 1}. ${tiposAtividade[idTipo].descricao}`;

  // 0/1 (subtotal x2)
  if (idTipo === 0 || idTipo === 1) {
    const subtotal = dataPrint.reduce((acc, e) => acc + Number(e.horasSemanais || 0), 0);
    return (
      <Section title={heading}>
        <SimpleTable
          head={["Código", "Disciplina", "Horas semanais", "Subtotal (x2)"]}
          rows={dataPrint.map((e) => [e.codigo ?? "", e.disciplina ?? "", e.horasSemanais ?? "", "-"])}
          footer={["Subtotal (x2)", "-", "-", subtotal * 2]}
        />
      </Section>
    );
  }

  // 2
  if (idTipo === 2) {
    const subtotal = dataPrint.reduce((acc, e) => acc + Number(e.horasSemanais || 0), 0);
    return (
      <Section title={heading}>
        <SimpleTable
          head={["Tipo", "Programa", "Horas semanais", "Subtotal"]}
          rows={dataPrint.map((e) => [
            e.tipoFuncao?.sigla ?? "",
            e.programa?.descricao ?? "",
            e.horasSemanais ?? "",
            e.horasSemanais ?? "",
          ])}
          footer={["Subtotal", "-", "-", subtotal]}
        />
      </Section>
    );
  }

  // 3/4
  if (idTipo === 3 || idTipo === 4) {
    const subtotal = dataPrint.reduce((acc, e) => acc + Number(e.horasSemanais || 0), 0);
    return (
      <Section title={heading}>
        <SimpleTable
          head={["Tipo", "Data de Aprovação", "Título", "Horas Semanais", "Subtotal"]}
          rows={dataPrint.map((e) => [
            e.tipoFuncao?.sigla ?? "",
            e.dataAprovacao ?? "",
            e.titulo ?? "",
            e.horasSemanais ?? "",
            e.horasSemanais ?? "",
          ])}
          footer={["Subtotal", "-", "-", subtotal, ""]}
        />
      </Section>
    );
  }

  // 5/6
  const subtotal = dataPrint.reduce((acc, e) => acc + Number(e.horasSemanais || 0), 0);
  return (
    <Section title={heading}>
      <SimpleTable
        head={["Nº da Portaria", "Data", "Cargo ou função", "Horas Semanais", "Subtotal"]}
        rows={dataPrint.map((e) => [
          e.numeroPortaria ?? "",
          e.data ?? "",
          e.cargoFuncao ?? "",
          e.horasSemanais ?? "",
          e.horasSemanais ?? "",
        ])}
        footer={["Subtotal", "-", "-", subtotal, ""]}
      />
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Render tabelas adicionais: tipo 7 (Atividades de Pesquisa)                */
/* -------------------------------------------------------------------------- */

function renderPesquisaTables(items: ActivityItem[]) {
  const pesquisa = items.filter((i) => i.tipo.id === 7);

  const mono = pesquisa.filter((i) => i.pesquisaSubtipo === "ORIENTACAO_MONOGRAFIA");
  const dt = pesquisa.filter((i) => i.pesquisaSubtipo === "ORIENTACAO_DISSERTACOES_TESES");
  const icit = pesquisa.filter((i) => i.pesquisaSubtipo === "ORIENTACAO_IC_IT");
  const proj = pesquisa.filter((i) => i.pesquisaSubtipo === "PROGRAMA_PROJETO_PESQUISA");

  const sum = (arr: ActivityItem[]) => arr.reduce((acc, e) => acc + Number(e.horasSemanais || 0), 0);

  if (pesquisa.length === 0) return null;

  return (
    <SectionWrap style={{ marginTop: "14px" }}>
      <Typography sx={{ mt: 2, fontWeight: 800, fontSize: "13pt" }}>
        ATIVIDADES DE PESQUISA
      </Typography>

      {mono.length > 0 && (
        <Section title="Orientação (Monografia)">
          <SimpleTable
            head={["Situação", "Nome do Orientando", "Horas Semanais", "Subtotal"]}
            rows={mono.map((e) => [
              e.pesquisaSituacao ?? "",
              e.pesquisaNomeOrientando ?? "",
              e.horasSemanais ?? "",
              e.horasSemanais ?? "",
            ])}
            footer={["Subtotal", "-", "-", sum(mono)]}
          />
        </Section>
      )}

      {dt.length > 0 && (
        <Section title="Orientação (Dissertações e Teses)">
          <SimpleTable
            head={["Nível", "Tipo", "Situação", "Orientando", "Programa", "Horas", "Subtotal"]}
            rows={dt.map((e) => [
              e.pesquisaNivelDT ?? "",
              e.pesquisaTipoDT ?? "",
              e.pesquisaSituacao ?? "",
              e.pesquisaNomeOrientando ?? "",
              e.pesquisaNomePrograma ?? "",
              e.horasSemanais ?? "",
              e.horasSemanais ?? "",
            ])}
            footer={["Subtotal", "-", "-", "-", "-", "-", sum(dt)]}
          />
        </Section>
      )}

      {icit.length > 0 && (
        <Section title="Orientação (Iniciação científica ou tecnológica)">
          <SimpleTable
            head={["Tipo", "Situação", "Nome do Orientando", "Horas", "Subtotal"]}
            rows={icit.map((e) => [
              e.pesquisaTipoICIT ?? "",
              e.pesquisaSituacao ?? "",
              e.pesquisaNomeOrientando ?? "",
              e.horasSemanais ?? "",
              e.horasSemanais ?? "",
            ])}
            footer={["Subtotal", "-", "-", "-", sum(icit)]}
          />
        </Section>
      )}

      {proj.length > 0 && (
        <Section title="Programas e Projetos de pesquisa">
          <SimpleTable
            head={["Tipo", "Data de Aprovação", "Título", "Horas", "Subtotal"]}
            rows={proj.map((e) => [
              e.pesquisaTipoProjeto ?? "",
              e.pesquisaDataAprovacao ?? "",
              e.pesquisaTitulo ?? "",
              e.horasSemanais ?? "",
              e.horasSemanais ?? "",
            ])}
            footer={["Subtotal", "-", "-", "-", sum(proj)]}
          />
        </Section>
      )}
    </SectionWrap>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

type Props = {
  pit: PITState;
  aoEnviar: () => void;
};

export default function PanelPDF({ pit, aoEnviar }: Props) {
  // ✅ API do react-to-print v3+: usa contentRef
  const contentRef = useRef<HTMLDivElement>(null);
  const [printing, setPrinting] = useState(false);

  const dataStr = useMemo(() => formatDateBR(new Date()), []);

  const handlePrint = useReactToPrint({
    contentRef, // ✅ ESSA é a chave (e resolve "There is nothing to print")
    documentTitle: "PIT",
    onBeforePrint: async () => {
      setPrinting(true);
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    },
    onAfterPrint: () => setPrinting(false),
    pageStyle: `
      @page {
        size: A4;
        margin: 12mm;
      }
      @media print {
        html, body {
          height: auto !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        /* dá margem acima nas páginas seguintes (depende do browser, mas ajuda) */
        .print-root {
          padding-top: 0;
        }

        /* evitar cortes */
        header, section, table, tr, td, th {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      }
    `,
  });

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Verifique as informações e depois clique em Gerar PDF</Typography>

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

      {/* ✅ o ref TEM que estar nesse nó */}
      <PrintRoot ref={contentRef} className="print-root">
        <A4Paper>
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

          {renderPesquisaTables(pit.data)}

          <Section title="Carga Horária Semanal Total">
            <SimpleTable
              head={["Total", ""]}
              rows={[[<b key="t">{totalHours(pit.data)} horas</b>, ""]]}
            />
          </Section>

          {/* assinatura NÃO quebra */}
          <SignatureBlock>
            <Typography sx={{ fontSize: "11pt" }}>Data: {dataStr}</Typography>

            <Box sx={{ mt: "12mm", textAlign: "right" }}>
              <Typography sx={{ fontSize: "11pt" }}>_____________________________________</Typography>
              <Typography sx={{ mt: "3mm", fontSize: "11pt" }}>Assinatura do Docente</Typography>
            </Box>
          </SignatureBlock>
        </A4Paper>
      </PrintRoot>

      <Button
        variant="contained"
        disabled={printing}
        onClick={() => {
          // segurança extra: evita clicar antes do ref montar
          if (!contentRef.current) return;
          handlePrint(); // ✅ agora sempre existe e não dá "then undefined"
        }}
      >
        {printing ? "Abrindo impressão..." : "Gerar PDF"}
      </Button>
    </Stack>
  );
}
