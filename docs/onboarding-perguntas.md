# Banco de itens — Onboarding "Descubra sua Psique" (v1 rascunho)

*Redação PT-BR dos 28 itens (24 centrais + 4 da inferior) + reserva adaptativa,*
*com pesos para o motor de pontuação. Ancorado em [onboarding-literatura.md](onboarding-literatura.md).*
*Codificação das funções: **T** pensamento · **F** sentimento · **S** sensação · **N** intuição.*
*Cada item traz `[fonte]` = âncora na literatura.*

> **Enquadramento honesto (tela de abertura, 2 telas)**
> 1. "Este é um instrumento de autorreflexão à luz da tipologia de Jung — não um
>    diagnóstico. Ao final você recebe uma *estimativa* da sua psique, que você
>    poderá ajustar livremente."
> 2. "Responda pensando no que você **de fato costuma fazer**, não no que
>    gostaria de fazer ou no que acha que deveria. Não há respostas certas."
>    *(von Franz p.15: a inferior se disfarça de 'verdadeiro eu' — por isso
>    perguntamos comportamento habitual, nunca autoimagem.)*

---

## Fase A — Atitude (I/E) · 4 itens · escala bipolar 5 pontos

*Formato: uma afirmação em cada polo, régua de 5 posições (−2 → +2). Saída:
soma −8…+8; sinal = atitude, magnitude = confiança. [fonte: Jung cap. X; formato
OEJTS; confiabilidade IE viável ~.72 no GW]*

| id | Pergunta | Polo I (−) | Polo E (+) |
|---|---|---|---|
| **A1** | Depois de um dia intenso e cheio de gente, o que de fato te recarrega? | Ficar um tempo sozinho, em silêncio, para me recompor por dentro | Encontrar mais alguém para conversar e dividir como foi o dia |
| **A2** | Ao chegar a um lugar novo cheio de desconhecidos, você costuma… | observar de fora primeiro e me aproximar aos poucos | logo puxar conversa e me misturar ao grupo |
| **A3** | No meio de um problema difícil, você pensa melhor… | em silêncio, remoendo por dentro antes de dizer qualquer coisa | falando em voz alta, raciocinando junto com alguém |
| **A4** | Sobre suas relações, o que descreve melhor o seu jeito? | poucas relações, mas fundas e de longa data | conheço muita gente e circulo bem por vários grupos |

*Pontuação: resposta em −2…+2 soma direto a `escoreEI`. `atitude = escoreEI ≥ 0 ? 'E' : 'I'`;
`confiançaAtitude = |escoreEI| / 8`.*

---

## Fase B — Preferência entre funções · 8 itens · cenário bipolar 5 pontos

*Cada cenário opõe duas funções; a régua de 5 pontos distribui a preferência.
As oposições clássicas (T–F e S–N) aparecem **2× cada** — são elas que decidem o
eixo vertical. As 4 combinações cruzadas, 1× cada. Saída: `P(f)` acumulado e
normalizado. [fonte: QUATI (framing situacional); GW (TF fraca → reforço);
von Franz p.15 (comportamento, não valor)]*

**Como pontua:** régua −2…+2 entre o polo esquerdo (função X) e o direito (função Y).
`−2 → X+2 · −1 → X+1 · 0 → X+0,5 e Y+0,5 · +1 → Y+1 · +2 → Y+2`.

| id | par | Pergunta | Polo esquerdo | Polo direito |
|---|---|---|---|---|
| **B1** | T–F | Numa decisão difícil que afeta outras pessoas, o que pesa mais? | **(T)** a análise mais lógica e coerente, mesmo que desagrade | **(F)** o impacto humano, o que a decisão faz com cada um |
| **B2** | F–T | Um amigo te procura muito abalado. Seu primeiro movimento é… | **(F)** acolher o que ele sente, ficar junto naquilo | **(T)** ajudar a destrinchar o problema e achar uma saída |
| **B3** | S–N | Ao aprender algo novo, você confia mais… | **(S)** nos fatos concretos, nos detalhes verificáveis | **(N)** no quadro geral, nas conexões, no que aquilo pode vir a ser |
| **B4** | N–S | O que prende mais sua atenção numa conversa? | **(N)** as ideias por trás, as possibilidades, aonde leva | **(S)** os fatos concretos, o que de fato aconteceu, com detalhe |
| **B5** | T–S | Você recebe uma tarefa mal explicada. O que faz primeiro? | **(T)** monto a lógica da coisa, entendo o princípio antes de agir | **(S)** vou ao prático, ao que precisa ser feito, passo a passo |
| **B6** | T–N | O que te dá mais satisfação num projeto? | **(T)** que seja coerente e bem estruturado, que a lógica feche | **(N)** que abra possibilidades novas, que tenha visão de futuro |
| **B7** | F–S | Ao organizar um encontro, sua atenção vai mais para… | **(F)** o clima entre as pessoas, que todos se sintam bem | **(S)** os detalhes concretos: lugar, horário, tudo funcionando |
| **B8** | F–N | O que mais te move num trabalho? | **(F)** que tenha sentido, alinhado com aquilo em que acredito | **(N)** que seja original, que explore caminhos que ninguém viu |

*Nota de redação (desejabilidade social): ambos os polos de cada par são escritos
como escolhas adultas e competentes — em especial T e F, para não sub-endossar
sentimento nem sobre-endossar pensamento. [fonte: cuidado psicométrico, lit. §5]*

---

## Fase C — Desenvolvimento de cada função · 8 itens · Likert unipolar 5 pontos

*Não medem preferência, e sim **diferenciação**: uso deliberado, confiável, sob
demanda e sob pressão (2 itens por função). Escalas independentes. Escala:
1 nunca · 2 raramente · 3 às vezes · 4 com frequência · 5 quase sempre. Saída:
`D(f)` = soma dos 2 itens (2–10) → normalizada 0–1. [fonte: SL-TDI (independência);
Jung (diferenciação = deliberação + confiabilidade); von Franz p.6 (confiável e
adaptada = superior; lenta e não-confiável = inferior)]*

| id | função | Afirmação |
|---|---|---|
| **C-T1** | T | Consigo analisar um problema de forma lógica **mesmo sob pressão**. |
| **C-T2** | T | Quando preciso, destrincho um assunto complexo em partes claras e ordenadas. |
| **C-F1** | F | Percebo com clareza o que as pessoas ao redor sentem, mesmo sem elas dizerem. |
| **C-F2** | F | Tomo decisões firmes a partir daquilo que é importante para mim, mesmo contrariando os outros. |
| **C-S1** | S | Reparo em detalhes concretos do ambiente que a maioria deixa passar. |
| **C-S2** | S | Dou conta de tarefas práticas do dia a dia de forma confiável e precisa. |
| **C-N1** | N | Percebo padrões e conexões entre coisas que pareciam não ter relação. |
| **C-N2** | N | Diante do novo, enxergo com facilidade possibilidades que ainda não existem. |

*Nota: todos positivamente chaveados. A aquiescência tende a inflar as quatro
funções por igual, então **para o nível relativo** (quem é mais desenvolvida) ela
se autocorrige; **para o limiar** consciente/inconsciente das laterais, usar corte
relativo (mediana/gap entre pares), não absoluto. [fonte: lit. §5]*

---

## Fase D — Assinatura da função inferior · 4 itens · cenário com 4 alternativas

*Cada cenário encena uma das assinaturas gerais da inferior (von Franz cap. I). A
alternativa escolhida aponta **qual função é a inferior** — cada alternativa mapeia
uma função. Saída: `Inf(f)` = nº de vezes que f foi escolhida (0–4) → normalizada.
Serve de árbitro e valida a Fase B (a inferior deve ser o par da superior).*

**D1 — Lentidão** *(von Franz p.8: a inferior não acelera, por mais que se tente)*
> "Em qual destas situações você **trava ou fica lento**, por mais que se esforce?"

| alternativa → inferior | texto |
|---|---|
| → **T** | Quando preciso argumentar com lógica na hora — o raciocínio certo só me vem depois. |
| → **F** | Quando me perguntam o que estou sentindo — levo um tempo enorme para saber. |
| → **S** | Quando a tarefa exige lidar com detalhes práticos e concretos — me perco neles. |
| → **N** | Quando esperam que eu enxergue alternativas e possibilidades — simplesmente não me ocorrem. |

**D2 — Ponto dolorido** *(von Franz p.9: a menor crítica ali é insuportável)*
> "Que tipo de crítica te **fere de um jeito desproporcional**, difícil de engolir?"

| → inferior | texto |
|---|---|
| → **T** | Dizerem que meu raciocínio não se sustenta, que sou ilógico. |
| → **F** | Dizerem que sou frio ou insensível, que não me importo com as pessoas. |
| → **S** | Dizerem que vivo no mundo da lua, que não presto atenção ao que é real. |
| → **N** | Dizerem que sou sem imaginação, preso ao óbvio, sem visão. |

**D3 — Erupção sob estresse** *(von Franz p.11 + Quenk: sob exaustão, a inferior irrompe crua)*
> "Quando você está **exausto ou muito estressado**, o que costuma tomar conta de você?"

| → inferior | texto |
|---|---|
| → **F** | Exploto emocionalmente — choro, ou me convenço de que ninguém gosta de mim. |
| → **T** | Fico ríspido e cortante, martelando críticas frias de um jeito que não é meu. |
| → **N** | Sou tomado por pressentimentos catastróficos, imagino todo tipo de desastre. |
| → **S** | Afundo em excessos concretos — comida, compras, arrumação obsessiva. |

**D4 — Reações de cobertura** *(von Franz p.11–12: quando exigida, a pessoa empresta fórmulas do coletivo)*
> "Em que campo você recorre a **fórmulas prontas**, porque a resposta genuína não vem?"

| → inferior | texto |
|---|---|
| → **F** | Ao demonstrar afeto — recorro a frases feitas, flores, gestos convencionais. |
| → **T** | Ao ter de ser lógico e objetivo — repito chavões e argumentos emprestados. |
| → **S** | Ao ser prático — sigo receitas e rotinas no automático, sem domínio real. |
| → **N** | Ao ter de inovar — repito o que já ouvi, sem que venha algo próprio. |

*Nota: a ordem das alternativas deve ser **embaralhada por aplicação** para não
criar viés posicional. [fonte: lit. §5]*

---

## Reserva adaptativa · até 4 itens (só disparam em contradição)

*Acionados quando `argmax Inf(f) ≠ par(argmax S(f))` — a inferior detectada não
bate com a superior. Desempate por escolha forçada direta entre as duas funções
candidatas a superior. [fonte: von Franz p.16 — decidir pelo sofrimento/pela
inferior; heurística "onde você bate a cabeça"]*

| id | quando | Pergunta (escolha forçada A/B entre as 2 candidatas) |
|---|---|---|
| **R1** | empate T vs F na superior | "Ao longo da vida, onde você sempre **bateu a cabeça** e sofreu mais: em ser lógico e objetivo, ou em lidar com o que sente e com os afetos?" (o campo do sofrimento = inferior; a outra tende à superior) |
| **R2** | empate S vs N | "O que sempre foi seu **calcanhar de Aquiles**: lidar com o concreto e os detalhes práticos, ou enxergar possibilidades e o quadro maior?" |
| **R3** | empate entre auxiliares (nível) | "Destas duas, qual você usa de forma mais **deliberada e confiável quando precisa** — não a que prefere, a que obedece?" |
| **R4** | tipo distorcido suspeito | "Pensando na sua resposta acima: ela descreve mais **o que você faz por conta própria**, ou o que esperaram/exigiram de você a vida toda?" *(von Franz p.3–4: tipos distorcidos)* |

---

## Motor de resolução (especificação — a implementar depois)

```
Entradas normalizadas 0–1 por função f ∈ {T,F,S,N}:
  P(f)   preferência   (Fase B)
  D(f)   desenvolvimento (Fase C)
  Inf(f) sinal de inferior (Fase D)
  escoreEI → atitude global (Fase A)

1. SUPERIOR
   S(f) = 0,40·P(f) + 0,25·D(f) − 0,35·Inf(f)
   superior = argmax S(f)            → slot topC
   inferior = par(superior)          → slot bottom   (oposição direta, rígida)
   [pesos: von Franz p.16 dá peso alto à inferior; calibrar no piloto]

2. CHECAGEM CRUZADA
   se argmax Inf(f) ≠ inferior  → dispara R1/R2 (reserva) e recomputa

3. AUXILIARES  (o outro par)
   a mais desenvolvida (maior D) → coluna DIREITA (topR/botR, mais avançada)
   a outra                       → coluna ESQUERDA
   nível de cada uma:
     D(f) ≥ limiar_relativo ? consciente (slot top) : inconsciente (slot bot)
     limiar por gap/mediana, não absoluto (corrige aquiescência)

4. ATITUDE
   escoreEI → posição dos rótulos introversão/extroversão

5. RETRATO CONTÍNUO  (o diferencial)
   D(f) modula o raio de repouso dentro da faixa de cada slot →
   duas pessoas com a mesma configuração ganham silhuetas distintas.

6. CONFIANÇA por colocação = margem entre candidatos; margens baixas viram
   convite explícito ao ajuste manual na tela de resultado.
```

**Entrega:** a revelação reusa a animação de entrada existente (as funções
emergem do centro já na configuração descoberta, nomeadas uma a uma) e desemboca
no esquema interativo editável — *"isto é uma estimativa; ajuste como sentir."*
Isso é fiel à individuação (processo, não rótulo) e é a camada de valor que
blinda o app na guideline 4.2 da Apple.

---

## Contagem e cobertura

- **28 itens centrais** (A:4 · B:8 · C:8 · D:4 + 4 reserva sob demanda) → dentro
  da meta de 20–30, ~5–7 min de resposta.
- Cada função aparece: **B** (4–6 comparações), **C** (2 escalas de nível),
  **D** (4 chances como inferior) → triangulação por três métodos independentes.
- Oposições clássicas T–F e S–N reforçadas (2× em B) — as que decidem o eixo.

## Pendências para revisão antes de fixar

1. **Itens S–N em PT-BR** (B3, B4, C-S*, C-N*): ponto fraco documentado do QUATI —
   pilotar com falantes nativos. [lit. §7]
2. Confirmar pesos do motor (0,40 / 0,25 / 0,35) — provisórios até um piloto.
3. Decidir tratamento do tipo distorcido: item R4 vs. nota interpretativa.
4. Revisar D3/D4 para garantir que cada alternativa evoca a *erupção da* função
   inferior (não o uso maduro dela) — conferir contra Quenk por tipo.
