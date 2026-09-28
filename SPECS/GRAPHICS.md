# DON'T OVERFLOW! — Direction graphique

## 1. Objectif visuel

L'interface du POC doit permettre de comprendre immédiatement la mécanique principale du jeu sans nécessiter d'explication supplémentaire.

La direction graphique repose donc sur trois principes :

- simplicité ;
- lisibilité ;
- feedback visuel immédiat.

Le design reste volontairement minimal afin que l'attention du joueur soit concentrée sur le récipient, la zone cible et le niveau d'eau.

## 2. Hiérarchie visuelle

L'interface est organisée autour d'une carte centrale contenant les éléments dans l'ordre suivant :

1. indication `PRECISION CHALLENGE` ;
2. titre `DON'T OVERFLOW!` ;
3. instruction courte ;
4. récipient et zone cible ;
5. pourcentage actuel ;
6. résultat de la tentative ;
7. bouton d'interaction ;
8. informations d'état utilisées pour le POC.

Cette hiérarchie doit permettre au joueur de comprendre rapidement :

**objectif → action → niveau → résultat.**

## 3. Palette de couleurs

La palette repose principalement sur des tons bleus et turquoise.

| Élément | Couleur | Rôle |
|---|---|---|
| Bleu marine | `#16324F` | Titres, contours et bouton principal |
| Bleu clair | `#62C9F5` | Eau |
| Turquoise | `#18A999` | Zone cible et accent |
| Bleu très clair | `#EEF8FF` | Fond du récipient |
| Gris bleuté | `#6B7C8F` | Textes secondaires |
| Blanc | `#FFFFFF` | Carte principale |

Le bleu marine donne une structure visuelle forte tandis que le turquoise permet d'identifier immédiatement la zone cible.

## 4. Représentation du récipient

Le récipient constitue l'élément central du POC.

Il est représenté par une forme simple avec :

- un contour bleu marine ;
- un fond bleu très clair ;
- des angles inférieurs arrondis ;
- un niveau d'eau visible qui évolue verticalement.

La hauteur de l'eau constitue la traduction graphique directe de la variable `waterLevel`.

L'objectif n'est pas de reproduire un récipient réaliste, mais de rendre l'évolution du niveau immédiatement perceptible.

## 5. Zone cible

La zone cible est matérialisée par :

- deux lignes horizontales turquoise en pointillés ;
- un fond turquoise transparent ;
- le texte `TARGET`.

La version initiale plaçait cette zone entre 90 % et 100 %.

Après observation du premier prototype, elle a été repositionnée entre 70 % et 80 % afin d'améliorer sa lisibilité et de rendre l'interaction plus intéressante.

La représentation graphique est ainsi directement liée aux seuils définis dans `RULES.md`.

## 6. Interaction principale

Le bouton principal utilise un bleu marine contrasté avec le fond clair de l'interface.

Dans l'état initial, il affiche :

`HOLD TO FILL`

Il constitue l'unique action nécessaire pour jouer.

Après l'évaluation d'une tentative, il devient :

`TRY AGAIN`

Cette modification permet de réutiliser la même zone d'interaction tout en indiquant clairement le changement d'état du jeu.

## 7. Feedback du joueur

Le POC utilise deux formes principales de feedback.

### Feedback continu

Pendant le remplissage :

- l'eau monte dans le récipient ;
- le pourcentage évolue ;
- la position du niveau peut être comparée visuellement à la zone cible.

### Feedback après relâchement

Lorsque le joueur relâche, le niveau reste visible et un résultat est affiché :

- `TOO LOW` ;
- `PERFECT` ;
- `OVERFLOW`.

Le joueur peut ainsi comparer immédiatement son résultat à la position atteinte dans le récipient.

## 8. Interface de développement

Les informations suivantes restent volontairement visibles dans cette version du POC :

- `waterLevel` ;
- `isFilling` ;
- `result`.

Elles ne constituent pas des éléments destinés à l'interface finale du jeu.

Elles servent à vérifier visuellement que l'état interne de l'application correspond bien au comportement observé pendant les tests.

Elles pourront être supprimées ou masquées dans une version MVP destinée aux utilisateurs.

## 9. Choix de simplicité

Aucun élément graphique complexe n'a été ajouté à cette étape.

Le POC ne comporte volontairement pas encore :

- d'animations avancées ;
- d'effets de particules ;
- d'effets sonores ;
- de décors ;
- de système de progression ;
- de changements graphiques complexes selon le résultat.

Ces éléments sont considérés comme des améliorations possibles du MVP.

La priorité de cette version reste la validation de la mécanique :

**observer → maintenir → relâcher → obtenir un résultat → recommencer.**