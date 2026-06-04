/* ==================================================================
   STRUTTURA MODULARE: AGGIUNGI O MODIFICA I TUOI PROGETTI QUI SOTTO
   ==================================================================
*/
const progetti = [{
        titolo: "[[ E-Commerce Mockup ]]",
        descrizione: "[[ Un esempio di negozio online moderno sviluppato con layout a griglia, carrello interattivo e animazioni fluide. ]]",
        url: "https://cavol00.github.io/PortFolio_Dario_D-Alessandro/",
        tecnologie: ["HTML5", "CSS Grid", "JavaScript"]
    },
    {
        titolo: "[[ Dashboard di Analisi ]]",
        descrizione: "[[ Pannello di controllo web responsive con grafici dinamici, modalità scura nativa e gestione dei dati in tempo reale. ]]",
        url: "https://cavol00.github.io/picchio_rosso/",
        tecnologie: ["React", "Tailwind", "Chart.js"]
    },
    {
        titolo: "[[ Applicazione Meteo ]]",
        descrizione: "[[ Web app che consuma API meteorologiche esterne per mostrare le previsioni del tempo in base alla geolocalizzazione. ]]",
        url: "[[ https://tuo-username.github.io/nome-progetto-3/ ]]",
        tecnologie: ["JavaScript", "Fetch API", "CSS3"]
    }
];

/* --- LOGICA DI RENDERING DINAMICO --- */
const grid = document.getElementById('portfolio-grid');

function renderPortfolio() {
    if (!grid) return;
    grid.innerHTML = "";

    progetti.forEach(progetto => {
        const tagHTML = progetto.tecnologie.map(tech => `<span class="tag">${tech}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="browser-mockup">
                <div class="browser-dots">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                </div>
            </div>
            <div class="preview-container">
                <iframe src="${progetto.url}" title="Anteprima di ${progetto.titolo}"></iframe>
            </div>
            <div class="project-info">
                <h3>${progetto.titolo}</h3>
                <div class="project-tags">${tagHTML}</div>
                <p>${progetto.descrizione}</p>
                <a href="${progetto.url}" target="_blank" class="btn">Esplora Sito Live</a>
            </div>
        `;

        grid.appendChild(card);
    });
}

/* --- INTERSECTION OBSERVER PER ANIMAZIONE CARDS --- */
function initScrollAnimations() {
    const cards = document.querySelectorAll('.project-card');

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appeared');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}

/* --- FUNZIONE FUNZIONALITÀ: COPIA NUMERO AL TOCCO --- */
function initClickToCopy() {
    const phoneContainer = document.getElementById('phone-number');

    if (phoneContainer) {
        phoneContainer.addEventListener('click', () => {
            // Estrae il testo dentro l'elemento, rimuove l'emoji e pulisce le parentesi quadre se presenti
            let rawText = phoneContainer.innerText;
            let cleanNumber = rawText.replace('📱', '')
                .replace('[[', '')
                .replace(']]', '')
                .trim();

            // API di sistema per copiare negli appunti
            navigator.clipboard.writeText(cleanNumber).then(() => {
                // Salviamo il contenuto vecchio per ripristinarlo
                const originalHTML = phoneContainer.innerHTML;

                // Cambiamo temporaneamente la grafica dando feedback positivo
                phoneContainer.innerHTML = "✅ Copiato!";
                phoneContainer.classList.add('copied');

                // Dopo 2 secondi reimposta il numero originale
                setTimeout(() => {
                    phoneContainer.innerHTML = originalHTML;
                    phoneContainer.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error("Impossibile copiare il testo: ", err);
            });
        });
    }
}

/* --- AVVIO DELLE FUNZIONI --- */
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    initScrollAnimations();
    initClickToCopy(); // Inizializza il listener per il copia-in-appunti
});