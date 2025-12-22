import { ActivityItem, PITState } from "./pit.types";

export type Totals = {
  subtotalTotal: number;
  subtotalEnsino: number;
  subtotalGraduacao: number;
  subtotalPos: number;
  subtotalPesquisa: number;
  subtotalExtensao: number;
  subtotalGestao: number;
  subtotalOutras: number;
};

export function calculateTotals(items: ActivityItem[]): Totals {
  let subtotalTotal = 0;
  let subtotalEnsino = 0;
  let subtotalGraduacao = 0;
  let subtotalPos = 0;
  let subtotalPesquisa = 0;
  let subtotalExtensao = 0;
  let subtotalGestao = 0;
  let subtotalOutras = 0;

  for (const element of items) {
    const h = Number(element.horasSemanais || 0);

    if (element.tipo.id === 0) {
      subtotalGraduacao += 2 * h;
      subtotalEnsino += 2 * h;
      subtotalTotal += 2 * h;
    } else if (element.tipo.id === 1) {
      subtotalPos += 2 * h;
      subtotalEnsino += 2 * h;
      subtotalTotal += 2 * h;
    } else if (element.tipo.id === 2) {
      subtotalEnsino += h;
      subtotalTotal += h;
    } else if (element.tipo.id === 3) {
      subtotalPesquisa += h;
      subtotalTotal += h;
    } else if (element.tipo.id === 4) {
      subtotalExtensao += h;
      subtotalTotal += h;
    } else if (element.tipo.id === 5) {
      subtotalGestao += h;
      subtotalTotal += h;
    } else if (element.tipo.id === 6) {
      subtotalOutras += h;
      subtotalTotal += h;
    }
  }

  return {
    subtotalTotal,
    subtotalEnsino,
    subtotalGraduacao,
    subtotalPos,
    subtotalPesquisa,
    subtotalExtensao,
    subtotalGestao,
    subtotalOutras,
  };
}

export function validatePIT(state: PITState): string[] {
  const erros: string[] = [];
  const totals = calculateTotals(state.data);

  const regimeDesc = state.regime?.descricao;

  if (regimeDesc === "20 horas") {
    const falta = 20 - totals.subtotalTotal;
    const sobra = totals.subtotalTotal - 20;

    if (totals.subtotalTotal < 20) {
      erros.push(`Ainda faltam ${falta.toFixed(2)} horas.`);
    } else if (totals.subtotalTotal > 20) {
      erros.push(`Você adicionou mais de 20 horas, ${sobra.toFixed(2)} horas em excedente.`);
    }
  } else {
    const falta = 40 - totals.subtotalTotal;
    const sobra = totals.subtotalTotal - 40;

    if (totals.subtotalTotal < 40) {
      erros.push(`Você não adicionou as 40 horas, faltam ${falta.toFixed(2)} horas.`);
    } else if (totals.subtotalTotal > 40) {
      erros.push(`Você adicionou mais de 40 horas, ${sobra.toFixed(2)} horas em excedente.`);
    }
  }

  if (totals.subtotalEnsino < 16) {
    erros.push("Carga Horária para Ensino abaixo da mínima.");
  } else if (totals.subtotalEnsino > 40) {
    // Mantive a mensagem original
    erros.push("Carga Horária para ensino acima de 20h");
  }

  if (totals.subtotalGraduacao < 4) erros.push("Adicione no mínimo 4 horas para ensino de graduação.");
  if (totals.subtotalPos > 16) erros.push("Você adicionou mais de 16 horas para pos.");
  if (totals.subtotalGestao > 40) erros.push("Você adicionou mais de 40 horas para outras atividades de gestão.");
  if (totals.subtotalExtensao > 20) erros.push("Você adicionou mais de 20 horas para outras atividades de extensão.");
  if (totals.subtotalOutras > 8) erros.push("Você adicionou mais de 8 horas para outras atividades relevantes.");

  return erros;
}
