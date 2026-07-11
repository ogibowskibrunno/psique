// Teste do motor de resolução — roda com: node onboarding/instrument.test.js
const { QUESTIONS, RESERVE, PAIR, ALL_FN, resolve, tiebreakNeeded } = require('./instrument.js');

const SLOTS = ['topL','topC','topR','botR','bottom','botL'];
const OPP = { topC:'bottom', bottom:'topC', topL:'topR', topR:'topL', botL:'botR', botR:'botL' };
const col = s => s.endsWith('L') ? 'L' : 'R';

let pass = 0, fail = 0;
const bad = [];
function check(cond, msg) { if (cond) pass++; else { fail++; bad.push(msg); } }

// invariante do modelo PSIQUE: par vertical oposto direto; laterais em colunas opostas
function invariantsOk(res) {
  const s = res.slots;
  // 4 funções, 4 slots distintos
  if (Object.keys(s).length !== 4) return 'nº de slots != 4';
  const used = new Set(Object.values(s));
  if (used.size !== 4) return 'slots repetidos: ' + JSON.stringify(s);
  // superior em topC, inferior em bottom, e são par
  if (s[res.superior] !== 'topC') return 'superior não está em topC';
  if (s[res.inferior] !== 'bottom') return 'inferior não está em bottom';
  if (PAIR[res.superior] !== res.inferior) return 'superior/inferior não são par';
  // par vertical realmente oposto
  const vTop = Object.keys(s).find(f => s[f] === 'topC');
  const vBot = Object.keys(s).find(f => s[f] === 'bottom');
  if (PAIR[vTop] !== vBot) return 'eixo vertical não é um par';
  // laterais: o outro par, em colunas opostas
  const lat = ALL_FN.filter(f => f !== vTop && f !== vBot);
  if (PAIR[lat[0]] !== lat[1]) return 'laterais não são um par';
  if (col(s[lat[0]]) === col(s[lat[1]])) return 'laterais na mesma coluna';
  return null;
}

function randInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function randAnswers() {
  const ans = {};
  for (const q of QUESTIONS) {
    if (q.type === 'bipolar5') ans[q.id] = randInt(-2, 2);
    else if (q.type === 'likert5') ans[q.id] = randInt(1, 5);
    else if (q.type === 'scenario') ans[q.id] = q.options[randInt(0, q.options.length - 1)].infFn;
  }
  return ans;
}

// 1) 5000 respostas aleatórias → invariantes sempre válidos
for (let i = 0; i < 5000; i++) {
  const res = resolve(randAnswers());
  const err = invariantsOk(res);
  check(err === null, `random#${i}: ${err} | ${JSON.stringify(res.slots)}`);
}

// 2) Caso construído: sentimento superior introvertido, pensamento inferior
{
  const a = {};
  // atitude introvertida
  a.A1=-2; a.A2=-2; a.A3=-1; a.A4=-2;
  // preferência: sentimento >> pensamento; sensação > intuição
  a.B1=+2; a.B2=-2; a.B3=-1; a.B4=-1; a.B5=+2; a.B6=+2; a.B7=-2; a.B8=-1;
  // desenvolvimento: F alto, S médio-alto, N médio, T baixo
  a['C-F1']=5; a['C-F2']=5; a['C-S1']=4; a['C-S2']=4; a['C-N1']=3; a['C-N2']=3; a['C-T1']=1; a['C-T2']=2;
  // inferior claramente pensamento
  a.D1='pensamento'; a.D2='pensamento'; a.D3='pensamento'; a.D4='pensamento';
  const r = resolve(a);
  check(r.attitude === 'I', `caso1 atitude: ${r.attitude}`);
  check(r.superior === 'sentimento', `caso1 superior: ${r.superior}`);
  check(r.inferior === 'pensamento', `caso1 inferior: ${r.inferior}`);
  check(r.confidence.crossValidated, `caso1 cross-check falhou`);
  check(invariantsOk(r) === null, `caso1 invariante`);
  console.log('caso1:', JSON.stringify({ att:r.attitude, slots:r.slots, conf:r.confidence }, null, 0));
}

// 3) Caso contraditório: preferência diz pensamento, mas inferior detectada = pensamento
{
  const a = {};
  a.A1=1; a.A2=1; a.A3=0; a.A4=1;
  a.B1=-2; a.B2=+2; a.B5=-1; a.B6=-1;      // preferência puxa pensamento
  a.B3=0; a.B4=0; a.B7=0; a.B8=0;
  a['C-T1']=4; a['C-T2']=4; a['C-F1']=2; a['C-F2']=2;
  a['C-S1']=3; a['C-S2']=3; a['C-N1']=3; a['C-N2']=3;
  a.D1='pensamento'; a.D2='pensamento'; a.D3='pensamento'; a.D4='pensamento'; // inferior = pensamento (contradiz)
  const r = resolve(a);
  const tb = tiebreakNeeded(r);
  console.log('caso3 (contradição):', JSON.stringify({ superior:r.superior, inferior:r.inferior, crossOk:r.confidence.crossValidated, needsTiebreak:r.confidence.needsTiebreak, tiebreak:tb }, null, 0));
  check(invariantsOk(r) === null, `caso3 invariante`);
}

// 4) Distribuição: quantos tipos superiores distintos aparecem em 2000 aleatórios
{
  const counts = {};
  for (let i = 0; i < 2000; i++) { const r = resolve(randAnswers()); counts[r.superior] = (counts[r.superior]||0)+1; }
  console.log('distribuição superior (2000 aleatórios):', counts);
  check(Object.keys(counts).length === 4, 'nem todas as 4 funções apareceram como superior');
}

console.log(`\n${pass} passaram, ${fail} falharam`);
if (fail) { console.log('falhas (até 5):'); bad.slice(0,5).forEach(b => console.log('  -', b)); process.exit(1); }
