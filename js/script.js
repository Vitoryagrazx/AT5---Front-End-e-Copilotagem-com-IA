
document.addEventListener("DOMContentLoaded", () => {

    /* DIGITAL PULSE | QUIZ INTERATIVO*/

    const perguntas = [
        {
            titulo: "Onde você prefere trabalhar?",
            opcoes: [
                { texto: "Em casa, com liberdade", perfil: "remoto" },
                { texto: "Alternando casa e escritório", perfil: "hibrido" },
                { texto: "No escritório, com a equipe", perfil: "presencial" }
            ]
        },
        {
            titulo: "Como você prefere colaborar?",
            opcoes: [
                { texto: "Por chamadas e mensagens", perfil: "remoto" },
                { texto: "Misturando encontros e reuniões online", perfil: "hibrido" },
                { texto: "Pessoalmente, no dia a dia", perfil: "presencial" }
            ]
        },
        {
            titulo: "O que você mais valoriza na rotina?",
            opcoes: [
                { texto: "Autonomia e flexibilidade", perfil: "remoto" },
                { texto: "Equilíbrio entre ambientes", perfil: "hibrido" },
                { texto: "Contato direto com colegas", perfil: "presencial" }
            ]
        }
    ];

    const areaPerguntas = document.getElementById("quiz-perguntas");
    const areaResultado = document.getElementById("quiz-resultado");

    // CONTEÚDO PARA CADA PERFIL

    const resultados = {
        remoto: {
            icone: "bi-house-heart",
            titulo: "Seu perfil é remoto!",
            descricao: "Você valoriza autonomia, flexibilidade e liberdade para organizar sua rotina.",
            videoId: "dxa3dBOcugY",
            videoTitulo: "Conheça melhor o trabalho remoto"
        },

        hibrido: {
            icone: "bi-arrow-left-right",
            titulo: "Seu perfil é híbrido!",
            descricao: "Você gosta de equilibrar a liberdade de trabalhar em casa com a convivência no escritório.",
            videoId: "pck6vQhaJvE",
            videoTitulo: "Descubra como funciona o trabalho híbrido"
        },

        presencial: {
            icone: "bi-buildings",
            titulo: "Seu perfil é presencial!",
            descricao: "Você valoriza a colaboração próxima, o contato com colegas e a rotina compartilhada.",
            videoId: "Owh-becXixM",
            videoTitulo: "O lado divertido do trabalho presencial"
        }
    };

    // EXIBIR PERGUNTAS

    function mostrarPerguntas() {
        areaResultado.innerHTML = "";
        
        areaResultado.hidden = true;
        areaPerguntas.hidden = false;
        areaPerguntas.innerHTML = "";

        perguntas.forEach((pergunta, indice) => {

            const bloco = document.createElement("div");
            bloco.className = "quiz-pergunta";

            const titulo = document.createElement("h3");
            titulo.textContent = `${indice + 1}. ${pergunta.titulo}`;
            bloco.appendChild(titulo);

            const opcoes = document.createElement("div");
            opcoes.className = "quiz-opcoes";

            pergunta.opcoes.forEach((opcao) => {

                const label = document.createElement("label");
                label.className = "quiz-opcao";

                const input = document.createElement("input");
                input.type = "radio";
                input.name = `pergunta-${indice}`;
                input.value = opcao.perfil;
                input.addEventListener("change", verificarRespostas);

                const texto = document.createElement("span");
                texto.textContent = opcao.texto;

                label.append(input, texto);
                opcoes.appendChild(label);
            });

            bloco.appendChild(opcoes);
            areaPerguntas.appendChild(bloco);
        });

        const botao = document.createElement("button");
        botao.className = "quiz-botao";
        botao.id = "botao-resultado";
        botao.textContent = "Descobrir meu perfil →";
        botao.disabled = true;

        botao.addEventListener("click", mostrarResultado);
        areaPerguntas.appendChild(botao);
    }

    // CONFERIR SE TODAS AS PERGUNTAS FORAM RESPONDIDAS

    function verificarRespostas() {
        const respondidas = perguntas.every((_, indice) => {
            return areaPerguntas.querySelector(
                `input[name="pergunta-${indice}"]:checked`
            );
        });

        const botao = document.getElementById("botao-resultado");

        if (botao) {
            botao.disabled = !respondidas;
        }
    }

    // CALCULAR E EXIBIR RESULTADO

    function mostrarResultado() {

        const pontos = {
            remoto: 0,
            hibrido: 0,
            presencial: 0
        };

        perguntas.forEach((_, indice) => {

            const resposta = areaPerguntas.querySelector(
                `input[name="pergunta-${indice}"]:checked`
            );

            if (resposta) {
                pontos[resposta.value]++;
            }
        });

        const maiorPontuacao = Math.max(...Object.values(pontos));

        const empatados = Object.keys(pontos).filter(
            perfil => pontos[perfil] === maiorPontuacao
        );

        // EM CASO DE EMPATE, SUGERIR O MODELO HÍBRIDO

        const perfil = empatados.length > 1 ? "hibrido" : empatados[0];

        const resultado = resultados[perfil];

        
    // ADAPTA O VÍDEO À FORMA COMO O SITE FOI ABERTO

    const arquivoLocal = window.location.protocol === "file:";

    const playerVideo = arquivoLocal
        ? `
            <a
                href="https://www.youtube.com/watch?v=${resultado.videoId}"
                target="_blank"
                rel="noopener noreferrer"
                class="quiz-video-link"
            >
                <img
                    class="quiz-video"
                    src="https://img.youtube.com/vi/${resultado.videoId}/hqdefault.jpg"
                    alt="Assistir: ${resultado.videoTitulo}"
                >

                <span>▶ Assistir ao vídeo no YouTube</span>
            </a>
        `
        : `
            <iframe
                class="quiz-video"
                src="https://www.youtube.com/embed/${resultado.videoId}"
                title="${resultado.videoTitulo}"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowfullscreen>
            </iframe>
        `;


        areaPerguntas.hidden = true;
        areaResultado.hidden = false;

        // RESULTADO PERSONALIZADO COM VÍDEO DO YOUTUBE

        areaResultado.innerHTML = `
            <i class="bi ${resultado.icone} quiz-resultado-icone"
               aria-hidden="true"></i>

            <h3>${resultado.titulo}</h3>

            <p>${resultado.descricao}</p>

            <p class="quiz-observacao">
                Resultado ilustrativo baseado nas suas preferências.
            </p>

            <!-- CONTAINER DO VÍDEO -->
            <div class="quiz-video-container">

                <div class="quiz-video-cabecalho">

                    <span class="quiz-video-etiqueta">
                        <i class="bi bi-play-circle"
                           aria-hidden="true"></i>
                        CONTEÚDO PARA VOCÊ
                    </span>

                    <h4>${resultado.videoTitulo}</h4>

                    <p>
                        Explore esse modelo de trabalho.
                        Assista quando quiser!
                    </p>

                </div>

                <!-- PLAYER DO YOUTUBE -->
                ${playerVideo}


                <!-- LINK ALTERNATIVO -->
                <a
                    class="quiz-video-link"
                    href="https://www.youtube.com/watch?v=${resultado.videoId}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Não abriu? Assistir no YouTube ↗
                </a>

            </div>

            <button class="quiz-botao" id="refazer-quiz">
                Refazer teste ↻
            </button>
        `;

        const tituloResultado = areaResultado.querySelector("h3");
        tituloResultado?.setAttribute("tabindex", "-1");
        tituloResultado?.focus({ preventScroll: true });
        document.querySelector(".ferramenta-card")?.scrollIntoView({ behavior: "smooth", block: "start" });

        document.getElementById("refazer-quiz")
            .addEventListener("click", () => {
                mostrarPerguntas();
                document.querySelector(".ferramenta-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
    }

    // INICIAR O QUIZ

    if (areaPerguntas && areaResultado) {
        mostrarPerguntas();
    }


    /*DIGITAL PULSE | NAVEGAÇÃO POR SEÇÕES*/

    const linksInternos = document.querySelectorAll('a[href^="#"]');

    const secoes = [
        "inicio",
        "sobre",
        "dados",
        "explorar",
        "ferramenta",
        "contato"
    ];

    function mostrarSecao(id) {

        // Ao sair da ferramenta, interrompe o vídeo e reinicia o quiz
        if (id !== "ferramenta" && areaResultado && !areaResultado.hidden) {
            mostrarPerguntas();
        }

        if (!secoes.includes(id)) return;

        const secaoDestino = document.getElementById(id);
        if (!secaoDestino) return;

        secoes.forEach((nome) => {

            const secao = document.getElementById(nome);

            if (secao) {
                secao.hidden = nome !== id;
            }
        });

        // INICIAR GRÁFICO APENAS QUANDO DADOS ESTIVER VISÍVEL

        if (id === "dados") {
            requestAnimationFrame(() => {
                inicializarGrafico();
                inicializarGraficoNature();
            });
        }

        window.scrollTo(0, 0);
    }

    linksInternos.forEach((link) => {

        link.addEventListener("click", (evento) => {

            const id = link.getAttribute("href").substring(1);

            if (!secoes.includes(id)) return;
            if (!document.getElementById(id)) return;

            evento.preventDefault();

            mostrarSecao(id);

            history.replaceState(null, "", "#" + id);

            // Fecha o menu colapsável em telas pequenas.
            const menu = document.getElementById("menu-principal");
            if (window.innerWidth < 768 && menu?.classList.contains("show") && window.bootstrap?.Collapse) {
                window.bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
            }
        });
    });

    window.addEventListener("hashchange", () => {
        const destino = window.location.hash.slice(1);
        if (secoes.includes(destino) && document.getElementById(destino)) {
            mostrarSecao(destino);
        }
    });


    /* DIGITAL PULSE | GRÁFICO DE DADOS*/

    let graficoTrabalho = null;
    let graficoNature = null;

    function inicializarGraficoNature() {
        const canvas = document.getElementById("graficoDesligamentos");
        if (!canvas || typeof Chart === "undefined") return;
        if (graficoNature) {
            graficoNature.resize();
            return;
        }
        graficoNature = new Chart(canvas, {
            type: "bar",
            data: {
                labels: ["Controle", "Híbrido"],
                datasets: [{
                    label: "Desligamentos (%)",
                    data: [7.2, 4.8],
                    backgroundColor: ["#ff704c", "#12213d"],
                    borderRadius: 12,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: contexto => contexto.parsed.y.toLocaleString("pt-BR") + "%"
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: { callback: valor => valor + "%" }
                    }
                }
            }
        });
    }

    function inicializarGrafico() {

        const canvas = document.getElementById("graficoTrabalho");

        if (!canvas || typeof Chart === "undefined") return;

        // EVITA CRIAR O MESMO GRÁFICO VÁRIAS VEZES

        if (graficoTrabalho) {
            graficoTrabalho.resize();
            return;
        }

        graficoTrabalho = new Chart(canvas, {
            type: "bar",

            data: {
                labels: ["Híbrido", "Remoto", "Presencial"],

                datasets: [{
                    label: "Preferência da Geração Z (%)",

                    data: [71, 23, 6],

                    backgroundColor: [
                        "#ff704c",
                        "#101f38",
                        "#a6b1c2"
                    ],

                    borderRadius: 8
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,

                        ticks: {
                            callback: (valor) => valor + "%"
                        }
                    }
                },

                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (contexto) =>
                                contexto.parsed.y + "% dos entrevistados"
                        }
                    }
                }
            }
        });
    }


    /*DIGITAL PULSE | ABERTURA INICIAL*/

    const secaoInicial = window.location.hash.substring(1);

    const destinoInicial = secoes.includes(secaoInicial)
        && document.getElementById(secaoInicial)
        ? secaoInicial
        : "inicio";

    mostrarSecao(destinoInicial);

});


// DIGITAL PULSE | ANIMAÇÕES AO ROLAR A HOME

document.addEventListener("DOMContentLoaded", () => {
    const elementos = document.querySelectorAll(
        ".home-editorial-abertura, " +
        ".home-editorial-texto, " +
        ".home-especialista, " +
        ".home-pesquisa, " +
        ".home-editorial-final"
    );

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (movimentoReduzido ||
        !("IntersectionObserver" in window)) {
        return;
    }

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elementos.forEach((elemento) => {
        elemento.classList.add("revelar-home");
        observador.observe(elemento);
    });
});

/* DIGITAL PULSE | TEMA PERSISTENTE*/
document.addEventListener("DOMContentLoaded", () => {
    const botaoTema = document.querySelector(".tema-alternar");
    const raiz = document.documentElement;
    let tema = "light";

    try {
        if (localStorage.getItem("digitalPulseTema") === "dark") tema = "dark";
    } catch (erro) {
        // Navegação privada ou armazenamento bloqueado: o tema continua funcionando.
    }

    function aplicarTema(novoTema) {
        raiz.setAttribute("data-theme", novoTema);
        if (!botaoTema) return;
        const escuro = novoTema === "dark";
        botaoTema.setAttribute("aria-pressed", String(escuro));
        botaoTema.setAttribute("aria-label", escuro ? "Ativar modo claro" : "Ativar modo escuro");
        const icone = botaoTema.querySelector("i");
        if (icone) icone.className = escuro ? "bi bi-sun-fill" : "bi bi-moon-stars";
    }

    aplicarTema(tema);

    botaoTema?.addEventListener("click", () => {
        tema = raiz.getAttribute("data-theme") === "dark" ? "light" : "dark";
        aplicarTema(tema);
        try {
            localStorage.setItem("digitalPulseTema", tema);
        } catch (erro) { /* persistência indisponível neste navegador */ }
    });
});
