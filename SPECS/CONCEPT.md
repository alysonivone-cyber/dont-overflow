# DON'T OVERFLOW! — Concept

## 1. Intention

DON'T OVERFLOW! est un jeu de précision basé sur une interaction volontairement simple : maintenir une commande pour remplir un récipient, puis la relâcher au bon moment afin d'arrêter le niveau d'eau dans une zone cible.

Le concept repose sur une mécanique immédiatement compréhensible, mais dont la difficulté provient du timing, de la précision et du contrôle du joueur.

## 2. Promesse joueur

> Je maintiens pour remplir, je relâche pour arrêter, et je dois viser juste sans dépasser la zone cible.

L'objectif est que cette règle puisse être comprise directement par l'interaction et par l'interface, sans tutoriel complexe.

## 3. Boucle de jeu principale

La boucle principale est volontairement courte :

1. Observer le récipient et la zone cible.
2. Maintenir `HOLD TO FILL`.
3. Observer le niveau d'eau augmenter.
4. Relâcher le bouton au moment choisi.
5. Recevoir immédiatement un résultat.
6. Recommencer une nouvelle tentative.

Cette boucle constitue le cœur de l'expérience et doit rester fonctionnelle indépendamment des fonctionnalités qui pourront être ajoutées ultérieurement.

## 4. Résultats possibles

Une tentative peut produire trois résultats :

- `TOO LOW` : le joueur s'arrête avant la zone cible.
- `PERFECT` : le joueur s'arrête dans la zone cible.
- `OVERFLOW` : le joueur dépasse la zone cible.

Après l'évaluation, le joueur peut lancer une nouvelle tentative avec `TRY AGAIN`.

## 5. Objectif du POC

Le POC ne cherche pas à produire immédiatement un jeu complet.

Son objectif est de vérifier la faisabilité et l'intérêt de la mécanique centrale :

**observer → maintenir → relâcher → obtenir un résultat → recommencer**

Le prototype doit permettre de vérifier que :

- le maintien et le relâchement constituent une interaction suffisamment claire ;
- la montée progressive du niveau est lisible ;
- une zone cible peut créer un objectif de précision ;
- le résultat de la tentative est immédiatement compréhensible ;
- le joueur peut recommencer sans recharger l'application.

## 6. Périmètre du POC

### Inclus dans le POC

- un récipient ;
- un niveau d'eau dynamique ;
- une zone cible ;
- une interaction maintenir / relâcher ;
- un indicateur de niveau ;
- les résultats `TOO LOW`, `PERFECT` et `OVERFLOW` ;
- la possibilité de recommencer.

### Hors périmètre du POC

Les systèmes de progression, de score, de ressources, de temps, de difficulté avancée et de variation des récipients sont volontairement exclus du POC.

Ils sont réservés au MVP afin que cette première version reste centrée sur la validation de la mécanique fondamentale.

## 7. Vision du MVP

Le POC reste volontairement minimaliste : son objectif est de valider la boucle fondamentale :

**maintenir → remplir → relâcher → obtenir un résultat**

Le MVP a pour objectif de transformer cette mécanique simple en un véritable jeu de précision, de perception, de gestion des ressources et de gestion de la pression.

### 7.1 Progression et objectifs

Les évolutions envisagées comprennent notamment :

- plusieurs niveaux avec une difficulté progressive ;
- des zones cibles différentes selon les niveaux ;
- des objectifs de précision demandant d'atteindre un pourcentage spécifique, par exemple `77 %` ;
- une tolérance autour de la cible qui diminue progressivement ;
- un nombre limité de tentatives ;
- différents objectifs secondaires selon les niveaux ;
- un système de score basé sur la précision ;
- des bonus ou multiplicateurs pour les réussites consécutives ;
- un système d'étoiles ou d'évaluation des performances ;
- la sauvegarde des meilleurs scores et performances.

Un niveau pourra par exemple demander au joueur d'atteindre `77 %` avec seulement trois tentatives.

### 7.2 Gestion des ressources

Le MVP pourra introduire une quantité d'eau limitée.

L'eau utilisée lors d'une tentative deviendra alors une ressource à gérer et pourra être conservée entre plusieurs niveaux ou plusieurs récipients.

Le joueur devra ainsi trouver un équilibre entre précision, prise de risque et économie de la ressource disponible.

Cette mécanique permet d'ajouter une conséquence aux erreurs : recommencer une tentative ne sera plus nécessairement gratuit.

### 7.3 Gestion du temps et du débit

Certains niveaux pourront ajouter une pression temporelle ou modifier le comportement du remplissage :

- chronomètre ;
- temps maximal pour effectuer une tentative ;
- différentes vitesses de remplissage ;
- accélération progressive du débit ;
- variation du débit au cours d'une tentative ;
- légère inertie après le relâchement, simulant quelques gouttes supplémentaires.

Ces paramètres permettront d'augmenter la difficulté sans modifier l'interaction principale.

### 7.4 Récipients et perception du volume

Le MVP introduira différents types et différentes formes de récipients :

- récipients droits ;
- récipients larges ou étroits ;
- formes coniques ;
- bouteilles ;
- fioles ;
- récipients asymétriques ;
- formes volontairement trompeuses.

Ces variations ne devront pas être uniquement graphiques.

Dans le POC, le niveau d'eau est directement représenté par un pourcentage de hauteur. Une évolution importante du MVP consistera à distinguer le **volume réel** de la **hauteur visuelle de l'eau**.

La géométrie du récipient pourra alors influencer la perception du joueur : deux récipients contenant le même pourcentage de leur volume total pourront présenter des hauteurs d'eau visuellement différentes.

Les formes de récipients deviendront ainsi une mécanique de gameplay à part entière et pourront créer un effet de trompe-l'œil.

### 7.5 Disparition progressive des aides

La difficulté pourra également évoluer en réduisant progressivement les informations données au joueur :

- pourcentage visible en permanence dans les premiers niveaux ;
- pourcentage masqué pendant le remplissage dans des niveaux plus avancés ;
- disparition de la zone cible au début de la tentative ;
- cible affichée pendant quelques secondes puis masquée ;
- mémorisation d'un pourcentage précis avant le remplissage ;
- résultat exact révélé uniquement après le relâchement.

Le jeu pourra ainsi évoluer progressivement d'un exercice de timing vers un exercice de perception et de mémorisation.

### 7.6 Obstacles et événements

Des événements pourront ponctuellement modifier les conditions d'une tentative :

- variation temporaire du débit ;
- fuite réduisant la quantité d'eau disponible ;
- mouvement du récipient ;
- disparition temporaire d'une information visuelle ;
- changement de vitesse ;
- contraintes spécifiques propres à certains niveaux.

Ces événements devront rester lisibles et ne pas supprimer le sentiment de contrôle du joueur.

### 7.7 Feedback et satisfaction du joueur

Le MVP pourra enrichir fortement le feedback donné après chaque action :

- animations de réussite ;
- animation spécifique en cas d'overflow ;
- effets visuels ou particules ;
- effets sonores ;
- feedback différent selon la précision obtenue ;
- affichage de l'écart exact avec l'objectif ;
- compteur de score animé ;
- récompense visuelle lors d'une tentative particulièrement précise.

L'objectif est de rendre une interaction très simple satisfaisante à répéter.

### 7.8 Combinaison progressive des mécaniques

La difficulté ne reposera pas uniquement sur l'augmentation de la vitesse de remplissage.

Elle résultera progressivement de la combinaison de plusieurs contraintes.

Un niveau avancé pourrait par exemple demander au joueur :

- d'atteindre exactement `77 %` ;
- avec seulement trois tentatives ;
- avec une quantité d'eau limitée ;
- dans un récipient dont la forme rend l'estimation du volume difficile ;
- avec un temps maximal ;
- et avec certaines aides visuelles masquées.

La complexité du jeu provient ainsi de la combinaison progressive de règles simples plutôt que de la multiplication des commandes.

### 7.9 Modes de jeu envisageables

À plus long terme, le concept pourra également être décliné sous plusieurs formes :

- mode progression avec niveaux successifs ;
- mode infini avec difficulté croissante ;
- challenges de précision ;
- séries de récipients à compléter avec une seule réserve d'eau ;
- défis basés sur le meilleur score ;
- challenges spéciaux combinant plusieurs contraintes.

Ces modes restent hors du périmètre immédiat du MVP et constituent des pistes d'évolution ultérieures.

### 7.10 Les quatre dimensions du MVP

Le MVP cherchera ainsi à faire évoluer DON'T OVERFLOW! d'un POC de validation mécanique vers un jeu de précision plus complet reposant sur quatre dimensions principales :

1. **Précision** — arrêter le remplissage au niveau demandé.
2. **Perception** — interpréter correctement la forme du récipient et le niveau d'eau.
3. **Gestion des ressources** — contrôler l'eau disponible et le nombre de tentatives.
4. **Gestion de la pression** — agir malgré le temps, la vitesse ou la disparition de certaines aides.

Le principe reste volontairement accessible : une seule interaction principale, **maintenir puis relâcher**.

La profondeur du jeu provient ensuite des contraintes, des formes, des objectifs et de leur combinaison progressive.

## 8. Principe de conception

Le POC privilégie la validation de la mécanique avant l'enrichissement graphique ou fonctionnel.

L'interface reste donc volontairement simple : chaque élément visible doit participer directement à la compréhension ou à l'évaluation de la boucle principale.

Le MVP conservera cette simplicité d'interaction tout en enrichissant progressivement les décisions demandées au joueur.

Le principe de développement reste donc :

**valider d'abord → enrichir ensuite**

Les nouvelles fonctionnalités devront renforcer la boucle centrale plutôt que la remplacer.