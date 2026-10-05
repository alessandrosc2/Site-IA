# Site-IA — landing page

Página única, autocontida. **`index.html`** é o arquivo final: CSS, JS, fontes e logo
já estão embutidos em base64 — abre em qualquer navegador, hospeda em qualquer lugar,
funciona até offline.

---

## 🎨 Paleta usada (extraída do repositório `alessandrosc2/Seu-Site`)

Vem dos tokens da sua V2 (`src/components/v2/v2.css`) — é a identidade que já combina
com o seu logo de foguete:

| Token | Valor | Papel |
|---|---|---|
| `--bg` | `#060b18` | fundo |
| `--bg-alt` | `#080d20` | fundo das seções alternadas |
| `--panel` | `#0b1535` | painéis |
| `--card` | `#111b36` | cards |
| `--card-hi` | `#152342` | card em hover |
| `--border` | `#203252` | bordas |
| `--cyan` | `#00d4e8` | **cor de ação** |
| `--blue` | `#1769ff` | apoio |
| `--green` | `#00e599` | confirmação / garantia |
| `--violet` | `#a78bfa` | **apoio** — privacidade / LGPD |
| `--amber` | `#f5b942` | **apoio** — bônus e urgência |
| `--text` | `#f5f7ff` | texto |
| `--muted` | `#aab6cc` | texto de leitura |
| `--dim` | `#71809b` | texto de apoio |

**Fontes:** `Space Grotesk` (títulos) + `Plus Jakarta Sans` (texto), as mesmas do seu repo.

Para trocar a cor de ação do site inteiro, mude **só** `--cyan` no bloco `:root`
(linha ~25 do `index.html`). Tudo acompanha.

---

## 🧱 Estrutura da página

Mantive a arquitetura de venda do site que você modelou, na mesma ordem:

1. **Nav fixa** com barra de progresso de leitura
2. **Hero** — headline, sub, CTA e painel animado com o pipeline do método
3. **VSL** — espaço do vídeo (16:9)
4. **Resultados** — galeria com os 10 mockups reais, em **grade responsiva** (sem carrossel):
   - ≥1250px → **5 colunas** · 900–1250px → 4 · 680–900px → 3 · <680px → **2 colunas**
   - as colunas são calculadas com `auto-fit`, então a grade se ajusta sozinha em qualquer largura
   - hover com leve zoom e brilho ciano; desativado em telas de toque (`@media (hover:none)`)
5. **Mecanismo** — "Bonita por fora. Estratégica por dentro." em 3 passos
6. **O que você recebe** — 6 módulos + bônus + mockup da área "Meu Projeto"
7. **Bônus de hoje** — barra de urgência (100 compradores) + 4 trilhas de implementação:
   Google Meu Negócio, Search Console, LGPD & Privacidade e **GA4 (bônus exclusivo, em dourado)**
8. **Oferta** — **R$ 47,90**, ancoragem de R$ 197, garantia de 7 dias, selos de pagamento
9. **Comparação** — 3 caminhos: queimar créditos / pagar designer / criar e vender
10. **Objeções** — FAQ com 7 perguntas (accordion, 1 aberto por vez)
11. **Decisão + CTA final**
12. **Rodapé** + **CTA fixo no mobile**

---

## ✏️ O que falta você preencher

| O quê | Onde |
|---|---|
| **Link do checkout** | No JS, no fim do arquivo: `var CHECKOUT = "";` — preencha e todos os 5 botões passam a apontar para lá automaticamente |
| **Vagas vendidas de bônus** | No JS: `var VAGAS = { total: 100, usadas: 0 };` — o contador e a barra se recalculam sozinhos. ⚠️ mantenha o número real: escassez inventada é publicidade enganosa (CDC art. 37) |
| **Sua VSL** | Já está pronto: coloque o arquivo em **`vsl/minha-vsl.mp4`** (leia `vsl/LEIA-ME.txt`). A capa do player já está gerada com a identidade do site |
| **Sua foto** | Bloco marcado `<!-- TROQUE: coloque aqui sua foto real ... -->` na seção de autoridade |
| **Contato** | Rodapé: e-mail e Instagram estão como exemplo (`contato@site-ia.com.br` / `@siteia`) |

---

## 🎬 O vídeo (VSL)

O player já está montado e apontando para um caminho fixo:

```
vsl/minha-vsl.mp4      ← é só colocar o arquivo aqui, com este nome exato
vsl/minha-vsl-poster.webp   ← capa (já gerada, não precisa mexer)
```

- O vídeo **não** é embutido em base64 (ficaria gigante). Ele fica em arquivo,
  então ao publicar, envie a pasta `vsl/` junto.
- Formato recomendado: **MP4 (H.264 + AAC)**, até ~100 MB, 16:9.
- A capa aparece antes do clique e tem um botão de play; ao clicar, o vídeo
  começa e ganha os controles nativos. Depois que começa, não é mais possível
  voltar para a capa (comportamento intencional, foco em conversão).
- Se o arquivo estiver faltando, aparece um aviso amarelo no lugar do player
  (detalhado em `localhost`, neutro no domínio publicado).
- Quer trocar a capa? Grave um print de um trecho do vídeo, salve em 1280×720
  como `vsl/minha-vsl-poster.webp`, sobrescrevendo.
- Prefere YouTube/Vimeo? Dentro do `index.html`, procure por `<!-- ===== VSL =====`
  e há a instrução do embed pronta ali.

---

## 📦 Arquivos

```
site-ia/
├── index.html                     ← página final, TUDO embutido em base64 (~1,1 MB)
├── index-leve.html                ← mesma página, imagens em arquivo (~240 KB + 625 KB)
├── index.template.html            ← versão-fonte com marcadores (para editar e regerar)
├── COMECE-AQUI.txt                ← guia rápido para quem só quer publicar
├── mockups/                       ← os 10 prints otimizados (WebP, 625 KB no total)
├── vsl/                           ← 🎬 AQUI VAI O VÍDEO (minha-vsl.mp4)
├── logo-site.png / .webp          ← sua logo (recortada e otimizada)
├── favicon-32x32.png
├── apple-touch-icon.png / .webp
├── android-chrome-192x192.png
└── android-chrome-512x512.png

ferramentas/
├── gerar.py                       ← regera index.html e index-leve.html a partir do template
├── montar_vitrine.py              ← otimiza os prints e reconstrói a grade
├── preparar_assets.py             ← baixa/embute fontes e trata a logo
├── extrair_site.py                ← extrai a anatomia de qualquer landing page
└── aplicar_marca.py               ← troca nome/cores de um template por config JSON
```

### Qual versão publicar?

| Objetivo | Use |
|---|---|
| Ver/editar rápido no preview, manda por WhatsApp, abre offline | **`index.html`** |
| Hospedar em produção (carregamento mais leve) | **`index-leve.html`** + a pasta `mockups/` junto |

Depois de editar o `index.template.html`, rode `python3 ferramentas/gerar.py` para
reconstruir as duas versões.

---

## 🚀 Publicar

É um site estático. Qualquer uma destas opções funciona arrastando a pasta:

- **Netlify / Vercel** — arrasta a pasta `site-ia` e pronto
- **GitHub Pages** — copie o conteúdo para a raiz do repo e ative o Pages
- **Seu domínio atual** — suba os arquivos via FTP/hospedagem

---

## ⚠️ Observação sobre os textos

A **estrutura e a narrativa** seguem o site de referência, mas os **textos foram escritos
do zero** para o Site-IA — e as imagens de exemplo também.

Motivo: o site que você enviou é de outra pessoa (`metamove.online` / produto Land-IA).
Copiar a redação, os prints de prova social e os números de campanha dele palavra por
palavra seria plágio — e no seu caso ainda seria pior: aquelas provas e depoimentos não
são seus, e usá-los poderia gerar problema de publicidade enganosa.

Também deixei de fora as menções a selos de terceiros (Verisign/PwC/Stanford) que
apareciam no site de referência, porque não há como comprovar o vínculo.

### Sobre as imagens da galeria

Os 10 prints que você enviou já vinham do site de referência (`metamove.online`) — são os
mockups que **aquele** produtor usa para demonstrar o método dele. Eu tratei as imagens
como recortes de "estrutura por segmento" (é assim que estão legendadas na página), mas
vale saber:

- elas não são páginas criadas **por você**, e sim demonstrações do produto original;
- o mesmo vale para os 11 nomes de marca dentro delas (Nexo CRM, Brasa 47, Lumina Prime…);
- o mais seguro, quando você tiver seus próprios exemplos, é substituir os arquivos em
  `site-ia/mockups/` mantendo os mesmos nomes e rodar `python3 ferramentas/gerar.py` —
  a galeria se atualiza sozinha, sem tocar no HTML.

Otimização aplicada: 9,2 MB de PNG viraram **625 KB** de WebP (−93%), mantendo os
720px de largura originais e reduzindo para ~520px (≈2× a largura máxima exibida em
desktop, ou seja, ainda nítido em telas Retina).

Se quiser, eu escrevo variações de headline, faço uma versão de teste A/B ou adapto o
tom para um nicho específico.
