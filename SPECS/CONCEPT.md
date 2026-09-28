# DON'T OVERFLOW! — Concept

## 1. Intention

DON'T OVERFLOW! est un jeu de précision basé sur une interaction volontairement simple : maintenir une commande pour remplir un récipient, puis la relâcher au bon moment afin d'arrêter le niveau d'eau dans une zone cible.

Le concept repose sur une mécanique immédiatement compréhensible, mais dont la difficulté provient du timing et du contrôle du joueur.

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

## 6. Périmètre

### Inclus dans le POC

- un récipient ;
- un niveau d'eau dynamique ;
- une zone cible ;
- une interaction maintenir / relâcher ;
- un indicateur de niveau ;
- les résultats `TOO LOW`, `PERFECT` et `OVERFLOW` ;
- la possibilité de recommencer.

### Hors périmètre du POC

Les éléments suivants sont volontairement réservés au MVP ou aux évolutions futures :

- plusieurs niveaux ;
- une difficulté progressive ;
- une réserve d'eau limitée ;
- des obstacles ou événements ;
- un système de score ;
- une progression ;
- des animations avancées ;
- des effets sonores ;
- un classement.

## 7. Principe de conception

Le POC privilégie la validation de la mécanique avant l'enrichissement graphique ou fonctionnel.

L'interface reste donc volontairement simple : chaque élément visible doit participer directement à la compréhension ou à l'évaluation de la boucle principale.

Les fonctionnalités supplémentaires ne doivent être ajoutées qu'après validation de cette mécanique centrale.