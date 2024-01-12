# Analyse des Besoins et Applications Web - Groupe 10
#### Membres
- PATUREAU Romain
- TILLE Logann
- GRUAU Elyan

## Choix des jeux
- Projet Games on Web
- Démineur
- Clicker

---

## J1 - Démineur
Jeu sur plateau
Modes de jeu :
- Facile - 9 x 9 + 10 mines
- Moyen - 16 x 16 + 40 mines
- Difficile - 16 x 30 + 99 mines
- Custom

Fonctionnalités :
- Bouton pour réinitialiser la partie
- Timer augmentant
- Compteur de mines restantes
- Clique gauche pour révéler une case
- Révéler automatiquement tous les 0s autour de la case
  - Continue à révéler les cases jusqu’aux nombres adjacents aux 0s
  - Si clique une mine
    - Révèle toutes les mines
    - Case cliquée est surligné en rouge
    - Met une croix sur les drapeaux ne contenant pas de mines
- Clique droit pour poser un drapeau
- Clique droit+gauche pour révéler toutes les cases autour d’une case.
  - Révèle les mines aussi mais pas les drapeaux
