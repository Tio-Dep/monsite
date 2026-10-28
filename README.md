# Page académique de Tioma Deparpe

Site statique (HTML, CSS, JS, sans outil de compilation) prévu pour GitHub Pages.

```
index.html          Accueil : identité, thèse, encadrants, coordonnées
recherche.html      Thèmes et activités de recherche
enseignement.html   Enseignements en cours et passés
publications.html   Mémoires (PDF), articles, autres documents
assets/css/style.css   Tout le style (couleurs dans :root, en haut du fichier)
assets/js/main.js      Menu mobile, filtres, copie du mail, animations
assets/img/            Favicon (et photo éventuelle)
documents/             PDF des mémoires
```

## Voir le site en local

```sh
cd page_tioma
python3 -m http.server 8000
```
Puis ouvrir http://localhost:8000.

## Mettre en ligne avec GitHub Pages

1. Créer un dépôt sur GitHub :
   - nommé `<identifiant>.github.io` pour une adresse `https://<identifiant>.github.io/` ;
   - ou avec n'importe quel nom, pour une adresse `https://<identifiant>.github.io/<nom-du-depot>/`.
2. Dans ce dossier :
   ```sh
   git init
   git add .
   git commit -m "Première version du site"
   git branch -M main
   git remote add origin https://github.com/<identifiant>/<nom-du-depot>.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Build and deployment**, Source : *Deploy from a branch*, branche `main`, dossier `/ (root)`. Le site est en ligne après une ou deux minutes.

## Compléter le contenu

Cherchez `À COMPLÉTER` dans les fichiers HTML : ces commentaires marquent les infos à renseigner (titres et années des mémoires, détails des cours, activités).

- **Photo** : placer `assets/img/photo.jpg`, puis dans `index.html` remplacer `TD` dans `<div class="avatar">` par `<img src="assets/img/photo.jpg" alt="Tioma Deparpe">`.
- **Mémoires** : déposer les PDF dans `documents/` (voir `documents/LISEZMOI.md`).
- **Nouvel article** : dans `publications.html`, copier un bloc `<article class="card pub" data-type="articles">` et remplacer le badge « À venir » par un bouton PDF ou un lien vers arXiv / HAL.
- **Couleurs** : variables `--accent`, `--accent-2`, etc. en haut de `style.css`.
