/* Pagamento Loja – lógica da planilha */

const CHAVE = "pagamentoLoja.v1";
const CICLO = ["", "PG", "X", "-"]; // ordem ao clicar na célula

let estado = carregar();

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo && salvo.meses && salvo.membros) return salvo;
  } catch (e) { /* ignora */ }
  return dadosOriginais();
}

function dadosOriginais() {
  return {
    meses: [...MESES_INICIAIS],
    membros: MEMBROS_INICIAIS.map(m => ({ ...m, pag: [...m.pag] }))
  };
}

function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* ignora */ }
}

/* ---------- Renderização ---------- */
const $thead = document.querySelector("#tabela thead");
const $tbody = document.querySelector("#tabela tbody");
const $tfoot = document.querySelector("#tabela tfoot");
const $busca = document.getElementById("busca");

function render() {
  // Cabeçalho
  $thead.innerHTML = "";
  const tr = document.createElement("tr");
  tr.append(th("#", "col-n"), th("Nome", "col-nome"), th("CIM", "col-cim"));
  estado.meses.forEach(m => tr.append(th(m)));
  tr.append(th("Pagos", "col-tot"), th("Observações", "col-obs"), th("", "col-acao"));
  $thead.append(tr);

  // Corpo
  $tbody.innerHTML = "";
  const termo = $busca.value.trim().toLowerCase();
  estado.membros.forEach((membro, i) => {
    if (termo && !(membro.nome.toLowerCase().includes(termo) || membro.cim.includes(termo))) return;

    const linha = document.createElement("tr");
    linha.append(td(i + 1, "col-n"), td(membro.nome, "col-nome"), td(membro.cim, "col-cim"));

    estado.meses.forEach((_, j) => {
      const celula = document.createElement("td");
      const v = membro.pag[j] || "";
      celula.textContent = v;
      celula.className = "cel " + classeStatus(v);
      celula.title = "Clique para alterar";
      celula.addEventListener("click", () => alternar(i, j));
      linha.append(celula);
    });

    linha.append(td(contarPagos(membro), "col-tot"));

    const tdObs = document.createElement("td");
    tdObs.className = "col-obs";
    const input = document.createElement("input");
    input.type = "text";
    input.value = membro.obs || "";
    input.placeholder = "Observação...";
    input.addEventListener("input", () => { membro.obs = input.value; salvar(); });
    tdObs.append(input);
    linha.append(tdObs);

    const tdAcao = document.createElement("td");
    tdAcao.className = "col-acao";
    const del = document.createElement("button");
    del.className = "x-btn";
    del.title = "Remover membro";
    del.textContent = "✕";
    del.addEventListener("click", () => removerMembro(i));
    tdAcao.append(del);
    linha.append(tdAcao);

    $tbody.append(linha);
  });

  // Rodapé: total de pagos por mês
  $tfoot.innerHTML = "";
  const rodape = document.createElement("tr");
  rodape.append(td("", "col-n"), td("Total pagos no mês", "col-nome"), td("", "col-cim"));
  estado.meses.forEach((_, j) => {
    const total = estado.membros.filter(m => m.pag[j] === "PG").length;
    rodape.append(td(total));
  });
  rodape.append(td(""), td(""), td(""));
  $tfoot.append(rodape);
}

function th(texto, classe) {
  const e = document.createElement("th");
  e.textContent = texto;
  if (classe) e.className = classe;
  return e;
}

function td(texto, classe) {
  const e = document.createElement("td");
  e.textContent = texto;
  if (classe) e.className = classe;
  return e;
}

function classeStatus(v) {
  return { PG: "pg", X: "x", "-": "na" }[v] || "vazio";
}

function contarPagos(membro) {
  return estado.meses.reduce((n, _, j) => n + (membro.pag[j] === "PG" ? 1 : 0), 0);
}

/* ---------- Ações ---------- */
function alternar(i, j) {
  const atual = estado.membros[i].pag[j] || "";
  const prox = CICLO[(CICLO.indexOf(atual) + 1) % CICLO.length];
  estado.membros[i].pag[j] = prox;
  salvar();
  render();
}

function adicionarMes() {
  const nome = prompt("Nome do novo mês (ex.: Jan/27):");
  if (!nome || !nome.trim()) return;
  estado.meses.push(nome.trim());
  estado.membros.forEach(m => m.pag.push(""));
  salvar();
  render();
}

function adicionarMembro() {
  const nome = prompt("Nome do membro:");
  if (!nome || !nome.trim()) return;
  const cim = prompt("CIM (ex.: 123.456):") || "";
  estado.membros.push({
    nome: nome.trim(),
    cim: cim.trim(),
    pag: estado.meses.map(() => ""),
    obs: ""
  });
  salvar();
  render();
}

function removerMembro(i) {
  if (!confirm(`Remover "${estado.membros[i].nome}"?`)) return;
  estado.membros.splice(i, 1);
  salvar();
  render();
}

function exportarCsv() {
  const cab = ["Nome", "CIM", ...estado.meses, "Observações"];
  const linhas = estado.membros.map(m =>
    [m.nome, m.cim, ...estado.meses.map((_, j) => m.pag[j] || ""), m.obs || ""]
  );
  const csv = [cab, ...linhas]
    .map(l => l.map(c => `"${String(c).replace(/"/g, '""')}"`).join(";"))
    .join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pagamento-loja.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

function restaurar() {
  if (!confirm("Isso apaga suas alterações e volta aos dados da planilha original. Continuar?")) return;
  estado = dadosOriginais();
  salvar();
  render();
}

/* ---------- Eventos ---------- */
document.getElementById("btnAddMes").addEventListener("click", adicionarMes);
document.getElementById("btnAddMembro").addEventListener("click", adicionarMembro);
document.getElementById("btnCsv").addEventListener("click", exportarCsv);
document.getElementById("btnReset").addEventListener("click", restaurar);
$busca.addEventListener("input", render);

render();
