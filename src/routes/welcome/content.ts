import type { Locale } from "$lib/types";

export const welcomeText: Record<Locale, Record<string, string>> = {
    en: {
        eyebrow: "The Good News!",
        title: "Welcome to Verbum Quest",
        bodyOne:
            "We crafted this path with care—take your time, explore, and let each question guide you gently forward. We hope you enjoy learning as much as we enjoyed building it for you.",
        bodyTwo:
            "When you're ready, step into the main experience. Your progress and choices are saved as you go.",
        start: "Start your journey!",
        showAlways: "Always show this welcome page",
        languageLabel: "Choose language",
        languagePrompt: "Pick your preferred language",
    },
    es: {
        eyebrow: "La Buena Nueva",
        title: "Bienvenido a Verbum Quest",
        bodyOne:
            "Hemos creado este camino con cuidado—tómate tu tiempo, explora y deja que cada pregunta te guíe suavemente hacia adelante. Esperamos que disfrutes aprender tanto como nosotros disfrutamos crearlo para ti.",
        bodyTwo:
            "Cuando estés listo, entra en la experiencia principal. Tu progreso y tus decisiones se guardan a medida que avanzas.",
        start: "¡Comienza tu viaje!",
        showAlways: "Mostrar siempre esta página de bienvenida",
        languageLabel: "Elegir idioma",
        languagePrompt: "Elige tu idioma preferido",
    },
    pt: {
        eyebrow: "A Boa Nova!",
        title: "Bem-vindo ao Verbum Quest",
        bodyOne:
            "Criamos este caminho com cuidado—vá com calma, explore e deixe que cada pergunta o guie suavemente adiante. Esperamos que você aproveite o aprendizado tanto quanto nós gostamos de criar isso para você.",
        bodyTwo:
            "Quando estiver pronto, entre na experiência principal. Seu progresso é salvo à medida que você avança.",
        start: "Comece sua jornada!",
        showAlways: "Sempre mostrar esta página de boas-vindas",
        languageLabel: "Escolher idioma",
        languagePrompt: "Escolha o seu idioma preferido",
    },
    sv: {
        eyebrow: "De goda nyheterna!",
        title: "Välkommen till Verbum Quest",
        bodyOne:
            "Vi skapade denna väg med omsorg—ta din tid, utforska och låt varje fråga varsamt leda dig framåt. Vi hoppas att du tycker om att lära dig lika mycket som vi tyckte om att skapa det här för dig.",
        bodyTwo:
            "När du är redo, kliv in i huvudupplevelsen. Dina framsteg och dina val kommer att kännas hemma här.",
        start: "Börja din resa!",
        showAlways: "Visa alltid den här välkomstsidan",
        languageLabel: "Välj språk",
        languagePrompt: "Välj ditt språk",
    },
};
