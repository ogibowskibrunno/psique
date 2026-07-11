// ─────────────────────────────────────────────
// A Psique — instrumento de onboarding (v1)
// Dados declarativos + motor de resolução puro.
//
// Converte respostas → configuração da psique (slots do PSIQUE.html).
// Funções (ids iguais aos do PSIQUE.html):
//   pensamento = T · sentimento = F · sensacao = S · intuicao = N
// Pares de oposição: sentimento↔pensamento, sensacao↔intuicao.
//
// Referências dos itens: docs/onboarding-perguntas.md + onboarding-literatura.md
// ─────────────────────────────────────────────

const INSTRUMENT_VERSION = 'psique-onboarding/1.0.0-draft';

const FN = { T: 'pensamento', F: 'sentimento', S: 'sensacao', N: 'intuicao' };
const PAIR = {
  sentimento: 'pensamento', pensamento: 'sentimento',
  sensacao: 'intuicao',     intuicao: 'sensacao',
};
const ALL_FN = ['pensamento', 'sentimento', 'sensacao', 'intuicao'];

// ─────────────────────────────────────────────
// Banco de itens
// tipos: 'bipolar5' (−2..+2) · 'likert5' (1..5) · 'scenario' (índice p/ infFn)
//        'forced2' (reserva, mesmo shape de scenario, só dispara sob condição)
// ─────────────────────────────────────────────
const QUESTIONS = [
  // ── Fase A — Atitude (I/E) · bipolar 5pt · left=I, right=E ──
  { id:'A1', phase:'A', type:'bipolar5', axis:'attitude',
    text:'Depois de um dia intenso e cheio de gente, o que de fato te recarrega?',
    left:{ att:'I', label:'Ficar um tempo sozinho, em silêncio, para me recompor por dentro' },
    right:{ att:'E', label:'Encontrar mais alguém para conversar e dividir como foi o dia' } },
  { id:'A2', phase:'A', type:'bipolar5', axis:'attitude',
    text:'Ao chegar a um lugar novo cheio de desconhecidos, você costuma…',
    left:{ att:'I', label:'observar de fora primeiro e me aproximar aos poucos' },
    right:{ att:'E', label:'logo puxar conversa e me misturar ao grupo' } },
  { id:'A3', phase:'A', type:'bipolar5', axis:'attitude',
    text:'No meio de um problema difícil, você pensa melhor…',
    left:{ att:'I', label:'em silêncio, remoendo por dentro antes de dizer qualquer coisa' },
    right:{ att:'E', label:'falando em voz alta, raciocinando junto com alguém' } },
  { id:'A4', phase:'A', type:'bipolar5', axis:'attitude',
    text:'Sobre suas relações, o que descreve melhor o seu jeito?',
    left:{ att:'I', label:'poucas relações, mas fundas e de longa data' },
    right:{ att:'E', label:'conheço muita gente e circulo bem por vários grupos' } },

  // ── Fase B — Preferência entre funções · bipolar 5pt · left/right = fn ──
  { id:'B1', phase:'B', type:'bipolar5', pairing:'T-F',
    text:'Numa decisão difícil que afeta outras pessoas, o que pesa mais?',
    left:{ fn:FN.T, label:'a análise mais lógica e coerente, mesmo que desagrade' },
    right:{ fn:FN.F, label:'o impacto humano, o que a decisão faz com cada um' } },
  { id:'B2', phase:'B', type:'bipolar5', pairing:'F-T',
    text:'Um amigo te procura muito abalado. Seu primeiro movimento é…',
    left:{ fn:FN.F, label:'acolher o que ele sente, ficar junto naquilo' },
    right:{ fn:FN.T, label:'ajudar a destrinchar o problema e achar uma saída' } },
  { id:'B3', phase:'B', type:'bipolar5', pairing:'S-N',
    text:'Ao aprender algo novo, você confia mais…',
    left:{ fn:FN.S, label:'nos fatos concretos, nos detalhes verificáveis' },
    right:{ fn:FN.N, label:'no quadro geral, nas conexões, no que aquilo pode vir a ser' } },
  { id:'B4', phase:'B', type:'bipolar5', pairing:'N-S',
    text:'O que prende mais sua atenção numa conversa?',
    left:{ fn:FN.N, label:'as ideias por trás, as possibilidades, aonde leva' },
    right:{ fn:FN.S, label:'os fatos concretos, o que de fato aconteceu, com detalhe' } },
  { id:'B5', phase:'B', type:'bipolar5', pairing:'T-S',
    text:'Você recebe uma tarefa mal explicada. O que faz primeiro?',
    left:{ fn:FN.T, label:'monto a lógica da coisa, entendo o princípio antes de agir' },
    right:{ fn:FN.S, label:'vou ao prático, ao que precisa ser feito, passo a passo' } },
  { id:'B6', phase:'B', type:'bipolar5', pairing:'T-N',
    text:'O que te dá mais satisfação num projeto?',
    left:{ fn:FN.T, label:'que seja coerente e bem estruturado, que a lógica feche' },
    right:{ fn:FN.N, label:'que abra possibilidades novas, que tenha visão de futuro' } },
  { id:'B7', phase:'B', type:'bipolar5', pairing:'F-S',
    text:'Ao organizar um encontro, sua atenção vai mais para…',
    left:{ fn:FN.F, label:'o clima entre as pessoas, que todos se sintam bem' },
    right:{ fn:FN.S, label:'os detalhes concretos: lugar, horário, tudo funcionando' } },
  { id:'B8', phase:'B', type:'bipolar5', pairing:'F-N',
    text:'O que mais te move num trabalho?',
    left:{ fn:FN.F, label:'que tenha sentido, alinhado com aquilo em que acredito' },
    right:{ fn:FN.N, label:'que seja original, que explore caminhos que ninguém viu' } },

  // ── Fase C — Desenvolvimento de cada função · likert 1..5 ──
  { id:'C-T1', phase:'C', type:'likert5', fn:FN.T,
    text:'Consigo analisar um problema de forma lógica mesmo sob pressão.' },
  { id:'C-T2', phase:'C', type:'likert5', fn:FN.T,
    text:'Quando preciso, destrincho um assunto complexo em partes claras e ordenadas.' },
  { id:'C-F1', phase:'C', type:'likert5', fn:FN.F,
    text:'Percebo com clareza o que as pessoas ao redor sentem, mesmo sem elas dizerem.' },
  { id:'C-F2', phase:'C', type:'likert5', fn:FN.F,
    text:'Tomo decisões firmes a partir daquilo que é importante para mim, mesmo contrariando os outros.' },
  { id:'C-S1', phase:'C', type:'likert5', fn:FN.S,
    text:'Reparo em detalhes concretos do ambiente que a maioria deixa passar.' },
  { id:'C-S2', phase:'C', type:'likert5', fn:FN.S,
    text:'Dou conta de tarefas práticas do dia a dia de forma confiável e precisa.' },
  { id:'C-N1', phase:'C', type:'likert5', fn:FN.N,
    text:'Percebo padrões e conexões entre coisas que pareciam não ter relação.' },
  { id:'C-N2', phase:'C', type:'likert5', fn:FN.N,
    text:'Diante do novo, enxergo com facilidade possibilidades que ainda não existem.' },

  // ── Fase D — Assinatura da inferior · scenario (opção → infFn) ──
  // shuffle: true → embaralhar a ordem das opções na renderização
  { id:'D1', phase:'D', type:'scenario', shuffle:true,
    text:'Em qual destas situações você trava ou fica lento, por mais que se esforce?',
    options:[
      { infFn:FN.T, label:'Quando preciso argumentar com lógica na hora — o raciocínio certo só me vem depois.' },
      { infFn:FN.F, label:'Quando me perguntam o que estou sentindo — levo um tempo enorme para saber.' },
      { infFn:FN.S, label:'Quando a tarefa exige lidar com detalhes práticos e concretos — me perco neles.' },
      { infFn:FN.N, label:'Quando esperam que eu enxergue alternativas e possibilidades — não me ocorrem.' },
    ] },
  { id:'D2', phase:'D', type:'scenario', shuffle:true,
    text:'Que tipo de crítica te fere de um jeito desproporcional, difícil de engolir?',
    options:[
      { infFn:FN.T, label:'Dizerem que meu raciocínio não se sustenta, que sou ilógico.' },
      { infFn:FN.F, label:'Dizerem que sou frio ou insensível, que não me importo com as pessoas.' },
      { infFn:FN.S, label:'Dizerem que vivo no mundo da lua, que não presto atenção ao que é real.' },
      { infFn:FN.N, label:'Dizerem que sou sem imaginação, preso ao óbvio, sem visão.' },
    ] },
  { id:'D3', phase:'D', type:'scenario', shuffle:true,
    text:'Quando você está exausto ou muito estressado, o que costuma tomar conta de você?',
    options:[
      { infFn:FN.F, label:'Exploto emocionalmente — choro, ou me convenço de que ninguém gosta de mim.' },
      { infFn:FN.T, label:'Fico ríspido e cortante, martelando críticas frias de um jeito que não é meu.' },
      { infFn:FN.N, label:'Sou tomado por pressentimentos catastróficos, imagino todo tipo de desastre.' },
      { infFn:FN.S, label:'Afundo em excessos concretos — comida, compras, arrumação obsessiva.' },
    ] },
  { id:'D4', phase:'D', type:'scenario', shuffle:true,
    text:'Em que campo você recorre a fórmulas prontas, porque a resposta genuína não vem?',
    options:[
      { infFn:FN.F, label:'Ao demonstrar afeto — recorro a frases feitas, flores, gestos convencionais.' },
      { infFn:FN.T, label:'Ao ter de ser lógico e objetivo — repito chavões e argumentos emprestados.' },
      { infFn:FN.S, label:'Ao ser prático — sigo receitas e rotinas no automático, sem domínio real.' },
      { infFn:FN.N, label:'Ao ter de inovar — repito o que já ouvi, sem que venha algo próprio.' },
    ] },
];

// ── Reserva adaptativa (não entram na sequência fixa; disparam sob condição) ──
const RESERVE = [
  { id:'R1', phase:'R', type:'forced2', trigger:'tie:T-F',
    text:'Ao longo da vida, onde você sempre bateu a cabeça e sofreu mais?',
    options:[
      { infFn:FN.T, label:'em ser lógico e objetivo, em me impor pela razão' },
      { infFn:FN.F, label:'em lidar com o que sinto e com os afetos das relações' },
    ] },
  { id:'R2', phase:'R', type:'forced2', trigger:'tie:S-N',
    text:'O que sempre foi seu calcanhar de Aquiles?',
    options:[
      { infFn:FN.S, label:'lidar com o concreto, com os detalhes práticos do mundo real' },
      { infFn:FN.N, label:'enxergar possibilidades e o quadro maior das coisas' },
    ] },
  // R3/R4 pendentes de decisão de produto (nível das auxiliares / tipo distorcido)
  { id:'R3', phase:'R', type:'forced2', trigger:'aux-level', pending:true,
    text:'Destas duas, qual você usa de forma mais deliberada e confiável quando precisa — não a que prefere, a que obedece?',
    options:[ { auxFn:null, label:'(preenchido em runtime com as duas auxiliares)' } ] },
  { id:'R4', phase:'R', type:'forced2', trigger:'distorted', pending:true,
    text:'Sua resposta acima descreve mais o que você faz por conta própria, ou o que esperaram de você a vida toda?',
    options:[
      { tag:'own', label:'o que faço por conta própria' },
      { tag:'imposed', label:'o que esperaram/exigiram de mim' },
    ] },
];

// ─────────────────────────────────────────────
// Motor de resolução (função pura)
// ─────────────────────────────────────────────
const byId = Object.fromEntries([...QUESTIONS, ...RESERVE].map(q => [q.id, q]));

function zeroFns() { return { pensamento:0, sentimento:0, sensacao:0, intuicao:0 }; }

// argmax determinístico (desempate pela ordem canônica das funções)
function argmaxFn(scores) {
  let best = ALL_FN[0];
  for (const f of ALL_FN) if (scores[f] > scores[best]) best = f;
  return best;
}
function sortedByScore(scores) {
  return [...ALL_FN].sort((a, b) => scores[b] - scores[a]);
}

// respostas: { A1:-2..2, ..., B1:-2..2, ..., 'C-T1':1..5, ..., D1:'pensamento'|... }
// (para scenario/forced2, o valor é a fn escolhida — infFn — já resolvida na UI)
function resolve(answers) {
  // 1. Atitude
  let ei = 0, eiCount = 0;
  for (const q of QUESTIONS) {
    if (q.axis !== 'attitude') continue;
    const v = answers[q.id];
    if (typeof v === 'number') { ei += v; eiCount++; }
  }
  const attitude = ei >= 0 ? 'E' : 'I';
  const confAttitude = eiCount ? Math.abs(ei) / (eiCount * 2) : 0;

  // 2. P(f) — preferência (Fase B), 2 pontos por item
  const P = zeroFns();
  for (const q of QUESTIONS) {
    if (q.phase !== 'B') continue;
    const v = answers[q.id];
    if (typeof v !== 'number') continue;
    // leftPts = 1 − v/2 ; rightPts = 1 + v/2  (v ∈ −2..2)
    P[q.left.fn]  += 1 - v / 2;
    P[q.right.fn] += 1 + v / 2;
  }
  // cada fn aparece como polo em 4 itens → máx 8 pontos → normaliza 0..1
  const Pn = zeroFns();
  for (const f of ALL_FN) Pn[f] = P[f] / 8;

  // 3. D(f) — desenvolvimento (Fase C), 2 itens 1..5 → 0..1
  const Dsum = zeroFns(), Dcount = zeroFns();
  for (const q of QUESTIONS) {
    if (q.phase !== 'C') continue;
    const v = answers[q.id];
    if (typeof v !== 'number') continue;
    Dsum[q.fn] += v; Dcount[q.fn]++;
  }
  const D = zeroFns();
  for (const f of ALL_FN) {
    const n = Dcount[f] || 1;
    D[f] = (Dsum[f] - n) / (n * 4); // (soma − n·1) / (n·4)
  }

  // 4. Inf(f) — assinatura da inferior (Fase D + reserva disparada)
  const InfRaw = zeroFns(); let infCount = 0;
  for (const q of [...QUESTIONS, ...RESERVE]) {
    if (q.type !== 'scenario' && q.type !== 'forced2') continue;
    const chosen = answers[q.id];
    if (chosen && ALL_FN.includes(chosen)) { InfRaw[chosen]++; infCount++; }
  }
  const Inf = zeroFns();
  for (const f of ALL_FN) Inf[f] = infCount ? InfRaw[f] / infCount : 0;

  // 5. Superior por escore composto
  const W = { P: 0.40, D: 0.25, Inf: 0.35 };
  const S = zeroFns();
  for (const f of ALL_FN) S[f] = W.P * Pn[f] + W.D * D[f] - W.Inf * Inf[f];
  const order = sortedByScore(S);
  const superior = order[0];
  const inferior = PAIR[superior];

  // 6. Checagem cruzada: a inferior detectada bate com o par da superior?
  const infDetected = argmaxFn(Inf);
  const superiorMargin = S[order[0]] - S[order[1]];
  const crossOk = infDetected === inferior;

  // 7. Auxiliares = o outro par
  const auxA = order.find(f => f !== superior && f !== inferior);
  const auxB = PAIR[auxA];
  // mais desenvolvida → coluna direita (posição mais avançada)
  const right = D[auxA] >= D[auxB] ? auxA : auxB;
  const left  = right === auxA ? auxB : auxA;
  // nível consciente/inconsciente: corte relativo (midrange dos 4 D)
  const dVals = ALL_FN.map(f => D[f]);
  const threshold = (Math.max(...dVals) + Math.min(...dVals)) / 2;
  const levelSlot = (fn, col) => (D[fn] >= threshold ? 'top' : 'bot') + col;

  const slots = {
    [superior]: 'topC',
    [inferior]: 'bottom',
    [right]: levelSlot(right, 'R'),
    [left]:  levelSlot(left, 'L'),
  };

  // 8. Retrato contínuo: desenvolvimento 0..1 por função (modula o raio no PSIQUE)
  const development = { ...D };

  // 9. Confiança por bloco
  const confidence = {
    attitude: round(confAttitude),
    superior: round(clamp01(superiorMargin / 0.25)), // margem típica ~0..0.25
    crossValidated: crossOk,
    needsTiebreak: !crossOk && superiorMargin < 0.06,
  };

  return {
    version: INSTRUMENT_VERSION,
    attitude, slots, development,
    superior, inferior, auxRight: right, auxLeft: left,
    scores: { P: Pn, D, Inf, S: mapRound(S) },
    confidence,
  };
}

// Qual item de reserva disparar, se houver empate não-validado.
function tiebreakNeeded(result) {
  if (!result.confidence.needsTiebreak) return null;
  const set = new Set([result.superior, result.inferior]);
  if (set.has('pensamento') && set.has('sentimento')) return 'R1';
  if (set.has('sensacao') && set.has('intuicao')) return 'R2';
  return null;
}

// helpers
function clamp01(x) { return Math.max(0, Math.min(1, x)); }
function round(x) { return Math.round(x * 100) / 100; }
function mapRound(o) { const r = {}; for (const k in o) r[k] = round(o[k]); return r; }

// export (Node para testes; browser define globais)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INSTRUMENT_VERSION, QUESTIONS, RESERVE, PAIR, ALL_FN, resolve, tiebreakNeeded };
}
