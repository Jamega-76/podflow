# 🎙️ Podcast Tracker Pro

Une Progressive Web App (PWA) sur-mesure conçue pour le suivi, l'analyse et l'écoute quotidienne d'un large catalogue de flux de podcasts. L'application offre une expérience "native" fluide sur mobile grâce à un design épuré inspiré d'iOS.

## ✨ Fonctionnalités Principales

* 📊 **Tableau de Bord Analytique :** Suivi visuel des publications sur les 7 derniers jours via un graphique en barres dynamique.
* 🧠 **Smart Insight (IA) :** Génération d'une phrase d'analyse automatique comparant la dynamique de publication du jour J avec J-1 et J-2.
* 🍩 **Répartition Intelligente :** Jauge visuelle affichant la proportion des différents formats (Natifs, Intégrales, Chroniques) pour les épisodes comptabilisés.
* 🎧 **Lecteur Audio Intégré :** Un player "Glassmorphism" premium permettant d'écouter les 30 derniers épisodes directement depuis l'application avec file d'attente (auto-play).
* 📅 **Calendrier Historique :** Navigation fluide dans les archives des 7 derniers jours grâce à un carrousel horizontal.
* ⚡ **Performances Optimisées :** Chargement des flux RSS en parallèle (par paquets de 10) pour un démarrage fulgurant, couplé à un système de mise en cache local.
* 📱 **Expérience Native Mobile :** * Geste "Pull-to-refresh" (Tirer pour actualiser) personnalisé.
    * Installation sur l'écran d'accueil (PWA).
    * Mode Sombre et Mode Clair.
* ⚙️ **Tri Automatique des Formats :** L'algorithme détecte automatiquement les formats "Intégrales" (épisodes > 45 min) tout en respectant une liste stricte d'exceptions, et classe le reste en "Chroniques".

## 🛠️ Technologies Utilisées

* **Frontend :** HTML5, CSS3 (Variables CSS, Flexbox, Animations).
* **Logique :** Vanilla JavaScript (ES6+).
* **Réseau :** Fetch API, Promesses (Promise.all), Parseur XML.
* **PWA :** Web App Manifest (`manifest.json`), Service Worker (`sw.js`).
* **Stockage :** LocalStorage (Sauvegarde de la configuration, des préférences utilisateur et mise en cache des données RSS).

## 🚀 Installation & Utilisation

1.  Hébergez les fichiers (`index.html`, `manifest.json`, `sw.js` et les icônes) sur un serveur web sécurisé (HTTPS) comme GitHub Pages.
2.  Ouvrez l'URL depuis un smartphone (Safari sur iOS ou Chrome sur Android).
3.  Sélectionnez **"Ajouter sur l'écran d'accueil"** dans les options du navigateur pour installer l'application PWA.
4.  L'application fonctionnera alors comme une application native, en plein écran.

## 📂 Structure du projet

* `index.html` : L'interface utilisateur, les styles embarqués et la logique métier JavaScript.
* `manifest.json` : Les métadonnées de la PWA (couleurs, icônes, affichage).
* `sw.js` : Le Service Worker gérant la mise en cache pour le mode hors-ligne.
* `icon-192.png` / `icon-512.png` : Les icônes de l'application.