# DON'T OVERFLOW! — Roadmap

## 1. État actuel

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

Cette version constitue la base technique à partir de laquelle les prochaines itérations pourront être construites.

## 2. Enseignements du POC

Le POC a permis de confirmer que la mécanique de maintien et de relâchement fonctionne et peut constituer le cœur du jeu.

Il a également montré l'intérêt de confronter rapidement les spécifications au prototype réel.

La zone cible avait initialement été définie entre 90 % et 100 %. Après test, cette position a été jugée trop proche du bord supérieur du récipient et moins intéressante visuellement.

Elle a donc été repositionnée entre 70 % et 80 %.

Cette modification constitue le premier ajustement de game design directement issu des tests du prototype.

## 3. Étape suivante — MVP

La prochaine étape consiste à transformer le POC en MVP tout en conservant la mécanique centrale déjà validée.

L'objectif n'est pas de reconstruire le jeu, mais d'enrichir progressivement la base existante.

Le MVP pourrait notamment introduire :

- un feedback graphique plus marqué pour chaque résultat ;
- des animations lors de la réussite ou de l'échec ;
- une meilleure transition entre les tentatives ;
- la suppression des informations de debug visibles ;
- une interface plus aboutie ;
- des indications plus claires pour un premier joueur ;
- une meilleure adaptation aux différentes tailles d'écran.

La priorité restera la lisibilité de l'interaction.

## 4. Tests utilisateurs

Le fonctionnement technique du POC a été testé pendant son développement, mais une prochaine phase devra confronter le jeu à plusieurs utilisateurs.

Les tests devront notamment vérifier :

- si l'objectif est compris sans explication ;
- si `HOLD TO FILL` est immédiatement compris ;
- si la vitesse de 30 % / seconde est adaptée ;
- si la zone 70–80 % offre une difficulté intéressante ;
- si les résultats sont suffisamment clairs ;
- si le joueur comprend comment recommencer ;
- si l'interaction donne envie de refaire une tentative.

Ces observations permettront de distinguer les problèmes techniques des problèmes d'expérience utilisateur.

## 5. Difficulté progressive

Une évolution importante pourrait être l'introduction de plusieurs niveaux.

La difficulté pourrait évoluer en modifiant certains paramètres déjà présents dans le POC :

- vitesse de remplissage ;
- largeur de la zone cible ;
- position de la zone cible ;
- visibilité de la cible ;
- temps disponible ;
- comportement du récipient.

Cette approche permettrait de conserver la même interaction principale tout en renouvelant progressivement le challenge.

## 6. Système de score

Une version ultérieure pourrait introduire un score basé sur la précision.

Au lieu de limiter le résultat à trois catégories, le jeu pourrait mesurer la distance entre le niveau atteint et une valeur idéale.

Par exemple, une tentative proche du centre de la zone cible pourrait obtenir davantage de points qu'une tentative située près de sa limite.

Ce système pourrait ensuite permettre :

- un meilleur score ;
- des séries de réussites ;
- des objectifs ;
- un classement local ;
- une progression entre plusieurs niveaux.

Cette fonctionnalité reste hors du périmètre du POC actuel.

## 7. Enrichissement graphique

Une fois la mécanique et la difficulté validées, l'identité visuelle pourra être enrichie.

Les évolutions possibles comprennent :

- animation du liquide ;
- changement de couleur selon le résultat ;
- réaction visuelle du récipient ;
- effets de débordement ;
- particules ;
- transitions ;
- micro-animations du bouton ;
- feedback de réussite plus visible.

Ces éléments seront ajoutés uniquement s'ils améliorent la compréhension ou le plaisir de jeu.

## 8. Son et feedback

Une future version pourrait également introduire du feedback sonore.

Des sons différents pourraient accompagner :

- le remplissage ;
- le relâchement ;
- `TOO LOW` ;
- `PERFECT` ;
- `OVERFLOW`.

Le son resterait un élément complémentaire et ne remplacerait jamais le feedback visuel.

## 9. Évolution technique

La structure actuelle est volontairement simple et adaptée au POC.

Si le nombre de fonctionnalités augmente, le projet pourra être progressivement séparé en plusieurs composants et responsabilités.

Par exemple :

- `GameContainer` ;
- `WaterLevel` ;
- `ResultFeedback` ;
- `GameControls` ;
- configuration des niveaux ;
- logique de score.

Cette évolution sera introduite uniquement lorsque la complexité du projet la justifiera.

## 10. Priorités

L'ordre de développement envisagé est :

### Priorité 1 — Validation utilisateur

Tester la mécanique actuelle avec plusieurs personnes et identifier les difficultés de compréhension ou d'interaction.

### Priorité 2 — Ajustements de gameplay

Modifier si nécessaire :

- la vitesse ;
- la cible ;
- le feedback ;
- le rythme entre les tentatives.

### Priorité 3 — MVP

Nettoyer l'interface, masquer les éléments de debug et renforcer le feedback graphique.

### Priorité 4 — Progression

Introduire plusieurs niveaux et une difficulté progressive.

### Priorité 5 — Enrichissement

Ajouter score, animations, sons et autres éléments secondaires.

## 11. Vision

Le POC démontre la faisabilité de la mécanique centrale de DON'T OVERFLOW!.

La suite du développement doit conserver cette simplicité tout en augmentant progressivement la profondeur du jeu.

Le principe retenu reste :

**valider d'abord → enrichir ensuite.**

Chaque nouvelle fonctionnalité devra donc répondre à un besoin identifié par les tests ou contribuer directement à l'expérience du joueur.