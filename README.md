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


#### Règles :
Le but du jeu est de découvrir toutes les cases vides sans cliquer sur une mine. Si une mine est découverte, la partie est perdue. Si toutes les cases vides sont découvertes sans avoir révélé de mines, la partie est gagnée.

Le joueur peut utiliser des drapeaux pour marquer les cases où il pense qu'une mine est présente. Si toutes les mines sont marquées, et que toutes les cases vides sont découvertes, la partie est gagnée.


#### Modes de jeu :

- Facile - 9 x 9 + 10 mines
- Moyen - 16 x 16 + 40 mines
- Difficile - 16 x 30 + 99 mines
- Custom

#### Fonctionnalités :
- Effectuer un clique droit pose un drapeau. Un deuxième clique droit l'enlève
- Effectuer un clique gauche révèle la case
  - Si la case cliquée est vide, alors toutes les cases vides autour sont révélées, ainsi que les cases non vides adjacentes
  - Si la case est une mine, alors la partie est perdue. Toutes les mines sont révélées, et les cases contenant un drapeau mal placé sont barrées
- Effectuer un clique milieu révèle toutes les cases autour de la case cliquée si le nombre de drapeaux autour correspond à la valeur de la case cliquée
- Bouton pour réinitialiser la partie
- Timer qui augmente à chaque seconde
- Compteur de mines pas encore identifiés par un drapeau





## J2 - Clicker
Jeu de clic qui dévoile des images et bien d'autres...
Fonctionnalités :

- un bouton qui permet d'augmenter un score et augmenter le nombre de pièces.
- des pièces qui permettent d'acheter des améliorations 
- des améliorations qui augmentent le score par clic
- les clics qui permettent de reveller des images exclusives
- une difficulté qui augmente avec le score, recommence à 0 lorsqu'une image est découverte
- des trophées à débloquer
- seul le clic gauche et la souris sont utilisés


trophées à debloquer : 

- une image "apprenti cliqueur"
- cinq images "cliqueur confirmé"
- dix images "cliqueur expert"
- trouver 5 easters eggs "détective privé ou quoi ?"
- changer la couleur du fond "artiste sous LSD"
- obtenir 1 million de pièces : "contrat de footballeur"
- obtenir 1 milliard de pièces : "Jeff Bezos"
- lorsque score et pièces = 10k clic "Fou furieux" (car il n'a pas dépensé de pièces)




## J3 - Tower defense

Tiles based
La complexité des ennemis augmente

Des ennemis spawn,

6 lignes, 16 col
Game objects -> tower, enemy

Tower
life
damage
range
projectile velocity
projectile rate

Enemy :
life
damage
velocity

Quelques vagues sont prédéfinies, les coordonnées de spawn sont aléatoires mais possèdent un quota d’enemy, 15 ogres , 5 gobelin ….
une fois toutes les vagues passées et la progression a 100%, une vague infinie arrive avec une rapidité de spawn qui augmente selon des paliers de score.


But : Obtenir le meilleur score
Fin : Lorsqu’un monstre touche une maison

Achievement
Tuer 10 Démons
Tuer 1000 skelettes
Dépenser 1000K
Remplir le plateau de tour
Obtenir un score de x
Placer chaque type de tour dans une seule partie

Ajouter des tour de boost (multiplicateur de dégât, de sous etc … ) proportionnel à la distance du point de spawn

Ajout du tour qui fait des tir qui one shot mais tue une autre tour d’un certain type aléatoirement

Ajouter une tour qui permet de tuer les ennemis sur une ligne

Ajout d’un sort de vent
Changer le temps qui se reset à 0 si le temps > temps de tir alors tirer et


Les bâtiment ont des vies différentes

Certaines tuiles peuvent avoir des bonus lorsqu’une tour est posée dessus (pour inciter au placement)

Ajout d’une tour qui permet de tuer toutes les entité mais qui additionne la vie et les dégâts pour les donnés à la dernière entité VISIBLE SUR CANVAS


Ajout d’effet lors de la mort de certaines tour

Ajouter un mob qui spawn lorsqu’il a des rempart, ce mob va venir s’exploser pour les casser.


Ajouter le double canon

Ajout d’un sort qui heal les ennemi d’une ligne et qui rebondi pour faire des dégats au dernier en rebondissant au fond

Tower qui tire une fois toute les 20 seconde, MAIS chaque fois qu’un de ses projectile touche un monstre, la tower tire un autre projectile
Ajouter un monstre capable de renvoyer un projectile
Ajouert un timer
Ajouter un cooldown pour chaque carte

Game over :
Afficher le score, le temps de jeu et un bouton rejouer.
