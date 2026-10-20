# DON'T OVERFLOW! — Règles du jeu
> **Note de version :** Les sections 1 à 11 présentent les règles et les pistes d'évolution définies lors du Rendu 1. Les sections 12 à 19 documentent les règles et les mécaniques du jeu réalisé pour le Rendu 2. Les valeurs du POC ne constituent pas des paramètres universels applicables aux 75 niveaux.

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

Lors de l'implémentation et de l'observation visuelle du prototype, cette position s'est révélée trop proche du bord supérieur du récipient. Elle rendait la cible moins lisible et la mécanique moins intéressante à observer.

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

## 12. Évolution du POC vers le Rendu 2

Le Rendu 1 a permis de valider la mécanique fondamentale de DON'T OVERFLOW! : maintenir une commande pour remplir un récipient, observer la progression de l'eau et relâcher au moment approprié.

Le Rendu 2 transforme ce prototype en un jeu complet comprenant **15 mondes et 75 niveaux jouables**.

La mécanique centrale est conservée, mais les contraintes et les objectifs évoluent progressivement au cours de la partie.

Les sections 1 à 11 conservent les règles du POC et les évolutions envisagées lors du Rendu 1. Elles constituent une référence historique et ne doivent pas être interprétées comme des paramètres universels ou des fonctionnalités nécessairement présentes dans les 75 niveaux du Rendu 2.

## 13. Organisation du jeu final

Le jeu est organisé en 15 mondes comprenant chacun 5 niveaux.

Chaque niveau possède ses propres paramètres de difficulté et peut introduire de nouvelles contraintes ou combiner des mécaniques déjà rencontrées.

La progression permet au joueur de découvrir les règles progressivement, avant d'affronter des situations plus complexes.

Le jeu conserve un principe de conception central :

**Une interaction simple, des défis progressivement plus exigeants.**

## 14. Objectifs et évaluation

Contrairement au POC, où la zone cible était fixée entre 70 % et 80 %, les objectifs du Rendu 2 peuvent varier selon les niveaux.

Un niveau peut notamment définir :

- une valeur cible ou une zone de réussite ;
- une tolérance de précision ;
- une vitesse et un comportement de remplissage ;
- des contraintes de temps ;
- une quantité d'eau disponible ;
- des mécaniques particulières influençant le résultat.

La réussite est évaluée selon les règles propres au niveau en cours.

Le joueur doit donc adapter son timing et sa stratégie aux conditions présentées.

## 15. Mécaniques de gameplay

Le Rendu 2 enrichit la mécanique initiale avec plusieurs familles de contraintes.

### 15.1 Variation du débit

Le débit de remplissage peut être constant, progressif ou variable selon le niveau.

Certains événements ou obstacles peuvent également influencer la vitesse de remplissage.

### 15.2 Inertie

Certains niveaux introduisent une inertie après le relâchement de la commande.

Le joueur doit anticiper cette quantité d'eau supplémentaire afin d'atteindre son objectif.

### 15.3 Température et évaporation

Certains niveaux intègrent des effets liés à la température et à l'évaporation.

Ces mécaniques peuvent modifier le niveau d'eau après le remplissage et nécessitent une anticipation supplémentaire.

### 15.4 Gestion des ressources

Certains défis introduisent des contraintes liées à l'eau disponible ou au nombre de tentatives.

Ces contraintes encouragent le joueur à gérer ses ressources et à limiter les erreurs.

### 15.5 Obstacles et événements

Des obstacles ou événements spécifiques peuvent modifier les conditions habituelles d'une tentative.

Le joueur doit alors adapter son comportement aux particularités du niveau.

### 15.6 Perception et informations visuelles

La difficulté peut également dépendre de la représentation du récipient et des informations disponibles à l'écran.

Le joueur ne peut donc pas toujours se reposer uniquement sur un pourcentage affiché.

## 16. Progression et sauvegarde

Le Rendu 2 comprend un système de progression permettant de suivre l'avancement du joueur à travers les mondes et les niveaux.

La progression est sauvegardée localement dans le navigateur.

Le joueur peut ainsi retrouver son avancement lors d'une prochaine session, sous réserve de conserver les données locales du navigateur.

La progression est également représentée par un système d'étoiles associé aux performances réalisées dans les niveaux. Les écrans de sélection permettent de visualiser les étoiles obtenues, les niveaux terminés et les niveaux encore verrouillés. Ces informations contribuent à rendre l'avancement du joueur lisible et encouragent la rejouabilité.

## 17. Feedback et expérience joueur

Le Rendu 2 enrichit les résultats des tentatives avec une interface plus expressive.

Le jeu comprend notamment :

- des retours visuels associés aux résultats ;
- des effets sonores et une ambiance musicale ;
- des animations de réussite et d'échec ;
- des écrans de progression ;
- des interventions du personnage Cappy ;
- une séquence de conclusion.

Ces éléments accompagnent la progression du joueur et renforcent l'identité du jeu.

## 18. Validation du Rendu 2

La version finale a été vérifiée par des tests techniques et des essais manuels.

Les vérifications ont notamment porté sur :

- le fonctionnement des interactions ;
- les différentes mécaniques de gameplay ;
- la progression à travers les 75 niveaux ;
- la sauvegarde de progression ;
- les animations et les effets sonores ;
- le fonctionnement de la conclusion du jeu ;
- la compilation de production.

Le projet est versionné avec Git et publié en ligne avec Vercel.

La version du Rendu 2 est identifiée par le tag Git `rendu-2`.

## 19. Synthèse

DON'T OVERFLOW! est passé d'un prototype validant une interaction unique à un jeu complet reposant sur une progression de 75 niveaux.

Le Rendu 2 conserve les fondements du POC tout en développant la précision, l'anticipation, la gestion des ressources et l'adaptation à différentes contraintes.

**Le principe reste inchangé : maintenir, observer, anticiper et relâcher au bon moment.**