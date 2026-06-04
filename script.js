/* ==================================================================
   ARRAY DEI PROGETTI INTEGRATO CON COPERTINE E CODICE
   ==================================================================
*/
const progetti = [{
        titolo: "Picchio Rosso",
        descrizione: "Interfaccia web dinamica e curata, ottimizzata per una navigazione fluida e responsive su tutti i dispositivi.",
        url: "https://cavol00.github.io/picchio_rosso/",
        immagineLavoro: "progetto1.jpg",
        immagineCodice: "codice1.jpg",
        tecnologie: ["HTML5", "CSS3", "JavaScript"]
    },
    {
        titolo: "Applicazione Meteo",
        descrizione: "Web app collegata ad API esterne che fornisce dati e previsioni meteo in tempo reale basate sulla posizione dell'utente.",
        url: "https://cavol00.github.io/nome-del-tuo-meteo/",
        immagineLavoro: "progetto2.jpg",
        immagineCodice: "codice2.jpg",
        tecnologie: ["JavaScript", "Fetch API", "CSS3"]
    }
];

const grid = document.getElementById('portfolio-grid');

function renderPortfolio() {
    if (!grid) return;
    grid.innerHTML = "";

    progetti.forEach(progetto => {
        const tagHTML = progetto.tecnologie.map(tech => `<span class="p5-tag">${tech}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'p5-project-card trigger-anim';
        card.innerHTML = `
            <div class="p5-image-wrapper">
                <img src="${progetto.immagineLavoro}" alt="Screenshot Lavoro" class="p5-img-site" onerror="this.style.background='#222'">
                <img src="${progetto.immagineCodice}" alt="Screenshot Codice" class="p5-img-code" onerror="this.style.background='#333'">
            </div>
            <div class="p5-project-info">
                <h3>${progetto.titolo}</h3>
                <div class="p5-tags">${tagHTML}</div>
                <p>${progetto.descrizione}</p>
                <a href="${progetto.url}" target="_blank" class="p5-btn">VISITA IL SITO ></a>
            </div>
        `;

        grid.appendChild(card);
    });
}

/* INTERSECTION OBSERVER AD ALTA VELOCITÀ CINETICA */
function initScrollAnimations() {
    const animElements = document.querySelectorAll('.trigger-anim');

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('appeared');
                }, index * 60);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));
}

/* INTERFACCIA DI COPIA UNIVERSALE (TELEFONO ED EMAIL) */
function setupClickToCopy(elementId, emojiToDrop) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        targetElement.addEventListener('click', () => {
            let rawText = targetElement.innerText;
            // Rimuove l'emoji specifica inviata come parametro per avere la stringa testuale pulita
            let cleanData = rawText.replace(emojiToDrop, '').trim();

            navigator.clipboard.writeText(cleanData).then(() => {
                const originalHTML = targetElement.innerHTML;

                // Transizione feedback grafico
                targetElement.innerHTML = "✅ COPIATO!";
                targetElement.style.color = "var(--p5-black)";
                targetElement.style.backgroundColor = "var(--p5-white)";

                setTimeout(() => {
                    targetElement.innerHTML = originalHTML;
                    targetElement.style.color = "";
                    targetElement.style.backgroundColor = "";
                }, 1800);
            }).catch(err => console.error("Errore copia appunti: ", err));
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    initScrollAnimations();

    // Inizializza i due motori di copia indipendenti passandogli l'emoji da scartare
    setupClickToCopy('phone-number', '📱');
    setupClickToCopy('email-address', '📧');
});