# 📖 Guide - Règles Intégrées

## Nouvelle Fonctionnalité : Modal des Règles

Le jeu Onitama dispose maintenant d'un **système de règles intégré** accessible à tout moment pour aider les novices à apprendre le jeu.

## 🎯 Comment Accéder aux Règles

### Méthode 1 : Bouton Principal
- En haut de la page, cliquez sur **"📖 Règles du Jeu"**
- Disponible sur l'écran de sélection ET pendant la partie

### Méthode 2 : Lien de l'Écran de Sélection
- Sur l'écran de sélection, cliquez sur **"Consultez les règles"**
- Parfait pour les nouveaux joueurs avant de commencer

### Méthode 3 : Raccourci Clavier
- Appuyez sur **Échap** pour fermer le modal

## 📋 Contenu du Modal

### 1. Objectif du Jeu
- 👑 **Capture du Maître** : Expliquer comment capturer le maître adverse
- ⛩ **Temple Sacré** : Expliquer la victoire par temple

**Visuel** : Deux cartes côte à côte avec icônes et descriptions

### 2. Les Pièces
- 王 **Maître** : Importance et rôle
- 兵 **Pions (x4)** : Utilité et stratégie

**Visuel** : Grille avec symboles colorés (rouge pour maître, bleu pour pions)

### 3. Comment Jouer
Guide en 4 étapes numérotées :
1. Sélectionner une pièce
2. Choisir une carte
3. Déplacer
4. Échanger la carte

**Visuel** : Numéros circulaires verts avec descriptions détaillées

### 4. Les Cartes de Mouvement
- Explication des symboles (◉ = départ, ● = mouvement)
- Légende visuelle claire
- Note importante sur l'échange de cartes

**Visuel** : Légende avec symboles et explications

### 5. Conseils Stratégiques
Liste de 5 conseils tactiques :
- Protéger le maître
- Contrôler le centre
- Anticiper
- Double objectif
- Sacrifices tactiques

**Visuel** : Liste avec bordure verte et mise en emphase

### 6. Niveaux d'IA
Description des 3 difficultés :
- 🟢 **Facile** : Pour apprendre
- 🟡 **Moyen** : Stratégie de base
- 🔴 **Difficile** : Défie les experts

**Visuel** : Trois cartes colorées correspondant aux niveaux

## 🎨 Design du Modal

### Esthétique
- **Couleurs** : Palette zen cohérente (crème, brun terre, vert bambou)
- **Typographie** : Cormorant Garamond pour les titres, Noto Sans pour le corps
- **Bordures** : Brun terre de 3px pour le cadre principal
- **Fond** : Overlay semi-transparent avec effet de flou

### Animations
- **Ouverture** : Animation `popIn` avec effet de rebond
- **Fermeture** : Animation `fadeOut` douce
- **Hover** : Cartes se soulèvent légèrement

### Responsive
- **Desktop** : Modal centré, largeur max 800px
- **Tablet** : Colonnes adaptées en une seule colonne
- **Mobile** : Padding réduit, taille de police ajustée

## 💻 Implémentation Technique

### HTML
```html
<!-- Bouton dans le header -->
<button class="rules-btn" id="rules-btn">📖 Règles du Jeu</button>

<!-- Modal complet avec overlay -->
<div class="rules-modal" id="rules-modal">
    <div class="rules-overlay"></div>
    <div class="rules-content">
        <!-- Contenu des règles -->
    </div>
</div>
```

### JavaScript
```javascript
// Initialisation du modal
function initRulesModal() {
    // Gestion des événements d'ouverture/fermeture
    // Support de la touche Escape
    // Empêche le scroll du body quand ouvert
}
```

### CSS
- **Overlay** : `backdrop-filter: blur(5px)` pour effet moderne
- **Scrollbar** : Personnalisée pour correspondre au thème
- **Transitions** : Toutes les animations en 0.3s ease

## 🔧 Personnalisation

### Modifier le Contenu
Éditez directement le HTML dans `index.html` :
```html
<div class="rules-section">
    <h3>Votre Section</h3>
    <p>Votre contenu...</p>
</div>
```

### Changer les Couleurs
Dans le CSS, modifiez les variables :
```css
--bamboo-green: #6b8e6b;  /* Couleur des accents */
--earth-brown: #8b6f47;   /* Couleur des titres */
```

### Ajouter des Sections
Copiez une section existante et modifiez le contenu :
```html
<div class="rules-section">
    <h3>🎯 Nouvelle Section</h3>
    <p>Contenu de votre section...</p>
</div>
```

## 📱 Expérience Mobile

### Optimisations
- **Scroll** : Scroll vertical fluide avec scrollbar personnalisée
- **Touch** : Zones de clic agrandies pour les boutons
- **Taille** : Police adaptée pour la lisibilité
- **Layout** : Grilles qui deviennent une colonne

### Test Mobile
1. Ouvrir sur smartphone
2. Cliquer sur "📖 Règles du Jeu"
3. Vérifier que le scroll fonctionne
4. Vérifier que tous les éléments sont lisibles
5. Fermer avec le bouton X

## 🎓 Pour les Novices

### Parcours Recommandé
1. **Avant de jouer** :
   - Lire "Objectif du Jeu"
   - Comprendre "Les Pièces"
   - Lire "Comment Jouer"

2. **Premier jeu** :
   - Choisir difficulté **Facile**
   - Garder les règles ouvertes dans un autre onglet
   - Se référer aux "Cartes de Mouvement"

3. **Amélioration** :
   - Lire "Conseils Stratégiques"
   - Passer à difficulté **Moyen**
   - Expérimenter les tactiques

## 🌟 Avantages

### Pour les Novices
- ✅ Apprentissage autonome sans documentation externe
- ✅ Référence rapide pendant le jeu
- ✅ Exemples visuels clairs
- ✅ Conseils stratégiques intégrés

### Pour les Joueurs Expérimentés
- ✅ Rappel rapide des règles
- ✅ Partage facile (lien direct)
- ✅ Référence pour enseigner

### Pour le Développement
- ✅ Aucune dépendance externe
- ✅ Facile à mettre à jour
- ✅ SEO-friendly (contenu indexable)
- ✅ Accessible (navigation clavier)

## 🔄 Améliorations Futures

Idées pour enrichir le modal :
- [ ] Version imprimable des règles
- [ ] Mode tutoriel interactif
- [ ] Animations explicatives des mouvements
- [ ] Quiz pour tester la compréhension
- [ ] Vidéo de démonstration intégrée
- [ ] Traductions multilingues
- [ ] Raccourcis clavier (? pour ouvrir)
- [ ] Historique des règles consultées

## ✅ Checklist de Test

Avant de déployer :
- [ ] Modal s'ouvre en cliquant sur le bouton
- [ ] Modal s'ouvre depuis l'écran de sélection
- [ ] Modal se ferme avec le X
- [ ] Modal se ferme avec Échap
- [ ] Modal se ferme en cliquant sur l'overlay
- [ ] Scroll fonctionne dans le contenu
- [ ] Le body ne scroll pas quand le modal est ouvert
- [ ] Responsive sur mobile
- [ ] Toutes les sections sont lisibles
- [ ] Les couleurs correspondent au thème
- [ ] Les animations sont fluides
- [ ] Pas d'erreur dans la console

---

**Version** : 1.3
**Date** : 2026-01-14
**Statut** : ✅ Règles intégrées et fonctionnelles
