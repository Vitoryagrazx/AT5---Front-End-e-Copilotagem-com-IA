# AUDITORIA_IA | Digital Pulse

**Logbook de copilotagem: registro de trabalho para revisão da dupla.** Os exemplos abaixo documentam situações concretas observadas durante as conversas de desenvolvimento e trechos de código relacionados. **Não representem uma revisão humana já realizada nem um histórico de commits**: Vitorya e Maria devem validar o prompt completo, confirmar os trechos exatos das respostas originalmente recebidas, explicar com suas próprias palavras as alterações e associar commits reais antes da entrega.

## Iteração 1 — Vídeo continua tocando após refazer quiz

### Prompt original identificado na conversa

> "ajustes que precisamos fazer, quando eu clico no botão de reiniciar o teste, mas antes aberto no video, ele fica falando, mesmo eu já atualizando o o teste."

- **Ferramenta**: ChatGPT (modelo específico não registrado no histórico recuperado; confirmar com a dupla).
- **Contexto técnico**: JavaScript vanilla; `mostrarPerguntas()`, `mostrarResultado()` e vídeo YouTube por `iframe`; resultado criado por `innerHTML`.

### Resposta inicial / trecho de código existente antes da correção

```js
function mostrarPerguntas() {
    areaResultado.hidden = true;
    areaPerguntas.hidden = false;
    areaPerguntas.innerHTML = "";
    // ... reconstrução das perguntas
}
```

### Diagnóstico técnico observado

Ocultar um contêiner que contém um `iframe` **não interrompe necessariamente a reprodução** do player. O áudio pode continuar após a tela do quiz voltar às perguntas.

### Intervenção e código final

```js
function mostrarPerguntas() {
    areaResultado.innerHTML = ""; // remove o iframe e interrompe a reprodução
    areaResultado.hidden = true;
    areaPerguntas.hidden = false;
    areaPerguntas.innerHTML = "";
    // ...
}
```

**Aprendizado para relatar pela dupla:** diferenciar visibilidade (`hidden`) de remoção de nós do DOM; verificar o comportamento de players embutidos antes de aceitar uma solução.

## Iteração 2 — Erro 153 na incorporação do YouTube

### Prompt original identificado na conversa

> "cara o video não está funcionando"

- **Ferramenta**: ChatGPT (confirmar versão/modelo).
- **Anexos/contexto**: captura do player exibindo **Erro 153** quando a página era aberta pelo endereço local `file://`; vídeos incorporados por URL `/embed/ID`.

### Resposta original / base que estava sendo testada

```html
<iframe class="quiz-video"
        src="https://www.youtube.com/embed/${resultado.videoId}"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
```

### Diagnóstico técnico observado

Abrir a página por `file://` pode não fornecer a origem HTTP exigida pelo player YouTube, ocasionando Erro 153. Não se resolve trocando os pixels, os estilos do iframe ou por CSS.

### Refatoração copilotada, presente no arquivo final

```js
const arquivoLocal = window.location.protocol === "file:";
const playerVideo = arquivoLocal
    ? `<a href="https://www.youtube.com/watch?v=${resultado.videoId}">Assistir no YouTube</a>`
    : `<iframe src="https://www.youtube.com/embed/${resultado.videoId}" ...></iframe>`;
```

**Aprendizado para relatar pela dupla:** diferenças entre `file://`, HTTP local e HTTPS publicado; disponibilidade de mídia externa depende de políticas de incorporação e da conexão do usuário. Testar os três perfis após publicar no Pages.

## Iteração 3 — Seção Contato invisível, apenas rodapé exibido

### Prompt original identificado na conversa

> "acho que bugou, vou mandar meus codigos: index.html"

- **Ferramenta**: ChatGPT (confirmar versão/modelo).
- **Contexto**: sistema de navegação que percorre os IDs `inicio`, `sobre`, `dados`, `explorar`, `ferramenta`, `contato` e define o atributo `hidden` de cada seção.

### Estrutura problemática produzida na integração

```html
<section id="explorar" hidden>
    <section id="contato" hidden>
        <!-- Conteúdo do contato -->
    </section>
</section>
```

### Diagnóstico técnico observado

`contato` estava **aninhado dentro de** `explorar`. Ao mostrar Contato, o JavaScript escondia Explorar e, por consequência, seu descendente Contato. Como o rodapé era irmão externo, ele permanecia visível.

### Refatoração integrativa

```html
<section id="explorar" hidden>
    <!-- Conteúdo de Explorar -->
</section>
<section id="contato" hidden>
    <!-- Conteúdo de Contato -->
</section>
```

**Aprendizado para relatar pela dupla:** entender a árvore DOM e hierarquia de seções antes de modificar o estado de visibilidade; usar ferramentas do navegador para investigar elementos ocultos.

## Checklist de autenticidade do logbook

- [ ] Confirmar **modelo/ferramenta exata** utilizada em cada iteração.
- [ ] Confrontar as **respostas brutas originais da IA** com o histórico e colar trechos literais completos quando necessário.
- [ ] Confirmar que os prompts acima são os **prompts completos** e acrescentar anexos/código enviados com eles.
- [ ] Adicionar a análise **pessoal** de Vitorya e Maria e links aos commits que materializam as correções.
- [ ] Não declarar como manual uma correção que não foi feita manualmente pelas integrantes.
