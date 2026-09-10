# MEUGOMES Apps

Site oficial de apresentação dos aplicativos desenvolvidos pela **MEUGOMES**.

O projeto foi desenvolvido com uma abordagem **mobile-first**, utilizando HTML semântico, Tailwind CSS e JavaScript puro. O objetivo é disponibilizar uma apresentação rápida, moderna e responsiva dos aplicativos, incluindo funcionalidades, capturas de ecrã, vídeos demonstrativos e links para download.

---

## 🚀 Tecnologias

- **HTML5** — estrutura e conteúdo das páginas
- **Tailwind CSS** — estilização e design responsivo
- **Tailwind CSS CLI** — compilação e otimização do CSS
- **JavaScript (Vanilla JS)** — interações e funcionalidades
- **Node.js / npm** — gestão das dependências e scripts
- **FormSubmit** — processamento do formulário de contacto

---

## 📁 Estrutura do projeto

```text
meugomes-apps/
│
├── index.html
│   └── Página inicial e catálogo de aplicativos
│
├── app-gestor-financeiro.html
│   └── Página de apresentação do Gestor Financeiro
│
├── app-exemplo.html
│   └── Template para novos aplicativos
│
├── src/
│   └── input.css
│       └── Arquivo de entrada do Tailwind CSS
│
├── css/
│   └── style.css
│       └── CSS compilado pelo Tailwind
│
├── js/
│   └── main.js
│       └── Menu mobile, animações, vídeos e formulário
│
├── tailwind.config.js
│   └── Configuração do Tailwind, cores, fontes e animações
│
├── package.json
│   └── Dependências e scripts do projeto
│
└── README.md
    └── Documentação do projeto
```

> **Nota:** `css/style.css` é um arquivo gerado automaticamente. Evite editar este arquivo diretamente.

---

## 🧩 Adicionar um novo aplicativo

Para adicionar um novo aplicativo ao site:

### 1. Criar a página do aplicativo

Use o template:

```text
app-exemplo.html
```

Faça uma cópia e atribua um nome relacionado ao aplicativo:

```text
app-nome-do-app.html
```

Por exemplo:

```text
app-gestao-vendas.html
```

### 2. Atualizar as informações

Substitua os dados do template:

- Nome do aplicativo
- Categoria
- Descrição
- Funcionalidades
- Benefícios
- Especificações
- Screenshots
- Vídeo demonstrativo
- Links de download

### 3. Adicionar o aplicativo à página inicial

Abra:

```text
index.html
```

Localize a secção:

```html
<section id="apps">
```

Adicione um novo card apontando para a página criada:

```html
<a href="app-nome-do-app.html">
    ...
</a>
```

### 4. Recompilar o CSS

Depois de adicionar ou alterar classes Tailwind:

```bash
npm run build:css
```

---

## 🛠️ Desenvolvimento

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- npm
- VS Code ou outro editor de código

### Instalação

Clone o projeto e entre na pasta:

```bash
git clone URL_DO_REPOSITORIO
cd meugomes-apps
```

Instale as dependências:

```bash
npm install
```

---

## 🎨 Desenvolvimento com Tailwind CSS

### Build manual

Para gerar o CSS otimizado:

```bash
npm run build:css
```

O comando gera:

```text
css/style.css
```

### Modo de desenvolvimento

Durante o desenvolvimento, recomenda-se utilizar:

```bash
npm run watch:css
```

O Tailwind ficará observando as alterações e recompilará o CSS automaticamente.

Em seguida, abra o projeto através do **Live Server do VS Code** ou de outro servidor local.

---

## 📱 Responsividade

O projeto segue uma abordagem **mobile-first**.

O layout deve ser testado principalmente em:

- 📱 Smartphones
- 📲 Tablets
- 💻 Notebooks
- 🖥️ Desktops

Recomenda-se utilizar as ferramentas de desenvolvimento do navegador para testar diferentes tamanhos de ecrã.

---

## 🔧 Configurações e personalização

As principais configurações visuais estão em:

```text
tailwind.config.js
```

Neste arquivo podem ser configurados:

- Paleta de cores
- Tipografia
- Breakpoints
- Animações
- Extensões do Tailwind

Os estilos adicionais ou configurações específicas do projeto podem ser definidos em:

```text
src/input.css
```

---

## 🎬 Vídeos dos aplicativos

Cada página de aplicativo pode utilizar um vídeo demonstrativo do YouTube.

Procure por:

```html
data-youtube-id="COLOCAR_ID_DO_VIDEO"
```

Substitua pelo ID real do vídeo.

Por exemplo, para:

```text
https://www.youtube.com/watch?v=ABC123XYZ
```

utilize:

```html
data-youtube-id="ABC123XYZ"
```

---

## 📸 Capturas de ecrã

As telas dos aplicativos utilizadas atualmente como placeholder devem ser substituídas por capturas reais.

Exemplo:

```html
<img
    src="assets/screenshots/app-home.png"
    alt="Tela inicial do aplicativo"
>
```

Recomenda-se organizar as imagens em uma pasta própria:

```text
assets/
└── screenshots/
    ├── app-home.png
    ├── app-dashboard.png
    └── app-settings.png
```

Utilize sempre textos `alt` descritivos para melhorar a acessibilidade.

---

## 📲 Links dos aplicativos

Antes da publicação, substitua todos os links provisórios:

```html
href="#"
```

pelos links reais.

### Google Play

```html
href="LINK_DA_GOOGLE_PLAY"
```

### Download direto do APK

```html
href="LINK_DO_APK"
```

> Recomenda-se priorizar a distribuição através da Google Play sempre que o aplicativo estiver publicado oficialmente.

---

## 💬 Contacto via WhatsApp

Na página inicial, localize o botão de contacto pelo WhatsApp.

Substitua o número de exemplo:

```text
244900000000
```

pelo número oficial no formato internacional.

Utilize:

```text
código do país + número
```

sem:

- `+`
- espaços
- parênteses
- hífens

Exemplo de estrutura:

```text
244XXXXXXXXX
```

---

## 📧 Formulário de contacto

O formulário utiliza o **FormSubmit** para encaminhar as mensagens diretamente para:

```text
contacto.meugomes@gmail.com
```

Não é necessário manter um backend próprio apenas para processar este formulário.

### Ativação inicial

Após a publicação do site em um domínio real, a primeira submissão poderá exigir uma confirmação do endereço de email.

A FormSubmit enviará uma mensagem de ativação para:

```text
contacto.meugomes@gmail.com
```

É necessário clicar no link de ativação uma única vez.

Depois disso, os novos envios serão encaminhados normalmente.

### Alterar o email de destino

No `index.html`, altere o atributo `action`:

```html
<form
    id="contact-form"
    action="https://formsubmit.co/NOVO-EMAIL@exemplo.com"
    method="POST"
>
```

---

## 🌐 Redes sociais

Os links das redes sociais estão disponíveis na secção:

```html
<section id="redes">
```

Atualize os `href` dos respectivos perfis:

- Instagram
- Facebook
- LinkedIn
- YouTube

Exemplo:

```html
<a href="LINK_DO_INSTAGRAM">
```

Caso uma determinada rede social não seja utilizada, o respetivo elemento pode ser removido.

---

## 🔍 Checklist antes da publicação

Antes de colocar o site em produção, confirme:

### Conteúdo

- [ ] Nome dos aplicativos atualizado
- [ ] Descrições revisadas
- [ ] Funcionalidades atualizadas
- [ ] Informações técnicas corretas
- [ ] Screenshots reais adicionados
- [ ] Vídeos configurados

### Links

- [ ] Google Play atualizado
- [ ] APK atualizado, quando aplicável
- [ ] WhatsApp configurado
- [ ] Instagram configurado
- [ ] Facebook configurado
- [ ] LinkedIn configurado
- [ ] YouTube configurado

### Formulário

- [ ] Email de destino correto
- [ ] Formulário testado
- [ ] FormSubmit ativado

### Qualidade

- [ ] Testado em smartphone
- [ ] Testado em desktop
- [ ] Links verificados
- [ ] Imagens carregam corretamente
- [ ] Não existem `TODO` pendentes
- [ ] Não existem `href="#"` que deveriam ser links reais
- [ ] CSS recompilado

---

## 📦 Build para produção

Antes de publicar:

```bash
npm run build:css
```

O site final é composto principalmente por arquivos estáticos:

```text
*.html
css/style.css
js/main.js
assets/
```

A pasta:

```text
node_modules/
```

não precisa ser enviada para o servidor.

A pasta:

```text
src/
```

também não é necessária para o funcionamento do site publicado, embora seja recomendável mantê-la no repositório para facilitar futuras alterações e builds.

---

## 🚀 Publicação

Por ser um site estático, pode ser publicado em serviços como:

- Netlify
- Vercel
- GitHub Pages
- Hosting tradicional

Após a publicação, configure o domínio desejado, por exemplo:

```text
app.meugomes.it.ao
```

### Estrutura recomendada

```text
app.meugomes.it.ao
        │
        ├── Página inicial
        │
        ├── Aplicativos
        │
        ├── Informações
        │
        └── Downloads
```

---

## 🔐 Boas práticas

Não coloque no código-fonte:

- Senhas
- Tokens de API
- Chaves privadas
- Credenciais de serviços
- Informações sensíveis

Como o site é público, qualquer informação presente no HTML ou JavaScript pode ser visualizada pelo utilizador.

---

## 📌 Convenções de desenvolvimento

Ao adicionar novos aplicativos, utilize nomes de arquivos simples e consistentes:

```text
app-gestor-financeiro.html
app-gestao-vendas.html
app-controlo-estoque.html
app-agenda.html
```

Evite:

```text
App Novo.html
pagina_final_2.html
teste123.html
```

Prefira nomes em **minúsculas**, utilizando hífen para separar palavras.

---

## 🌱 Fluxo recomendado de trabalho

```text
1. Criar/editar página
        ↓
2. Atualizar conteúdo
        ↓
3. Adicionar imagens e links
        ↓
4. Executar npm run watch:css
        ↓
5. Testar no navegador
        ↓
6. Corrigir problemas
        ↓
7. Executar npm run build:css
        ↓
8. Fazer commit
        ↓
9. Publicar
```

---

## 📄 Licença

Este projeto é propriedade da **MEUGOMES**.

O código, conteúdo, identidade visual, textos, imagens e materiais relacionados ao projeto não devem ser reutilizados ou redistribuídos sem autorização.

---

## 👨‍💻 MEUGOMES

**MEUGOMES — Tecnologia, software e soluções digitais.**

Site: `app.meugomes.it.ao`

Contacto: `contacto.meugomes@gmail.com`
