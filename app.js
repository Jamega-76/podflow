document.addEventListener('DOMContentLoaded', () => {
    // 1. GESTION DE LA NAVIGATION ENTRE LES ONGLETS
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const targetViewId = 'view-' + item.getAttribute('data-view');
            views.forEach(view => {
                view.classList.remove('active');
                if (view.id === targetViewId) {
                    view.classList.add('active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    });

    // 2. LECTURE DU FICHIER CSV ET GÉNÉRATION DES INTERFACES
    // Remplacez 'flux_podcasts_europe1.xlsx - Podcasts.csv' par le bon chemin si nécessaire.
    fetch('flux_podcasts_europe1.xlsx - Podcasts.csv')
        .then(response => {
            if (!response.ok) throw new Error("Fichier introuvable");
            return response.text();
        })
        .then(csvText => {
            // Découpage du CSV (on sépare par saut de ligne)
            const rows = csvText.split('\n').map(row => row.split(','));
            
            // On ignore la première ligne (les en-têtes) et on nettoie les guillemets
            const podcasts = rows.slice(1)
                .filter(row => row.length > 1) // On ignore les lignes vides
                .map((row, index) => {
                    return {
                        id: index + 1,
                        title: row[0] ? row[0].replace(/"/g, '').trim() : "Titre inconnu",
                        rss: row[1] ? row[1].replace(/"/g, '').trim() : "#"
                    };
                });

            document.getElementById('podcasts-count').textContent = `${podcasts.length} flux`;
            
            // On génère l'affichage
            genererTableauFlux(podcasts);
            genererListePodcasts(podcasts);
        })
        .catch(error => {
            console.error("Erreur de chargement du CSV :", error);
            document.getElementById('monitoring-list').innerHTML = `
                <div style="text-align:center; color: var(--error); padding: 20px;">
                    Impossible de charger le fichier CSV.<br>
                    (Assurez-vous de lancer le projet sur un serveur local type LiveServer).
                </div>`;
        });
});

// FONCTION : Génère le tableau dans l'onglet "Flux RSS"
function genererTableauFlux(podcasts) {
    const tbody = document.getElementById('flux-table-body');
    tbody.innerHTML = '';

    podcasts.forEach(podcast => {
        // Logique métier : si le titre contient certains mots clés ou si on est en fin de liste, on peut le passer en hors-comptage
        const isHorsComptage = podcast.title.toLowerCase().includes("hors-comptage"); 
        
        const tr = document.createElement('tr');
        if (isHorsComptage) tr.classList.add('row-muted');

        tr.innerHTML = `
            <td class="text-muted text-center">${podcast.id}</td>
            <td class="font-bold">${podcast.title}</td>
            <td>
                <a href="${podcast.rss}" target="_blank" class="rss-link ${isHorsComptage ? 'disabled' : ''}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
                    ${podcast.rss.substring(0, 45)}...
                </a>
            </td>
            <td class="text-center">
                <span class="badge ${isHorsComptage ? 'badge-muted' : 'badge-success'}">
                    ${isHorsComptage ? 'Hors-comptage' : 'Comptabilisé'}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// FONCTION : Génère la liste dans l'onglet "Podcasts" (avec VIGNETTES et COMPTEURS)
function genererListePodcasts(podcasts) {
    const list = document.getElementById('monitoring-list');
    list.innerHTML = '';
    let globalCount = 0;

    podcasts.forEach(podcast => {
        // --- SIMULATION DES DONNÉES RSS ---
        // Dans la vraie vie, ces données viendraient du traitement du fichier XML du flux RSS.
        const rand = Math.random();
        let dotClass = 'dot-gray';
        let badgeHtml = '<span class="monitor-badge badge-none">-</span>';
        let episodeName = "Ancien épisode ou pas de publication aujourd'hui";
        
        // 50% de chance d'avoir publié aujourd'hui (Pastille Vverte)
        if (rand > 0.5) {
            dotClass = 'dot-green';
            const count = Math.floor(Math.random() * 3) + 1; // 1 à 3 épisodes
            globalCount += count;
            badgeHtml = `<span class="monitor-badge badge-active">+${count}</span>`;
            episodeName = `L'édito du ${new Date().toLocaleDateString('fr-FR')}`; // Nom fictif
        } 
        // 10% de chance d'avoir une erreur RSS (Pastille Rouge)
        else if (rand < 0.1) {
            dotClass = 'dot-red';
            badgeHtml = `<span class="monitor-badge badge-error">ERR</span>`;
            episodeName = "Erreur de lecture du flux RSS";
        }

        // On génère une vignette basée sur le titre du podcast
        const thumbUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(podcast.title)}&background=1e1e1e&color=f97316&size=100`;

        const row = document.createElement('div');
        row.className = 'monitor-row';
        row.innerHTML = `
            <img src="${thumbUrl}" class="monitor-thumb" alt="Vignette">
            <div class="monitor-info">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="monitor-dot ${dotClass}"></div>
                    <span class="monitor-name">${podcast.title}</span>
                </div>
                <span class="monitor-episode">${episodeName}</span>
            </div>
            ${badgeHtml}
        `;
        list.appendChild(row);
    });

    // Mise à jour de "Ginette"
    document.getElementById('global-today-count').textContent = globalCount;
}