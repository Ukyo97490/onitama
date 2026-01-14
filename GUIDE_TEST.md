# 🎮 Guide de Test Rapide - Onitama IA

## 🚀 Test en Local

1. **Ouvrir le jeu** :
   - Double-cliquez sur `index.html`
   - Ou utilisez un serveur local :
     ```bash
     python -m http.server 8000
     # Puis ouvrez http://localhost:8000
     ```

2. **Écran de sélection** :
   - Choisissez votre couleur (Bleu ou Rouge)
   - Sélectionnez la difficulté de l'IA
   - Le jeu démarre automatiquement

3. **Pendant la partie** :
   - Cliquez sur une de vos pièces (王 = maître, 兵 = pion)
   - Cliquez sur une carte de mouvement
   - Les mouvements possibles s'affichent
   - Cliquez sur une case en surbrillance pour vous déplacer
   - L'IA joue automatiquement son tour

## 🧪 Tests à effectuer

### Test 1 : Difficulté Facile
- ✅ Sélectionner Bleu
- ✅ Difficulté : Facile
- ✅ L'IA devrait faire des mouvements aléatoires
- ✅ Vous devriez gagner facilement

### Test 2 : Difficulté Moyenne
- ✅ Sélectionner Rouge (l'IA joue en premier)
- ✅ Difficulté : Moyen
- ✅ L'IA devrait capturer vos pièces quand possible
- ✅ L'IA avance vers votre temple
- ✅ Partie équilibrée

### Test 3 : Difficulté Difficile
- ✅ Sélectionner Bleu
- ✅ Difficulté : Difficile
- ✅ L'IA protège son maître
- ✅ L'IA contrôle le centre
- ✅ L'IA menace votre maître
- ✅ Partie difficile et stratégique

### Test 4 : Conditions de Victoire

**Capture du Maître** :
1. Sélectionner Facile
2. Capturer le maître de l'IA (王)
3. ✅ Message de victoire doit apparaître

**Temple Adverse** :
1. Déplacer votre maître sur le temple adverse (⛩)
   - Temple bleu : case centrale en bas (row 4, col 2)
   - Temple rouge : case centrale en haut (row 0, col 2)
2. ✅ Message de victoire doit apparaître

### Test 5 : Interface

- ✅ Badge "🤖 IA" apparaît sur le bon joueur
- ✅ Indicateur "💭" quand l'IA réfléchit
- ✅ Cases possibles s'illuminent en vert
- ✅ Captures possibles montrent un "×" rouge
- ✅ Animations fluides
- ✅ Responsive sur mobile

## 🐛 Problèmes connus à vérifier

- [ ] L'IA ne bloque pas l'interface humaine
- [ ] Les animations ne ralentissent pas le jeu
- [ ] Les règles sont bien respectées
- [ ] Pas de bug sur les mouvements inversés (rouge)
- [ ] Le bouton "Nouvelle Partie" recharge correctement

## 📱 Test Mobile

1. Ouvrir sur téléphone/tablette
2. ✅ Écran de sélection lisible
3. ✅ Plateau de jeu visible sans scroll horizontal
4. ✅ Cartes empilées verticalement
5. ✅ Boutons tactiles réactifs

## 🎯 Scénarios de Victoire Rapide

### Gagner en 3 coups (contre IA Facile)
1. Commencer en Bleu
2. Avancer le maître avec carte Tigre (si disponible)
3. Continuer vers le temple rouge
4. Atteindre le temple en 3-4 mouvements

### Capturer le Maître
1. Commencer en Rouge
2. L'IA avance souvent son maître
3. Utiliser les cartes diagonales (Dragon, Singe)
4. Capturer quand l'occasion se présente

## ✅ Checklist Finale

Avant de déployer sur GitHub Pages :

- [ ] Toutes les animations fonctionnent
- [ ] L'IA joue correctement aux 3 niveaux
- [ ] Les victoires sont détectées
- [ ] Le bouton "Nouvelle Partie" fonctionne
- [ ] Responsive mobile OK
- [ ] Pas d'erreurs dans la console
- [ ] Les caractères japonais s'affichent
- [ ] Les Google Fonts se chargent

## 🎨 Personnalisation Facile

Pour changer les couleurs de l'IA :

```css
/* Dans index.html, section <style> */
--bamboo-green: #6b8e6b;  /* Couleur du badge IA */
```

Pour ajuster la vitesse de l'IA :

```javascript
// Dans game.js, méthode aiTurn()
const thinkingTime = this.aiDifficulty === 'easy' ? 500 : 
                    this.aiDifficulty === 'medium' ? 800 : 1200;
// Augmenter ces valeurs pour ralentir l'IA
```

## 🆘 Dépannage

**L'IA ne joue pas :**
- Vérifier la console (F12)
- S'assurer que game.js est chargé
- Recharger la page

**Les mouvements ne s'affichent pas :**
- Vérifier que vous avez sélectionné une pièce ET une carte
- Vérifier que c'est votre tour

**Page blanche :**
- Vérifier que les 3 fichiers sont dans le même dossier
- Ouvrir la console pour voir les erreurs

---

**Bon test ! 🎋**
