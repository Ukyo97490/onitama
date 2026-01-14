# 鬼魂 Onitama - Jeu de Stratégie Zen

Un jeu de stratégie abstrait inspiré des arts martiaux, avec une esthétique zen japonaise épurée.

![Onitama Game](https://img.shields.io/badge/version-1.0-green) ![HTML5](https://img.shields.io/badge/HTML5-orange) ![CSS3](https://img.shields.io/badge/CSS3-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-yellow)

## 🎮 Caractéristiques

- **Mode IA intégré** - Affrontez une intelligence artificielle avec 3 niveaux de difficulté
- **Interface zen minimaliste** avec esthétique japonaise
- **Choix du joueur** - Sélectionnez votre couleur (Bleu ou Rouge)
- **IA stratégique** avec 3 niveaux :
  - **Facile** : Mouvements aléatoires, idéal pour débuter
  - **Moyen** : Priorise les captures et positions stratégiques
  - **Difficile** : Analyse avancée avec contrôle du centre et protection du maître
- **Prévisualisation des déplacements** en temps réel
- **16 cartes uniques** avec mouvements variés
- **Animations fluides** inspirées du mouvement de l'eau
- **Indicateur visuel** quand l'IA réfléchit (💭)
- **Responsive design** pour mobile et desktop
- **Pur HTML/CSS/JavaScript** - aucun framework requis

## 📋 Règles du jeu

### Objectif
Gagner la partie en accomplissant l'un de ces deux objectifs :
1. **Capturer le maître adverse** (王)
2. **Déplacer votre maître sur le temple adverse** (⛩)

### Déroulement
- Chaque joueur possède 2 cartes de mouvement
- À votre tour, sélectionnez une pièce et une carte
- Les mouvements possibles s'affichent sur le plateau
- Après avoir joué, échangez votre carte avec la carte suivante
- Le tour passe à l'adversaire

### Pièces
- **王 (Maître)** : La pièce la plus importante
- **兵 (Pions)** : 4 pièces de soutien

## 🤖 Mode IA

### Sélection du joueur
Au début de chaque partie :
1. Choisissez votre couleur (Bleu ou Rouge)
2. Sélectionnez le niveau de difficulté de l'IA
3. Le joueur Bleu commence toujours

### Niveaux de difficulté

**🟢 Facile - Débutant**
- Mouvements aléatoires
- Idéal pour apprendre les règles
- Parfait pour les nouveaux joueurs

**🟡 Moyen - Intermédiaire**
- Priorise les captures
- Avance vers les objectifs
- Joue de manière cohérente
- Recommandé pour la plupart des joueurs

**🔴 Difficile - Expert**
- Stratégie avancée
- Contrôle du centre du plateau
- Protège son maître
- Menace le maître adverse
- Analyse la mobilité et les positions
- Défie même les joueurs expérimentés

### Indicateurs visuels
- **💭** : L'IA est en train de réfléchir
- **🤖 IA** : Badge indiquant le joueur contrôlé par l'IA
- Les mouvements de l'IA sont animés pour que vous puissiez suivre sa stratégie

## 🚀 Déploiement sur GitHub Pages

### Méthode 1 : Via l'interface GitHub

1. Créez un nouveau dépôt sur GitHub
2. Uploadez ces fichiers :
   - `onitama.html` (renommez-le en `index.html`)
   - `game.js`
   - `cards.json`
3. Allez dans **Settings** > **Pages**
4. Sous **Source**, sélectionnez la branche `main` et le dossier `/ (root)`
5. Cliquez sur **Save**
6. Votre jeu sera accessible à : `https://votre-username.github.io/nom-du-repo/`

### Méthode 2 : Via la ligne de commande

```bash
# Clonez ou créez votre dépôt
git init
git add .
git commit -m "Initial commit: Onitama game"

# Ajoutez votre dépôt distant
git remote add origin https://github.com/votre-username/nom-du-repo.git

# Poussez vers GitHub
git branch -M main
git push -u origin main

# Activez GitHub Pages dans les paramètres du dépôt
```

### ⚠️ Important : Renommer le fichier

**Avant de déployer**, renommez `onitama.html` en `index.html` pour que GitHub Pages le reconnaisse comme page d'accueil.

## 📁 Structure des fichiers

```
votre-repo/
│
├── index.html          # Interface du jeu (renommer onitama.html)
├── game.js             # Logique du jeu
├── cards.json          # Données des cartes
└── README.md           # Ce fichier
```

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies en CSS via des variables dans `:root` :
```css
--ink-black: #1a1a1a;
--paper-cream: #f5f1e8;
--bamboo-green: #6b8e6b;
--earth-brown: #8b6f47;
--stone-gray: #a8a39d;
```

### Cartes
Modifiez `cards.json` pour ajouter ou personnaliser les cartes. Chaque carte contient :
- `name` : Nom de la carte
- `moves` : Tableau de mouvements (x, y)
- `stamp` : Caractère kanji décoratif
- `description` : Description du mouvement

## 🎯 Utilisation locale

Pour tester localement :

1. Ouvrez simplement `onitama.html` dans votre navigateur
   - Ou utilisez un serveur local :
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Puis ouvrez http://localhost:8000/onitama.html
   ```

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Animations, gradients, backdrop-filter
- **JavaScript Vanilla** : Logique du jeu en POO
- **Google Fonts** : Cormorant Garamond & Noto Sans

## 📱 Compatibilité

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile (iOS Safari, Chrome Mobile)

## 🎓 Crédits

- **Design original** : Shimpei Sato
- **Implémentation** : Version web avec esthétique zen
- **Fonts** : Google Fonts (Cormorant Garamond, Noto Sans)

## 📜 Licence

Ce projet est à usage éducatif. Onitama est une marque déposée d'Arcane Wonders.

## 🐛 Problèmes connus

Si les caractères japonais ne s'affichent pas correctement, vérifiez que :
- Le fichier est encodé en UTF-8
- Les Google Fonts se chargent correctement
- Vous utilisez un navigateur moderne

## 💡 Améliorations futures

- [x] Mode IA avec 3 niveaux de difficulté
- [ ] Mode multijoueur en ligne
- [ ] Sauvegarde de parties
- [ ] Historique des coups avec retour en arrière
- [ ] Mode tournoi
- [ ] Statistiques et classement
- [ ] Thèmes alternatifs (nuit, printemps, automne)
- [ ] Sons et effets sonores zen
- [ ] Tutoriel interactif
- [ ] Analyse de partie avec suggestions

---

**Profitez de votre partie d'Onitama ! 🎋**
