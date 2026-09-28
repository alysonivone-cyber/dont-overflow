# DON'T OVERFLOW! — Règles du jeu

## 1. Principe général

Le joueur contrôle le remplissage d'un récipient en maintenant le bouton `HOLD TO FILL`.

Tant que le bouton est maintenu, le niveau d'eau augmente progressivement. Lorsque le joueur relâche le bouton, le remplissage s'arrête immédiatement et le niveau atteint est évalué.

L'objectif est d'arrêter le remplissage à l'intérieur de la zone cible sans la dépasser.

## 2. Valeurs du POC

| Élément | Valeur |
|---|---:|
| Niveau initial | 0 % |
| Vitesse de remplissage | 30 % / seconde |
| TOO LOW | < 70 % |
| PERFECT | 70–80 % |
| OVERFLOW | > 80 % |
| Nouvelle tentative | Retour à 0 % |

Ces valeurs correspondent à la version actuelle du POC.

## 3. Conditions de résultat

L'évaluation est effectuée lorsque le joueur relâche le bouton.

### TOO LOW

Si le niveau est inférieur à 70 %, la tentative produit :

`TOO LOW`

Le joueur s'est arrêté avant la zone cible.

### PERFECT

Si le niveau est compris entre 70 % et 80 % inclus, la tentative produit :

`PERFECT`

Le joueur a arrêté le remplissage dans la zone cible.

### OVERFLOW

Si le niveau dépasse 80 %, la tentative produit :

`OVERFLOW`

Le joueur a dépassé la zone cible.

## 4. États du jeu

Le POC peut être décrit par les états suivants :

| État | Action du joueur | Comportement du jeu |
|---|---|---|
| Ready | Observe | Récipient vide et bouton `HOLD TO FILL` disponible |
| Filling | Maintient | Le niveau d'eau augmente |
| Stopped | Relâche | Le niveau d'eau est figé |
| Success | Relâche entre 70 et 80 % | Affichage de `PERFECT` |
| Too low | Relâche avant 70 % | Affichage de `TOO LOW` |
| Overflow | Dépasse 80 % | Affichage de `OVERFLOW` |
| Reset | Clique sur `TRY AGAIN` | Retour à l'état initial |

## 5. Interaction maintenir / relâcher

Le remplissage commence lorsque l'interaction de maintien débute.

Il s'arrête lorsque :

- le joueur relâche le bouton ;
- le pointeur quitte le bouton ;
- l'interaction est annulée.

Ces comportements permettent d'éviter que le remplissage continue alors que le joueur n'interagit plus réellement avec la commande.

## 6. Rejouabilité

Une fois une tentative évaluée, son résultat reste affiché afin que le joueur puisse observer son niveau final.

Le bouton principal devient alors :

`TRY AGAIN`

Une nouvelle tentative réinitialise :

- le niveau d'eau à 0 % ;
- l'état de remplissage à `false` ;
- le résultat à `waiting`.

Le POC revient ainsi dans son état initial sans rechargement de la page.

## 7. Ajustement issu du test du POC

La première version des spécifications plaçait la zone cible entre **90 % et 100 %**.

Lors de l'implémentation et des premiers tests visuels, cette position s'est révélée trop proche du bord supérieur du récipient. Elle rendait la cible moins lisible et la mécanique moins intéressante à observer.

La zone cible a donc été repositionnée entre **70 % et 80 %**.

Cette modification a été répercutée dans :

- les règles ;
- l'interface ;
- la logique d'évaluation du POC.

Cet ajustement constitue un premier enseignement directement issu de la confrontation des spécifications au prototype fonctionnel.

## 8. Cas limites à vérifier

Les valeurs suivantes doivent notamment être testées :

- juste en dessous de 70 % → `TOO LOW` ;
- 70 % → `PERFECT` ;
- entre 70 et 80 % → `PERFECT` ;
- 80 % → `PERFECT` ;
- juste au-dessus de 80 % → `OVERFLOW`.

Ces tests permettent de vérifier que l'interface et la logique appliquent exactement les mêmes seuils.