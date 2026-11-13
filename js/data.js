/* Dados iniciais transcritos da planilha de papel (ano 2026).
   Estados de cada célula: "PG" = pago | "" = pendente | "X" = não paga | "-" = não se aplica */

const MESES_INICIAIS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

/* Monta o status de cada mês: "pg" = quantos meses pagos a partir de Jan. */
function _ate(qtd, resto = "") {
  return MESES_INICIAIS.map((_, i) => (i < qtd ? "PG" : resto));
}

const MEMBROS_INICIAIS = [
  { nome: "Anderlei Gonçalves Rios",            cim: "277.762", pag: _ate(9),  obs: "" },
  { nome: "Andrey de Andrade Doutor",           cim: "317.654", pag: _ate(8),  obs: "" },
  { nome: "Bruno Schettini Dantas",             cim: "313.457", pag: _ate(9),  obs: "" },
  { nome: "Caio de Freitas Gama",               cim: "307.909", pag: _ate(8),  obs: "" },
  { nome: "Denner Herlly Franco Rezende",       cim: "325.915", pag: _ate(10), obs: "" },
  { nome: "Douglas Gonçalves Rios",             cim: "343.062", pag: _ate(9),  obs: "" },
  { nome: "Eder Rodrigues da Silva",            cim: "326.924", pag: _ate(12), obs: "" },
  { nome: "Edson Brito da Silva",               cim: "304.342", pag: _ate(10), obs: "" },
  { nome: "Fagner Mariano Bites Leão Leite",    cim: "257.915", pag: _ate(8),  obs: "" },
  { nome: "Flávio Brito da Silva",              cim: "255.470", pag: _ate(7),  obs: "" },
  { nome: "Francisco Almirante Belo de Alencar",cim: "286.782", pag: _ate(9),  obs: "" },
  { nome: "Francisco Jorge Pires Jácome",       cim: "278.640", pag: _ate(12), obs: "" },
  { nome: "Jean Gonzaga",                       cim: "327.294", pag: ["PG","PG","PG","PG","X","X","X","X","X","X","X","X"], obs: "" },
  { nome: "Jomar Peixoto dos Santos",           cim: "284.331", pag: _ate(9),  obs: "" },
  { nome: "José Haroldo Lima Junior",           cim: "328.648", pag: _ate(11), obs: "" },
  { nome: "José Rafael da Silva",               cim: "343.595", pag: _ate(10), obs: "" },
  { nome: "José Tarcísio Souto",                cim: "313.558", pag: _ate(12), obs: "" },
  { nome: "Lucas Felício da Silva",             cim: "307.906", pag: _ate(0),  obs: "" },
  { nome: "Núcio Guedes da Paixão",             cim: "314.425", pag: _ate(11), obs: "" },
  { nome: "Thiago Kotnik Peixoto Alves",        cim: "248.209", pag: _ate(11), obs: "" },
  { nome: "Gregory Souza Brito",                cim: "356.345", pag: _ate(10), obs: "" },
  { nome: "Hicaro Souza Ferreira da Cruz",      cim: "356.344", pag: _ate(11), obs: "" },
  { nome: "Raphael Teixeira Lima Soares",       cim: "356.343", pag: _ate(10), obs: "" },
  { nome: "Rogerio Feliciano da Silva",         cim: "356.408", pag: _ate(9),  obs: "" },
  { nome: "Paulo Roberto Pinelhas",             cim: "363.972", pag: ["-","-","-","-","-","-","-","-","-","-","PG","PG"], obs: "" },
  { nome: "Wender dos Santos Morais",           cim: "363.970", pag: ["-","-","-","-","-","-","-","-","-","-","PG",""],   obs: "" },
  { nome: "Wildersen dos Santos Morais",        cim: "364.146", pag: ["-","-","-","-","-","-","-","-","-","-","PG","PG"], obs: "" },
  { nome: "Joaquim Alves de Melo",              cim: "122.622", pag: _ate(0),  obs: "" },
  { nome: "Lenine Barsanulfo da Cruz",          cim: "131.820", pag: ["","","","","","","","","","","PG","PG"], obs: "07/10 – Lenine – R$ 30,00" }
];
