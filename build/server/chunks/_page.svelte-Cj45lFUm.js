import { x as ensure_array_like, y as attr_class, z as attr } from './index-Dol0gA6-.js';
import { e as escape_html } from './context-R2425nfV.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uiText = {
      en: {
        eyebrow: "Verbum Quest · Mock Quiz",
        title: "Journey through the Word",
        subtitle: "Prototype a catechetical quiz across Salvation History.",
        score: "Score",
        question: "Question",
        of: "of",
        source: "Source",
        correct: "Correct",
        correctMsg: "You chose wisely.",
        incorrectMsg: "Not quite.",
        restart: "Restart",
        next: "Next",
        finish: "Finish",
        playAgain: "Play again"
      },
      es: {
        eyebrow: "Verbum Quest · Quiz de prueba",
        title: "Peregrina por la Palabra",
        subtitle: "Prototipo de cuestionario catequético sobre la Historia de la Salvación.",
        score: "Puntaje",
        question: "Pregunta",
        of: "de",
        source: "Fuente",
        correct: "Correcta",
        correctMsg: "Elegiste bien.",
        incorrectMsg: "No del todo.",
        restart: "Reiniciar",
        next: "Siguiente",
        finish: "Terminar",
        playAgain: "Jugar de nuevo"
      },
      pt: {
        eyebrow: "Verbum Quest · Quiz de teste",
        title: "Caminho pela Palavra",
        subtitle: "Protótipo catequético sobre a História da Salvação.",
        score: "Pontuação",
        question: "Pergunta",
        of: "de",
        source: "Fonte",
        correct: "Correta",
        correctMsg: "Você escolheu bem.",
        incorrectMsg: "Quase lá.",
        restart: "Reiniciar",
        next: "Próxima",
        finish: "Finalizar",
        playAgain: "Jogar novamente"
      }
    };
    const questions = [
      {
        id: "creation-1",
        stage: { en: "Creation", es: "Creación", pt: "Criação" },
        prompt: {
          en: "In Genesis 1, what is humanity given over creation?",
          es: "En Génesis 1, ¿qué se le confía a la humanidad sobre la creación?",
          pt: "Em Gênesis 1, o que é confiado à humanidade sobre a criação?"
        },
        options: [
          {
            id: "a",
            correct: true,
            text: {
              en: "To rule, steward, and care for it",
              es: "Gobernarla, administrarla y cuidarla",
              pt: "Governar, administrar e cuidar"
            },
            explanation: {
              en: "Genesis 1:26-28 gives humanity dominion and stewardship over creation.",
              es: "Génesis 1:26-28 entrega a la humanidad dominio y mayordomía sobre la creación.",
              pt: "Gênesis 1:26-28 concede ao ser humano domínio e cuidado sobre a criação."
            }
          },
          {
            id: "b",
            correct: false,
            text: {
              en: "Unlimited domination for profit",
              es: "Dominio ilimitado para lucro",
              pt: "Domínio ilimitado para lucro"
            },
            explanation: {
              en: "Scripture frames this as care, not exploitation.",
              es: "La Escritura lo presenta como cuidado, no explotación.",
              pt: "A Escritura apresenta como cuidado, não exploração."
            }
          },
          {
            id: "c",
            correct: false,
            text: {
              en: "No responsibility at all",
              es: "Ninguna responsabilidad",
              pt: "Nenhuma responsabilidade"
            },
            explanation: {
              en: "Humanity is explicitly commissioned to cultivate and keep.",
              es: "La humanidad es enviada a cultivar y guardar.",
              pt: "A humanidade é chamada a cultivar e guardar."
            }
          },
          {
            id: "d",
            correct: false,
            text: {
              en: "Only angels steward creation",
              es: "Solo los ángeles administran la creación",
              pt: "Apenas os anjos cuidam da criação"
            },
            explanation: {
              en: "The command is given to mankind, male and female.",
              es: "El mandato es dado a la humanidad, varón y mujer.",
              pt: "O mandato é dado à humanidade, homem e mulher."
            }
          }
        ],
        source: "Genesis 1:26-28"
      },
      {
        id: "covenant-1",
        stage: { en: "Covenant", es: "Alianza", pt: "Aliança" },
        prompt: {
          en: "What sign sealed the covenant with Noah after the flood?",
          es: "¿Qué signo selló la alianza con Noé después del diluvio?",
          pt: "Qual sinal selou a aliança com Noé após o dilúvio?"
        },
        options: [
          {
            id: "a",
            correct: false,
            text: {
              en: "A burning bush",
              es: "Una zarza ardiente",
              pt: "Uma sarça ardente"
            },
            explanation: {
              en: "That was Moses' call, not Noah's covenant sign.",
              es: "Esa fue la llamada de Moisés, no el signo para Noé.",
              pt: "Foi o chamado de Moisés, não o sinal para Noé."
            }
          },
          {
            id: "b",
            correct: true,
            text: {
              en: "The rainbow in the clouds",
              es: "El arcoíris en las nubes",
              pt: "O arco-íris nas nuvens"
            },
            explanation: {
              en: "Genesis 9:12-17: God sets a bow in the clouds as a sign of His promise.",
              es: "Génesis 9:12-17: Dios pone un arco en las nubes como signo de su promesa.",
              pt: "Gênesis 9:12-17: Deus coloca um arco nas nuvens como sinal da promessa."
            }
          },
          {
            id: "c",
            correct: false,
            text: {
              en: "Tablets of stone",
              es: "Tablas de piedra",
              pt: "Tábuas de pedra"
            },
            explanation: {
              en: "The tablets come later with Moses at Sinai.",
              es: "Las tablas llegan después, con Moisés en el Sinaí.",
              pt: "As tábuas vêm depois, com Moisés no Sinai."
            }
          },
          {
            id: "d",
            correct: false,
            text: {
              en: "A pillar of fire",
              es: "Una columna de fuego",
              pt: "Uma coluna de fogo"
            },
            explanation: {
              en: "Pillar of fire guided Israel in the Exodus.",
              es: "La columna de fuego guió a Israel en el Éxodo.",
              pt: "A coluna de fogo guiou Israel no Êxodo."
            }
          }
        ],
        source: "Genesis 9:12-17"
      },
      {
        id: "church-1",
        stage: { en: "Church", es: "Iglesia", pt: "Igreja" },
        prompt: {
          en: "According to Acts 2, what marked the Church’s birth at Pentecost?",
          es: "Según Hechos 2, ¿qué marcó el nacimiento de la Iglesia en Pentecostés?",
          pt: "Segundo Atos 2, o que marcou o nascimento da Igreja em Pentecostes?"
        },
        options: [
          {
            id: "a",
            correct: false,
            text: {
              en: "The casting of lots for Matthias",
              es: "Echar suertes por Matías",
              pt: "Lançar sortes para Matias"
            },
            explanation: {
              en: "That happened before Pentecost.",
              es: "Eso ocurrió antes de Pentecostés.",
              pt: "Isso ocorreu antes de Pentecostes."
            }
          },
          {
            id: "b",
            correct: true,
            text: {
              en: "Tongues as of fire and the Holy Spirit’s outpouring",
              es: "Lenguas como de fuego y la efusión del Espíritu Santo",
              pt: "Línguas como de fogo e a efusão do Espírito Santo"
            },
            explanation: {
              en: "Acts 2:1-4 describes the Spirit descending with wind and fire.",
              es: "Hechos 2:1-4 describe al Espíritu descendiendo con viento y fuego.",
              pt: "Atos 2:1-4 descreve o Espírito descendo com vento e fogo."
            }
          },
          {
            id: "c",
            correct: false,
            text: {
              en: "Building a stone temple",
              es: "Construir un templo de piedra",
              pt: "Construir um templo de pedra"
            },
            explanation: {
              en: "The early Church met in homes and the temple courts; no new temple was built.",
              es: "La Iglesia primitiva se reunía en casas y en el Templo; no se construyó uno nuevo.",
              pt: "A Igreja primitiva se reunia em casas e no Templo; não foi construído um novo."
            }
          },
          {
            id: "d",
            correct: false,
            text: {
              en: "A council at Jerusalem",
              es: "Un concilio en Jerusalén",
              pt: "Um concílio em Jerusalém"
            },
            explanation: {
              en: "The Jerusalem Council in Acts 15 happened later.",
              es: "El Concilio de Jerusalén en Hechos 15 fue después.",
              pt: "O Concílio de Jerusalém em Atos 15 aconteceu depois."
            }
          }
        ],
        source: "Acts 2:1-4"
      }
    ];
    const languages = [
      { id: "en", label: "EN", name: "English" },
      { id: "es", label: "ES", name: "Español" },
      { id: "pt", label: "PT", name: "Português" }
    ];
    let locale = "en";
    let currentIndex = 0;
    let selected = null;
    let revealed = false;
    let score = 0;
    const currentQuestion = () => questions[currentIndex];
    const t = (key) => uiText[locale][key] ?? key;
    $$renderer2.push(`<main class="page svelte-1uha8ag"><header class="hero svelte-1uha8ag"><div><p class="eyebrow svelte-1uha8ag">${escape_html(t("eyebrow"))}</p> <h1 class="svelte-1uha8ag">${escape_html(t("title"))}</h1> <p class="lede svelte-1uha8ag">${escape_html(t("subtitle"))}</p></div> <div class="hero-controls"><div class="lang-switcher" aria-label="Language selector"><!--[-->`);
    const each_array = ensure_array_like(languages);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let lang = each_array[$$index];
      $$renderer2.push(`<button${attr_class("", void 0, { "active": locale === lang.id })}>${escape_html(lang.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="score svelte-1uha8ag"><div>${escape_html(t("score"))}</div> <strong class="svelte-1uha8ag">${escape_html(score)} / ${escape_html(questions.length)}</strong></div></div></header> <section class="card svelte-1uha8ag"><div class="meta svelte-1uha8ag"><span class="pill svelte-1uha8ag">${escape_html(currentQuestion().stage[locale])}</span> <span class="sub svelte-1uha8ag">${escape_html(t("question"))} ${escape_html(currentIndex + 1)} ${escape_html(t("of"))} ${escape_html(questions.length)}</span></div> <h2 class="svelte-1uha8ag">${escape_html(currentQuestion().prompt[locale])}</h2> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="source svelte-1uha8ag">${escape_html(t("source"))}: ${escape_html(currentQuestion().source)}</p>`);
    }
    $$renderer2.push(`<!--]--> <div class="options svelte-1uha8ag"><!--[-->`);
    const each_array_1 = ensure_array_like(currentQuestion().options);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let option = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class("svelte-1uha8ag", void 0, {
        "selected": selected === option.id,
        "correct": revealed,
        "incorrect": revealed
      })}><span class="bullet svelte-1uha8ag">${escape_html(option.id.toUpperCase())}</span> <span class="text svelte-1uha8ag">${escape_html(option.text[locale])}</span> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="actions svelte-1uha8ag">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="ghost svelte-1uha8ag">${escape_html(t("restart"))}</button> <button class="primary svelte-1uha8ag"${attr("disabled", !revealed, true)}>${escape_html(currentIndex === questions.length - 1 ? t("finish") : t("next"))}</button>`);
    }
    $$renderer2.push(`<!--]--></div></section></main>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Cj45lFUm.js.map
