# Site de apps — MEUGOMES

Site mobile-first construído com HTML puro + **Tailwind CSS (CLI)**.

## Estrutura

```
index.html                    → página inicial
app-gestor-financeiro.html    → página do 1º app (Gestor Financeiro)
app-exemplo.html              → página do 2º app (placeholder — trocar nome/dados)
src/input.css                 → ponto de entrada do Tailwind (fontes, ajustes finos)
css/style.css                 → CSS final gerado (não editar à mão — é sobrescrito no build)
tailwind.config.js            → paleta de cores, tipografia e animações personalizadas
js/main.js                    → menu mobile, animações, vídeo lazy-load, envio do formulário
```

Para adicionar um 3º app: copia `app-exemplo.html` para um novo ficheiro
(ex: `app-nome-do-app.html`) e adiciona um novo card em `index.html`, dentro
da secção `#apps`, a apontar para esse ficheiro. Como o Tailwind lê as classes
diretamente dos `.html`, não precisas de tocar no CSS.

## Como trabalhar no projeto

Precisas de [Node.js](https://nodejs.org) instalado. Na primeira vez:

```bash
npm install
```

Sempre que editares o HTML e quiseres ver o CSS atualizado:

```bash
npm run build:css       # gera css/style.css uma vez (versão minificada, pronta para publicar)
npm run watch:css       # mantém a gerar automaticamente enquanto editas
```

Depois de correr `npm run watch:css`, basta abrir os `.html` diretamente no
navegador (ou usar a extensão "Live Server" do VS Code) para veres as alterações.

## O que precisas de substituir (procura por "TODO" nos ficheiros)

1. **Vídeos do YouTube** — em cada página de app, no `data-youtube-id="..."`,
   troca `COLOCAR_ID_DO_VIDEO` pelo ID do vídeo (a parte depois de `watch?v=`).

2. **Links de download** — nos botões "Google Play" e "Baixar APK" (`href="#"`),
   coloca o link real da Play Store e o link direto para o `.apk`.

3. **WhatsApp** — em `index.html`, no botão "Falar no WhatsApp", troca `244900000000`
   pelo número real no formato internacional (código do país + número, sem "+" nem espaços).

4. **Redes sociais** — em `index.html`, secção `#redes`, troca os `href="#"` dos
   ícones do Instagram/Facebook/LinkedIn/YouTube pelos links reais dos teus perfis.
   Se não usares alguma rede, basta apagar esse `<a>`.

5. **Capturas de ecrã** — as "telas" dos telemóveis usam cores/letras como placeholder.
   Substitui o conteúdo pelo `<img src="...">` com screenshots reais do app.

6. **Nome e dados do 2º app** — em `app-exemplo.html` e no card correspondente em
   `index.html`, substitui "Nome do App 2", categoria, descrição, funcionalidades
   e especificações.

## Formulário de contacto → contacto.meugomes@gmail.com

O formulário envia os dados via [FormSubmit.co](https://formsubmit.co) — um
serviço gratuito que entrega diretamente no email, sem precisares de backend
próprio nem conta paga.

**Passo importante de ativação:** na primeira vez que alguém submeter o
formulário depois do site estar publicado (com domínio real, não localmente),
a FormSubmit vai mandar um email de confirmação para `contacto.meugomes@gmail.com`
com um link "Activate Form". É preciso clicar nesse link uma única vez — a
partir daí, todas as submissões seguintes chegam automaticamente à caixa de
entrada, sem passos extra.

Se quiseres trocar o email de destino, basta editar o `action` do `<form>`
em `index.html`:
```html
<form id="contact-form" action="https://formsubmit.co/NOVO-EMAIL@exemplo.com" method="POST">
```

## Como publicar

Depois de correres `npm run build:css`, o site fica pronto em ficheiros
estáticos — `*.html`, `css/style.css` e `js/main.js`. Não precisas de enviar
a pasta `node_modules` nem o `src/` para o servidor (mas não faz mal se enviares).
Basta colocar a pasta num serviço como Netlify, Vercel, GitHub Pages ou o teu
próprio hosting, e apontar o domínio `app.meugomes.it.ao` para lá.
