# DON'T OVERFLOW! — Direction graphique

## 1. Objectif visuel

L'interface du POC doit permettre de comprendre immédiatement la mécanique principale du jeu sans nécessiter d'explication complexe.

La direction graphique repose sur trois principes :

- simplicité ;
- lisibilité ;
- feedback visuel immédiat.

Le design du POC reste volontairement minimal afin que l'attention du joueur soit concentrée sur le récipient, la zone cible et le niveau d'eau.

Cette simplicité constitue une base fonctionnelle. Le MVP pourra développer une identité visuelle plus riche sans compromettre la compréhension de la mécanique.

## 2. Hiérarchie visuelle du POC

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

**objectif → action → niveau → résultat**

L'élément visuel principal reste le récipient.

## 3. Palette de couleurs

La palette actuelle repose principalement sur des tons bleus et turquoise.

| Élément | Couleur | Rôle |
|---|---|---|
| Bleu marine | `#16324F` | Titres, contours et bouton principal |
| Bleu clair | `#62C9F5` | Eau |
| Turquoise | `#18A999` | Zone cible et accent |
| Bleu très clair | `#EEF8FF` | Fond du récipient |
| Gris bleuté | `#6B7C8F` | Textes secondaires |
| Blanc | `#FFFFFF` | Carte principale |

Le bleu marine donne une structure visuelle forte tandis que le turquoise permet d'identifier immédiatement la zone cible.

Cette palette pourra être enrichie dans le MVP, notamment pour différencier certains états, niveaux ou événements, tout en conservant une cohérence générale.

## 4. Représentation du récipient dans le POC

Le récipient constitue l'élément central de l'interface.

Dans le POC, il est représenté par une forme simple avec :

- un contour bleu marine ;
- un fond bleu très clair ;
- des angles inférieurs arrondis ;
- un niveau d'eau visible qui évolue verticalement.

La hauteur de l'eau constitue actuellement la traduction graphique directe de la variable `waterLevel`.

L'objectif du POC n'est pas de reproduire un récipient réaliste, mais de rendre l'évolution du niveau immédiatement perceptible.

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

Elles seront supprimées ou masquées dans une version destinée aux utilisateurs.

## 9. Choix de simplicité du POC

Aucun élément graphique complexe n'a été ajouté à cette étape.

Le POC ne comporte volontairement pas encore :

- d'animations avancées ;
- d'effets de particules ;
- d'effets sonores ;
- de décors complexes ;
- de système visuel de progression ;
- de variations importantes de récipients ;
- de changements graphiques complexes selon le résultat.

La priorité de cette version reste la validation de la mécanique :

**observer → maintenir → relâcher → obtenir un résultat → recommencer**

## 10. Direction graphique du MVP

Le MVP conservera la lisibilité du POC tout en développant une identité visuelle plus riche.

L'objectif ne sera pas d'ajouter des éléments graphiques uniquement décoratifs, mais d'utiliser le visuel pour soutenir le gameplay.

Les principales évolutions envisagées sont :

- différents types de récipients ;
- silhouettes et proportions variées ;
- représentation plus naturelle du liquide ;
- animations de remplissage ;
- animations de réussite et d'échec ;
- véritable effet visuel de débordement ;
- transitions entre les niveaux ;
- feedback de précision ;
- affichage du score ;
- représentation des tentatives restantes ;
- représentation de la réserve d'eau ;
- représentation du temps restant ;
- micro-animations de l'interface ;
- effets visuels associés aux niveaux plus difficiles.

## 11. Les récipients comme mécanique visuelle

Une évolution majeure du MVP concernera la forme des récipients.

Le jeu pourra utiliser différentes géométries :

- verre droit ;
- récipient large ;
- récipient étroit ;
- forme conique ;
- bouteille ;
- fiole ;
- récipient asymétrique ;
- forme volontairement trompeuse.

Ces formes ne seront pas uniquement des variations esthétiques.

Dans le POC, le pourcentage de remplissage correspond directement à une hauteur visuelle.

Dans une version plus avancée, la géométrie du récipient pourra modifier la relation entre la hauteur de l'eau et le volume réellement contenu.

Ainsi, deux récipients remplis au même pourcentage de leur volume total pourront présenter des hauteurs d'eau différentes.

Cette différence permettra de créer un effet de trompe-l'œil et fera de la forme du récipient une partie intégrante du challenge.

## 12. Évolution des aides visuelles

Les aides visuelles pourront également évoluer avec la difficulté.

### Niveaux accessibles

Le joueur pourra disposer de :

- la zone cible visible ;
- son pourcentage actuel ;
- une indication claire de l'objectif ;
- un feedback immédiat.

### Niveaux intermédiaires

Certaines informations pourront être réduites :

- pourcentage masqué pendant le remplissage ;
- cible moins visible ;
- objectif plus précis ;
- interface plus discrète.

### Niveaux avancés

Certaines aides pourront disparaître temporairement :

- cible affichée avant la tentative puis masquée ;
- pourcentage révélé uniquement après le relâchement ;
- objectif à mémoriser ;
- estimation principalement basée sur la perception du récipient.

La réduction des aides visuelles devient ainsi elle-même un élément de progression.

## 13. Représentation des nouvelles contraintes

Les nouvelles mécaniques du MVP devront rester immédiatement lisibles.

L'interface pourra notamment afficher :

- `TARGET` pour l'objectif ;
- `ATTEMPTS` pour le nombre de tentatives restantes ;
- `WATER LEFT` pour la réserve d'eau ;
- `TIME` pour le temps restant ;
- `SCORE` pour la performance ;
- une indication de précision après chaque tentative.

Ces informations devront être hiérarchisées afin de ne pas détourner l'attention du récipient.

Le joueur doit toujours pouvoir identifier immédiatement :

**ce qu'il doit atteindre → ce qu'il lui reste → ce qu'il doit faire**

## 14. Feedback enrichi du MVP

Le feedback pourra devenir progressivement plus expressif.

Une réussite particulièrement précise pourra par exemple produire :

- une animation spécifique ;
- un effet visuel autour du récipient ;
- une augmentation animée du score ;
- des particules ;
- un feedback sonore ;
- l'affichage de l'écart exact avec la cible.

À l'inverse, un dépassement pourra provoquer :

- une animation de débordement ;
- un mouvement ou une réaction du récipient ;
- un feedback visuel immédiatement identifiable ;
- une indication de la quantité dépassée.

Le feedback devra rester compréhensible même sans son.

## 15. Cohérence entre graphisme et gameplay

La direction graphique doit rester directement liée aux règles du jeu.

Les éléments visuels ne sont donc pas uniquement décoratifs :

- la forme du récipient influence la perception ;
- la zone cible représente l'objectif ;
- le niveau d'eau représente l'état de la tentative ;
- les aides visibles dépendent de la difficulté ;
- les ressources affichées influencent les décisions ;
- le feedback traduit immédiatement le résultat.

Le graphisme devient ainsi progressivement un élément du gameplay lui-même.

## 16. Principe graphique

L'évolution visuelle de DON'T OVERFLOW! suivra le même principe que son évolution fonctionnelle :

**lisibilité d'abord → enrichissement ensuite**

Le POC utilise une représentation minimale afin de valider la mécanique.

Le MVP pourra ensuite enrichir cette représentation tout en conservant une règle essentielle : chaque élément graphique doit soit faciliter la compréhension, soit renforcer le challenge, soit améliorer le feedback donné au joueur.