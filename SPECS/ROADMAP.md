# DON'T OVERFLOW! — Roadmap

## 1. État actuel — POC

La première version du projet correspond à un POC fonctionnel centré sur la validation de la mécanique principale.

La boucle actuellement implémentée est :

**observer → maintenir → remplir → relâcher → obtenir un résultat → recommencer**

Le POC permet actuellement de :

- commencer une tentative à 0 % ;
- maintenir `HOLD TO FILL` pour augmenter progressivement le niveau ;
- visualiser simultanément le niveau d'eau et son pourcentage ;
- arrêter le remplissage en relâchant ;
- comparer le niveau atteint à une zone cible ;
- obtenir `TOO LOW`, `PERFECT` ou `OVERFLOW` ;
- conserver le résultat après la tentative ;
- utiliser `TRY AGAIN` pour recommencer sans recharger la page.

Cette version constitue la base technique et ludique à partir de laquelle les prochaines itérations pourront être construites.

## 2. Enseignements du POC

Le POC a permis de confirmer que la mécanique de maintien et de relâchement fonctionne et peut constituer le cœur du jeu.

Il a également montré l'intérêt de confronter rapidement les spécifications au prototype réel.

La zone cible avait initialement été définie entre 90 % et 100 %. Lors de l'observation du prototype, cette position s'est révélée trop proche du bord supérieur du récipient et moins intéressante visuellement.

Elle a donc été repositionnée entre 70 % et 80 %.

Cette modification constitue un premier ajustement de game design directement issu de l'observation du prototype.

Le POC montre également qu'une interaction extrêmement simple peut servir de base à une difficulté beaucoup plus riche si plusieurs contraintes sont progressivement introduites.

## 3. Phase suivante — Validation utilisateur

Avant d'augmenter fortement la complexité, la mécanique actuelle devra être confrontée à plusieurs utilisateurs.

Les tests devront notamment vérifier :

- si l'objectif est compris sans explication ;
- si `HOLD TO FILL` est immédiatement compris ;
- si la vitesse actuelle d'environ 30 % par seconde est adaptée ;
- si la zone 70–80 % offre une difficulté intéressante ;
- si les résultats sont suffisamment clairs ;
- si le joueur comprend comment recommencer ;
- si l'interaction donne envie de refaire une tentative.

Ces observations permettront de distinguer les problèmes techniques des problèmes d'expérience utilisateur et d'ajuster la base avant le développement du MVP.

## 4. MVP — Objectif général

La prochaine étape consiste à transformer le POC en un jeu de précision plus complet sans remplacer la mécanique centrale déjà validée.

Le MVP conservera une interaction principale volontairement simple :

**maintenir → observer → relâcher**

La profondeur supplémentaire proviendra de quatre dimensions :

1. **Précision** — atteindre un niveau ou un volume demandé.
2. **Perception** — interpréter correctement le récipient et le niveau d'eau.
3. **Gestion des ressources** — contrôler l'eau disponible et les tentatives.
4. **Gestion de la pression** — agir avec des contraintes de temps ou de difficulté.

Le MVP devra ainsi enrichir les décisions du joueur sans compliquer inutilement les commandes.

## 5. MVP — Objectifs de précision

Le premier enrichissement du gameplay consistera à faire varier les objectifs.

Le jeu pourra proposer :

- différentes zones cibles ;
- des zones de plus en plus étroites ;
- des objectifs exprimés sous forme de pourcentage précis ;
- une tolérance variable autour d'une valeur cible ;
- une précision demandée de plus en plus importante.

Un niveau pourra par exemple demander :

> Atteindre 77 % avec une tolérance de ±2 %.

Cette évolution transforme progressivement le jeu d'un simple exercice de timing en un véritable challenge de précision.

## 6. MVP — Tentatives et gestion des ressources

Le MVP pourra limiter le nombre de tentatives disponibles.

Un niveau pourra par exemple proposer seulement trois essais pour atteindre son objectif.

Une réserve d'eau limitée pourra également être introduite.

L'eau utilisée deviendra alors une ressource à gérer : une tentative ratée pourra réduire la quantité disponible pour les essais ou niveaux suivants.

Cette mécanique ajoute une conséquence aux erreurs et introduit une dimension stratégique sans modifier l'interaction fondamentale.

## 7. MVP — Temps, vitesse et débit

Certains niveaux pourront introduire une pression temporelle ou modifier le comportement du remplissage.

Les paramètres envisageables comprennent :

- un chronomètre ;
- un temps maximal pour terminer une tentative ;
- différentes vitesses de remplissage ;
- une accélération progressive ;
- un débit variable ;
- une légère inertie après le relâchement.

L'inertie pourra par exemple simuler quelques gouttes supplémentaires après que le joueur a cessé de maintenir la commande.

Le joueur devra alors anticiper l'arrêt plutôt que simplement réagir au niveau affiché.

## 8. MVP — Formes de récipients et trompe-l'œil

Une évolution majeure du MVP sera l'introduction de différents récipients.

Les formes pourront comprendre :

- récipients droits ;
- verres larges ou étroits ;
- formes coniques ;
- bouteilles ;
- fioles ;
- récipients asymétriques ;
- formes volontairement trompeuses.

Cette variation ne sera pas uniquement esthétique.

Dans le POC, le pourcentage est directement représenté par la hauteur de l'eau. Dans une évolution du MVP, le volume réel pourra être distingué de la hauteur visible.

Ainsi, selon la géométrie du récipient, 50 % du volume total ne correspondra pas nécessairement à 50 % de sa hauteur.

La forme du récipient deviendra alors une mécanique de gameplay à part entière.

Le joueur devra progressivement apprendre à estimer un volume plutôt qu'à simplement suivre une barre verticale.

## 9. MVP — Disparition progressive des aides

Les premiers niveaux pourront conserver les aides actuelles afin de faciliter l'apprentissage.

Celles-ci pourront ensuite être progressivement réduites :

- pourcentage visible pendant toute la tentative ;
- pourcentage masqué pendant le remplissage ;
- cible visible au départ puis masquée ;
- objectif affiché pendant quelques secondes seulement ;
- niveau exact révélé uniquement après le relâchement.

Cette progression permettra d'introduire des dimensions de mémorisation, d'estimation et de perception.

## 10. MVP — Score et performance

Le système de résultat pourra évoluer au-delà des trois catégories actuelles.

Le jeu pourra mesurer l'écart entre le résultat obtenu et l'objectif demandé.

Par exemple, pour une cible de 77 %, un résultat à 76,8 % pourra être récompensé davantage qu'un résultat à 74 %.

Le système pourra prendre en compte :

- la précision ;
- le temps utilisé ;
- la quantité d'eau consommée ;
- le nombre de tentatives ;
- les réussites consécutives.

Ces données pourront ensuite produire :

- un score ;
- une évaluation par étoiles ;
- un meilleur résultat personnel ;
- des multiplicateurs ou séries de réussites.

## 11. MVP — Feedback visuel et sonore

L'interface du POC restera volontairement simple jusqu'à validation de la mécanique.

Le MVP pourra ensuite améliorer fortement le feedback :

- animation du liquide ;
- réaction visuelle du récipient ;
- effet de débordement ;
- changement visuel selon le résultat ;
- particules ;
- transitions ;
- micro-animations ;
- affichage de l'écart exact avec l'objectif ;
- animation du score ;
- effets sonores liés au remplissage et aux résultats.

Le feedback devra rendre l'action plus satisfaisante sans nuire à la lisibilité.

## 12. Progression de la difficulté

La difficulté ne reposera pas sur une seule variable.

Elle sera construite par combinaison progressive des mécaniques.

### Exemple de progression

**Niveaux 1–5 — Apprentissage**

- récipient simple ;
- cible large ;
- pourcentage visible ;
- tentatives libres.

**Niveaux 6–10 — Précision**

- objectifs variables ;
- zones plus étroites ;
- pourcentages précis.

**Niveaux 11–15 — Ressources**

- nombre de tentatives limité ;
- réserve d'eau limitée.

**Niveaux 16–20 — Perception**

- différentes formes de récipients ;
- relation plus complexe entre hauteur et volume.

**Niveaux 21–25 — Mémoire**

- disparition de certaines aides ;
- cible à mémoriser ;
- pourcentage masqué pendant le remplissage.

**Niveaux 26–30 — Pression**

- chronomètre ;
- vitesse plus élevée ;
- variation du débit ;
- inertie après le relâchement.

**Niveaux avancés — Combinaisons**

Les contraintes précédentes pourront être combinées.

Un niveau avancé pourrait par exemple demander :

- d'atteindre 77 % ;
- avec trois tentatives ;
- avec une réserve d'eau limitée ;
- dans un récipient trompeur ;
- avec huit secondes disponibles ;
- sans pourcentage visible pendant le remplissage.

La difficulté émergera ainsi de la combinaison de règles simples.

## 13. Évolution technique

La structure actuelle est volontairement simple et adaptée au POC.

Lorsque le nombre de fonctionnalités augmentera, le projet pourra être progressivement séparé en plusieurs composants et responsabilités.

Par exemple :

- `GameContainer` ;
- `WaterLevel` ;
- `ResultFeedback` ;
- `GameControls` ;
- `Timer` ;
- `WaterReserve` ;
- `LevelConfig` ;
- logique de score ;
- logique de progression ;
- gestion des différentes géométries de récipients.

Les paramètres propres aux niveaux pourront progressivement être déplacés vers une configuration dédiée afin d'éviter de dupliquer la logique du jeu.

Cette évolution technique sera introduite lorsque la complexité fonctionnelle la justifiera.

## 14. Évolutions après le MVP

Une fois le MVP validé, plusieurs extensions pourront être étudiées :

- mode infini avec difficulté croissante ;
- challenges de précision ;
- séries de récipients avec une seule réserve d'eau ;
- records personnels ;
- challenges spéciaux ;
- davantage de familles de récipients ;
- événements et obstacles supplémentaires ;
- système de progression plus développé.

Ces fonctionnalités ne constituent pas des exigences du MVP initial.

Elles représentent des possibilités d'évolution si la boucle enrichie est validée lors de futurs tests utilisateurs.

## 15. Ordre de développement envisagé

L'ordre de développement proposé est :

### Priorité 1 — Validation utilisateur

Tester le POC actuel et identifier les problèmes de compréhension, de rythme ou d'interaction.

### Priorité 2 — Stabilisation de la mécanique

Ajuster si nécessaire :

- la vitesse ;
- la cible ;
- le feedback ;
- le rythme entre les tentatives ;
- l'expérience sur différentes tailles d'écran.

### Priorité 3 — Premier MVP jouable

Introduire :

- plusieurs niveaux ;
- objectifs variables ;
- objectifs de précision ;
- tentatives limitées ;
- réserve d'eau ;
- système de score simple ;
- interface nettoyée sans informations de debug.

### Priorité 4 — Perception et difficulté avancée

Introduire progressivement :

- nouvelles formes de récipients ;
- relation entre volume réel et hauteur visible ;
- disparition des aides ;
- timer ;
- variations du débit.

### Priorité 5 — Polish

Ajouter :

- animations ;
- effets de débordement ;
- feedback plus riche ;
- sons ;
- transitions ;
- amélioration générale de l'identité visuelle.

### Priorité 6 — Validation du MVP

Tester les nouvelles mécaniques avec des utilisateurs et déterminer lesquelles améliorent réellement l'expérience avant de poursuivre les extensions.

## 16. Vision

Le POC démontre la faisabilité de la mécanique centrale de DON'T OVERFLOW!.

Le MVP doit démontrer qu'une interaction extrêmement simple peut produire une expérience progressivement plus riche grâce à la précision, à la perception, à la gestion des ressources et à la pression.

Le principe retenu reste :

**valider d'abord → enrichir ensuite**

Chaque nouvelle fonctionnalité devra soit répondre à un problème identifié lors de l'observation du prototype ou de futurs tests utilisateurs, soit augmenter directement la profondeur, la lisibilité ou la satisfaction de la boucle principale.