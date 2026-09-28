# DON'T OVERFLOW! — Règles du jeu

## 1. Principe général

Le joueur contrôle le remplissage d'un récipient en maintenant le bouton `HOLD TO FILL`.

Tant que le bouton est maintenu, le niveau d'eau augmente progressivement. Lorsque le joueur relâche le bouton, le remplissage s'arrête et le niveau atteint est évalué.

Dans le POC actuel, l'objectif est d'arrêter le remplissage à l'intérieur de la zone cible située entre 70 % et 80 %.

La mécanique fondamentale repose donc sur une seule interaction :

**maintenir → observer → relâcher**

## 2. Valeurs du POC

| Élément | Valeur |
|---|---:|
| Niveau initial | 0 % |
| Vitesse de remplissage | environ 30 % / seconde |
| `TOO LOW` | < 70 % |
| `PERFECT` | 70–80 % inclus |
| `OVERFLOW` | > 80 % |
| Nouvelle tentative | Retour à 0 % |

Ces valeurs correspondent exclusivement à la version actuelle du POC.

Elles pourront évoluer dans le MVP en fonction des niveaux et des mécaniques introduites.

## 3. Conditions de résultat

L'évaluation est effectuée lorsque le joueur termine son interaction de remplissage.

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

Dans le POC, `OVERFLOW` signifie que le joueur a dépassé la limite supérieure de la zone cible.

Il ne représente donc pas nécessairement un débordement physique du récipient dans cette première version.

## 4. États du jeu

Le fonctionnement du POC peut être décrit par les états suivants :

| État | Action du joueur | Comportement du jeu |
|---|---|---|
| Ready | Observe | Récipient vide et bouton `HOLD TO FILL` disponible |
| Filling | Maintient | Le niveau d'eau augmente |
| Stopped | Relâche | Le niveau d'eau est figé et évalué |
| Success | Relâche entre 70 et 80 % | Affichage de `PERFECT` |
| Too low | Relâche avant 70 % | Affichage de `TOO LOW` |
| Overflow | Relâche au-dessus de 80 % | Affichage de `OVERFLOW` |
| Reset | Clique sur `TRY AGAIN` | Retour à l'état initial |

## 5. Interaction maintenir / relâcher

Le remplissage commence lorsque l'interaction de maintien débute.

Il s'arrête lorsque :

- le joueur relâche le bouton ;
- le pointeur quitte le bouton ;
- l'interaction est annulée.

Ces comportements permettent d'éviter que le remplissage continue alors que le joueur n'interagit plus réellement avec la commande.

Une fois le remplissage arrêté, le niveau atteint est conservé afin que le résultat puisse être observé.

## 6. Rejouabilité

Une fois une tentative évaluée, son résultat reste affiché afin que le joueur puisse observer son niveau final.

Le bouton principal devient alors :

`TRY AGAIN`

Une nouvelle tentative réinitialise :

- le niveau d'eau à 0 % ;
- l'état de remplissage à `false` ;
- le résultat à `waiting`.

Le POC revient ainsi dans son état initial sans rechargement de la page.

## 7. Ajustement issu du POC

La première version des spécifications plaçait la zone cible entre **90 % et 100 %**.

Lors de l'implémentation et des premiers tests visuels du prototype, cette position s'est révélée trop proche du bord supérieur du récipient. Elle rendait la cible moins lisible et la mécanique moins intéressante à observer.

La zone cible a donc été repositionnée entre **70 % et 80 %**.

Cette modification a été répercutée dans :

- les règles ;
- l'interface ;
- la représentation graphique de la cible ;
- la logique d'évaluation du POC.

Cet ajustement constitue un premier enseignement directement issu de la confrontation des spécifications au prototype fonctionnel.

## 8. Cas limites du POC

Les valeurs suivantes doivent notamment être vérifiées :

- juste en dessous de 70 % → `TOO LOW` ;
- 70 % → `PERFECT` ;
- entre 70 % et 80 % → `PERFECT` ;
- 80 % → `PERFECT` ;
- juste au-dessus de 80 % → `OVERFLOW`.

Ces vérifications permettent de confirmer que l'interface et la logique appliquent exactement les mêmes seuils.

## 9. Évolution des règles dans le MVP

Les règles précédentes décrivent le **POC du Rendu 1**.

Le MVP conservera la même interaction fondamentale, mais les paramètres pourront évoluer selon les niveaux.

Les futures règles pourront notamment introduire :

- des objectifs différents de la zone actuelle 70–80 % ;
- des pourcentages précis à atteindre, par exemple 77 % ;
- une tolérance variable autour d'un objectif ;
- un nombre limité de tentatives ;
- une quantité d'eau limitée ;
- un temps maximal ;
- différentes vitesses de remplissage ;
- un débit variable ou progressif ;
- une légère inertie après le relâchement ;
- différentes formes de récipients ;
- une relation entre volume réel et hauteur visible ;
- la disparition progressive de certaines aides visuelles.

Ces règles ne sont **pas implémentées dans le POC actuel**. Elles constituent des pistes de développement pour le MVP.

## 10. Exemple de règle d'un niveau futur

Un niveau avancé pourrait être défini par les paramètres suivants :

| Paramètre | Exemple |
|---|---:|
| Objectif | 77 % |
| Tolérance | ±2 % |
| Tentatives | 3 |
| Temps maximal | 8 secondes |
| Eau disponible | Limitée |
| Pourcentage pendant le remplissage | Masqué |
| Forme du récipient | Trompe-l'œil |

Dans cet exemple, la commande du joueur reste exactement la même : maintenir puis relâcher.

La difficulté supplémentaire provient de la combinaison des contraintes et non de l'ajout de commandes complexes.

## 11. Principe de conservation de la mécanique

Les futures règles devront respecter le principe central de DON'T OVERFLOW! :

**une interaction simple, des contraintes progressivement plus exigeantes**

L'objectif du MVP n'est donc pas de remplacer la mécanique validée par le POC, mais d'augmenter progressivement sa profondeur.