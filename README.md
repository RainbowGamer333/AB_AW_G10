# Analyse des Besoins et Applications Web - Groupe 10
#### Membres
- PATUREAU Romain
- TILLE Logann
- GRUAU Elyan

## Choix des jeux
- Projet Games on Web
- Démineur
- Clicker
- Tower Defense

## Fonctionnalités du site web

### Page d’accueil :
-	Liste des jeux dans le projet. Si le joueur n’est pas connecté, cliquer sur un jeu redirige vers la page de connexion.
     Navbar :
-	Logo et nom de projet qui redirige vers la page d’accueil
-	Barre de recherche de jeux
-	Boutons pour se connecter / déconnecter de son compte
-	Pseudo et photo de profil qui permettent d’accéder à la page de profil s’il est connecté, sinon redirige à la page de connexion.
### Page de connexion :
-	Sections pour remplir ses informations, et bouton pour valider
-	Boutons pour voir et cacher le mot de passe
-	Bouton pour rediriger vers l’inscription
### Page d’inscription :
-	Sections pour remplir ses informations, et bouton pour valider
-	Boutons pour voir et cacher le mot de passe
-	Bouton pour rediriger vers la connexion
### Page de profil :
-	Bouton pour changer la photo de profil aléatoirement
-	Listes des achievements acquis par l’utilisateur
-	Bouton pour changer de mot de passe
-	Bouton pour supprimer son compte
### Pages de jeux :
-	Bouton de redémarrage du jeu
-	Bouton de saut aux règles
-	Bouton de saut aux scores
-	Un mode plein écran
-	Tableau des scores dynamiques adapté à chaque jeu
-	Des achievements qui arrivent sous forme de popup

---

## J1 - Démineur


Romain a proposé de concevoir le jeu Démineur, qui est un jeu qui lui a fait aimer les jeux vidéo lorsqu’il était tout jeune.

### Règles du Jeu :
La grille de jeu contient de nombreuses mines cachées. L’objectif est de découvrir toutes les cases vides sans cliquer sur une mine. Si une mine est découverte, la partie est perdue. Si toutes les cases vides sont découvertes sans avoir révélé de mines, la partie est gagnée.
Sur chaque case découverte est marquée un numéro. Ce numéro représente le nombre de mines autour de la case. Le joueur peut aussi utiliser des drapeaux pour marquer les cases où il pense qu'une mine est présente.

### Fonctionnalités du Jeu :
-	Clique gauche pour découvrir les cases.
-	Clique droite pour placer un drapeau
-	Clique milieu / Double clique gauche pour révéler toutes les cases autour de la case cliquée (que si le nombre correct de drapeau sont placés autour de la case cliquée)
-	Un chronomètre qui commence à la première clique et termine à la victoire ou game over
-	Un compteur de mines qui décrémente / incrémente en fonction du nombre de drapeaux placés sur la grille.
-	Algorithme de génération de mines qui commence à la première clique et qui évite cette case afin de ne pas commencer sur une mine.
-	Effets de sons quand le joueur clique sur une case, découvre une chaine de cases vides, ajoute un drapeau, clique sur une mine, et termine la partie.

Le jeu est principalement terminé. Toutes fonctionnalités réalisées. Le choix de difficultés et de thèmes est fonctionnel.
Dans le futur, j’aimerais implémenter :
-	Plus de thèmes plus élaborés, avec modification de couleurs et de sons.
-	Des algorithmes de génération de mines plus élaborés afin de laisser plus de cases vides autour de la case premièrement cliquée, ce qui facilitera le début de partie.








## J2 - Clicker
Logann présente avec enthousiasme son jeu web bien-aimé : un Clicker. Ce jeu, bien que demandant un certain temps pour être terminé en tant que joueur, offre un amusement constant en révélant des photos de nos camarades de classe et de mystérieux invités à travers des Easter Eggs disséminés tout au long de l'expérience. Il s'adresse ainsi aux joueurs les plus curieux, les incitant à explorer chaque recoin du jeu.

### règles du jeu :
-	 Atteindre le score de 1 100 000 000 (un milliard et cent millions) le plus rapidement possible.
-	Révéler toutes les images cachées derrière les carrés noirs.
-	Utiliser le bouton "Clique plus vite ! " pour augmenter le score et gagner des pièces.
-	Cultiver la curiosité et l'envie de découvrir.
-	Tenter de débloquer tous les trophées de jeu.

### fonctionnalités du jeu :

-	Un bouton permettant d'augmenter le score et de collecter des pièces à chaque pression.
-	Un chronomètre qui démarre au premier clic, marquant ainsi le début de l'aventure.
-	Des boutons bonus apparaissant au fil de la progression du score, ajoutant une dimension stratégique.
-	Des images dévoilées progressivement en fonction de l'évolution du score, offrant ainsi une récompense visuelle.
-	La possibilité d'interagir avec les carrés noirs et les images pour poursuivre l'aventure.
-	Une fin de jeu qui apparait lorsque le score de 1 100 000 000 est atteint avec un message de victoire
-	Les images aléatoires des personnes apparaissent à la fin du jeu en appuyant sur le bouton sur lequel il ne faut pas appuyer
-	Un cheat code qui permet de gagner beaucoup plus rapidement en appuyant sur ‘control + b’
-	Des animations de clics automatiques apparaissent

Maintenant que le jeu est terminé, je peux envisager des améliorations au niveau du code afin de le rendre plus lisible et des améliorations pour équilibrer les bonus et rendre l'expérience de jeu plus fluide. Cette optimisation pourrait permettre aux joueurs d'accéder plus rapidement ou plus lentement aux prochaines améliorations, ajoutant ainsi une dimension stratégique supplémentaire.
En outre, je pourrais introduire de nouvelles fonctionnalités pour rendre le jeu moins répétitif et stimuler davantage les joueurs jusqu'à la fin. Des défis supplémentaires ou des objectifs spéciaux pourraient être intégrés pour maintenir l'intérêt tout au long de la partie.
De plus, des ajustements au niveau des animations pourraient être nécessaires afin d'éviter les ralentissements sur les ordinateurs moins performants, assurant ainsi une expérience de jeu fluide pour tous les utilisateurs, quelle que soit leur configuration matérielle.




## J3 - Tower defense

Elyan quant à lui, propose un Tower Defense au style médiéval afin de combattre les monstres venus détruire notre village. Le but est de garder le plus de maisons en vie, le plus longtemps possible, lorsque toutes les maisons sont détruites (vie du village à 0%), la partie se termine. Le jeu se décompose sous forme de vagues, à partir de la 10e vague, le village doit faire face à une vague infinie. Pour combattre les monstres, il faut placer des tours.

### Règles du Jeu :
-	Difficulté : des monstres de plus en plus puissants et nombreux apparaissent, sur les colonnes ou des maisons sont présentes.
-	Tuer des monstres donne des pièces et augmente le score.
-	À chaque fois qu'un monstre est tué, le score qu'il rapporte est multiplié par le nombre de maisons restantes.
-	Il n’est pas possible de placer une tour sur un autre bâtiment.

### Fonctionnalités du Jeu :
-	Un gameplay intuitif (Drag & Drop)
-	Combat en temps réels entre des tours et des monstres
-	10 tours différentes pour combattre les monstres
-	Des monstres, avec des statistiques differentes
-	Un système de vague fixe, puis une vague infinie à partir de la 10e
-	Un système de points, multiplier par le nombre de maison en vie
## Avancement du jeu
A ce jour, il me semble que le jeu est parfaitement jouable. Néanmoins il reste encore une charge considérable de choses à faire notamment :
-	Rendre le code plus lisible
-	Passer d’un système d’update à un système d’évent pour l’UI
-	Régler les problèmes d’inter-compatibilité entre les navigateurs (EX : Jeu testé sur chrome, comportements différents sur Mozilla)
-	Ajout d’un marqueur d’emplacement pour prévisualisé l’emplacement lors de la construction d’une tour
-	Ajout de texte dit “tooltip” qui affiche les caractéristiques des différents éléments du jeu
-	Afficher la vie des différentes entités (Monstres, Bâtiments)
-	Ajout d’effets sonores
-	Régler la synchronisation lorsque l’utilisateur quitte la fenêtre et revient plus tard.

## J4 - JO Runner 2024 - Game On Web

Notre jeu pour le Concours GAME ON WEB n’a pas encore de nom, mais l’objectif est de faire concourir deux joueurs simultanément sur le même écran et de faire une course. Lors de cette course, des zone “Olympiques” seront sélectionnées aléatoirement dans un pool de jeux et les jeux vont devoir se mettre des bâtons dans les roues. Le premier arrivé a gagné !

#### Quel est le but de ce jeu ?
JO Runner 2024 est un jeu en 1 contre 1. Les deux joueurs doivent jouer sur la même machine, sur le même écran, et surtout sur le même clavier.
#### Mais les joueurs ne risquent-ils pas de se gêner ?
C'est bien là le but ! Les joueurs sont coudes à coudes, se battant pour gagner la course. Nous souhaitons retrouver les anciennes façons de jouer de type arcade, avec les deux joueurs serrés, prêts à en découdre.
#### Comment se déroule une partie ?
Les deux joueurs se placent côte à côte, face au clavier, de manière que chacun ait accès aux touches. Ils peuvent modifier leurs touches dans les paramètres "joueur 1" et "joueur 2" sur la page principale du jeu. Une fois prêts, ils peuvent commencer à jouer.
#### Keymap de base :
[Z] ou [^] pour accélérer (en mode tryhard sur le bouton)
[Q] ou [<] pour aller à gauche
[D] ou [>] pour aller à droite
[S] ou [∨] pour sauter/esquiver
#### Comment se déroule le jeu ?
Le jeu est de type runner, sur une carte qui défile face à nous. Pour que notre personnage avance, il faut "spammer" la touche d'accélération. Plus on clique vite, plus on avance vite. Le joueur peut sauter, aller à droite et à gauche afin d'esquiver des obstacles et récupérer des bonus. Le premier à atteindre la ligne d'arrivée gagne la partie !
Comme les Jeux Olympiques se déroulent en partie à Paris, et que les rues ne sont pas encore propres, vous êtes de corvée pour nettoyer les crottes de chiens et les déchets sur votre passage. Une grande poubelle vous attend à l'arrivée et une médaille du meilleur nettoyeur est en jeu. Que le meilleur nettoyeur de rue gagne !
#### Et c'est tout ?
Bien sûr que non ! Nous avons prévu des petits défis durant la course. Tous les défis sont des mini-jeux intégrés à la course.
#### Comment les défis se lancent-ils ?
C'est simple, les jeux se lancent 15 secondes après le début du jeu. Dès qu'une zone de défi est terminée, il faut attendre 10 secondes avant qu'un nouveau défi apparaisse.
#### Quels seront les défis durant les courses ?
Ils apparaîtront de façon aléatoire. Les défis seront choisis dans un pool de 8 mini-jeux.
##### Football : 
le sol se transforme en terrain de foot, un gros ballon rebondit rapidement sur les murs. Ses rebonds sont aléatoires. Le joueur doit esquiver le ballon sous peine de ralentir.
##### Haltérophilie : 
les gars dans les salles de sport laissent toujours leurs poids au sol. Évitez-les pour ne pas trébucher et perdre de la vitesse.
##### Natation : 
le sol se transforme en pataugeoire, il est donc plus compliqué d'avancer. Il faut appuyer plus vite sur la touche d'avancement.
##### Tir à l'arc : 
les athlètes inconscients vous prennent pour une cible. Esquivez les flèches qui viennent vers vous. Si vous êtes touché, vous ralentissez à cause de la douleur.
##### Trampoline : 
la hauteur du saut est multipliée par deux, mais attention, la hauteur des obstacles a aussi augmenté.
##### Équestre : 
des chevaux sont passés par là, laissant du crottin partout. Si vous marchez dedans, vous risquez de glisser.
##### Gymnastique rythmique : 
suivez le rythme des couleurs au sol. Un pas de côté, et vous perdez de la vitesse car vos mouvements ne sont pas contrôlés.
##### Beach Volley : 
vous marchez dans le sable, ce qui vous ralentit. Faites attention aux smashs et aux crabes qui ne vous veulent pas que du bien.

#### Où en sommes-nous du développement du jeu ?
Nous nous sommes rendu compte que notre idée de jeu était très complexe et longue dans sa réalisation.
Actuellement, nous avons un environnement de jeu qui fonctionne :
-	Une caméra qui suit un objet forme carré qui sera notre personnage
-	Le personnage peut bouger latéralement de droite à gauche et est bloqué par les limites de la rue où se trouve le joueur
-	Le personnage peut sauter et modulé la hauteur du saut en fonction de la force consacré sur le bouton de saut
-	Le personnage peut sprinter, en fonction de la vitesse de l’utilisation de la touche qui fait avancer le joueur, et la vitesse peut être modulée
-	Un jeu de lumière est fonctionnel (ombres qui bougent)
-	Un visuel de rue qui défile tout avec des maisons en 2D longent les rues.
