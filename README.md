# Digital Pulse | Geração Z, flexibilidade e conexão

![Prévia da página inicial do Digital Pulse](assets/fotos/preview-digital-pulse.jpg)

> Projeto acadêmico: **Front-end & Copilotagem com IA**, dupla de estudantes de Análise e Desenvolvimento de Sistemas.  
> **Link do GitHub Pages:** `[ADICIONAR APÓS PUBLICAR]`  
> **Repositório público:** `[ADICIONAR URL DO REPOSITÓRIO]`

## 1. Visão geral e delimitação

O **Digital Pulse** explora a relação entre modelos de trabalho (remoto, híbrido e presencial) e preferências e desafios socioemocionais da **Geração Z**. O recorte procura investigar um paradoxo: **mais flexibilidade pode ampliar a autonomia, mas conexões humanas e o bem-estar continuam essenciais**. O site não recomenda uma profissão de maneira científica e não realiza avaliação psicológica.

A aplicação contém: página inicial editorial com pesquisas; seção Sobre; painel Dados com gráficos; Explorar com carreiras, habilidades e guia expansível; Meu Perfil com questionário e vídeos complementares; e Contato com link para escrever um e-mail pelo Gmail.

## 2. Funcionalidades e arquitetura

- **Navegação**: troca de seções no arquivo `index.html` com JavaScript, atualização de hash na URL, links para `sobre.html` e menu responsivo colapsável via Bootstrap.
- **Questionário (`js/script.js`)**: vetor `perguntas` composto por objetos `{titulo, opcoes}`, nos quais cada opção tem `{texto, perfil}`. Soma os votos em `{remoto, hibrido, presencial}`; em empate, apresenta o híbrido, com ressalva de que o resultado é ilustrativo. Renderiza um vídeo do YouTube correspondente ao perfil; no modo `file://`, oferece capa clicável para evitar bloqueio de incorporação.
- **Gráficos Chart.js**: gráfico Gallup `labels: [Híbrido, Remoto, Presencial]`, valores `[71, 23, 6]` (% de preferência entre trabalhadores norte-americanos da Geração Z com trabalhos compatíveis com remoto). Gráfico Nature `labels: [Controle, Híbrido]`, valores `[7.2, 4.8]` (% de desligamentos no experimento). Ambos são inicializados quando a seção Dados aparece.
- **Alternância claro/escuro**: botão com estado `aria-pressed` e preferência gravada em `localStorage` como `digitalPulseTema` quando disponível.
- **Animações e acessibilidade**: transições, `IntersectionObserver`, `prefers-reduced-motion`, atalhos de teclado, texto alternativo, controles semânticos `details/summary`.

## 3. Estrutura do projeto

```text
index.html
sobre.html
css/
  style.css
js/
  script.js
assets/
  fotos/
    mulhertrabalhandoemcasa.png
    mesa-trabalho.jpg
    mesa-trabalho-melhorada.jpg
    preview-digital-pulse.jpg
AUDITORIA_IA.md
README.md
.gitignore
LICENSE
RELATORIO_REVISAO.md
```

## 4. Tecnologias, versões e compatibilidade

| Tecnologia | Origem | Uso |
|---|---|---|
| HTML5, CSS3, JavaScript vanilla | Navegador | Estrutura semântica, design e lógica |
| Bootstrap 5.3.8 CSS e Bundle JS | jsDelivr CDN | Grid responsivo e menu colapsável |
| Bootstrap Icons 1.11.3 | jsDelivr CDN | Ícones |
| Chart.js 4.5.1 | jsDelivr CDN | Gráficos interativos |
| Google Fonts (Inter, página Sobre) | Google Fonts | Tipografia |
| YouTube Embed | YouTube | Conteúdo externo, disponível conforme permissões do vídeo/navegador |

A aplicação usa recursos do navegador moderno (`IntersectionObserver`, `localStorage`, `details`). As dependências CDN exigem internet; o repositório não hospeda os vídeos do YouTube. O caminho `file://` não substitui o deploy em HTTPS.

## 5. Pesquisa e fontes bibliográficas

1. **Gallup** (Ryan Pendell e Sangeeta Agrawal, 22 jul. 2025). [Fully Remote Work Least Popular With Gen Z](https://www.gallup.com/workplace/692675/fully-remote-work-least-popular-gen-z.aspx). Base dos percentuais 71/23/6 e da estatística de solidão de 27%; reflete amostras dos EUA e não prova causalidade.
2. **Bloom, Han & Liang** (2024). [Hybrid working from home improves retention without damaging performance](https://www.nature.com/articles/s41586-024-07500-2). Nature, 630, 920–925. Experimento de 1.612 empregados e desligamentos de 7,2% versus 4,8%.
3. **World Economic Forum** (2025). [The Future of Jobs Report 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/). Tendências de competências tecnológicas e socioemocionais.
4. **American Psychological Association** (2020). [Newly remote workers](https://www.apa.org/news/apa/2020/newly-remote-workers). Referência à importância do contato e da comunicação no trabalho remoto.

## 6. Colaboração e rastreabilidade (preencher com o histórico verdadeiro)

| Integrante | Atividades relatadas | Commits que comprovam |
|---|---|---|
| Vitorya | Identidade visual, Hero, HOME, questionário, vídeos, refinamentos do site | `[COLOCAR LINKS/HASHES REAIS]` |
| Maria | Organização de seções e colaboração nas partes informativas | `[COLOCAR LINKS/HASHES REAIS E REVISAR DIVISÃO]` |

**Importante:** esta tabela é um ponto de partida baseado no processo relatado; as integrantes devem conferir a divisão real de tarefas. Criar **commits de autoria verdadeira**. Não gerar histórico fictício para simular colaboração.

O uso de assistentes de IA e a auditoria crítica das sugestões estão registrados em [AUDITORIA_IA.md](AUDITORIA_IA.md). Parte da especificação exige implementação manual da estrutura autoral: a dupla deve confirmar e explicar o que escreveu e o que foi copilotado, sem atribuir autoria indevida.

## 7. Execução local e deploy

1. Abra a pasta que contém `index.html` no VS Code.
2. Inicie um servidor local (ex.: Live Preview ou Live Server), e acesse o endereço `http://127.0.0.1:...` no navegador.
3. Para publicar: suba os arquivos mantendo `index.html` **na raiz do repositório**; em **Settings → Pages → Deploy from a branch**, selecione `main` e `/(root)`.
4. Após o deploy, preencha os dois links no topo deste README e **teste os seis itens de menu, os dois gráficos, os três resultados e os vídeos** no URL HTTPS do GitHub Pages.

## 8. Verificação de entrega

Confira a lista de verificações e limitações em [RELATORIO_REVISAO.md](RELATORIO_REVISAO.md). A publicação no GitHub Pages, o histórico de commits e os testes presenciais em navegadores diferentes dependem da dupla.
