# DON'T OVERFLOW!

**DON'T OVERFLOW!** est un jeu de précision développé sous la forme d'un Proof of Concept (POC).

Le principe est volontairement simple : le joueur maintient un bouton pour remplir progressivement un récipient, puis relâche au moment où il estime avoir atteint la zone cible.

L'objectif du Rendu 1 est de valider cette mécanique centrale avant de développer un MVP plus riche.

## Concept

La boucle principale du jeu est :

**observer → maintenir → remplir → relâcher → obtenir un résultat → recommencer**

Le joueur :

1. commence avec un récipient vide ;
2. maintient `HOLD TO FILL` ;
3. observe le niveau d'eau augmenter ;
4. relâche lorsqu'il estime être dans la zone cible ;
5. reçoit immédiatement un résultat ;
6. peut lancer une nouvelle tentative avec `TRY AGAIN`.

## Règles du POC

La version actuelle utilise les seuils suivants :

| Niveau atteint | Résultat |
|---|---|
| < 70 % | `TOO LOW` |
| 70–80 % inclus | `PERFECT` |
| > 80 % | `OVERFLOW` |

La vitesse de remplissage est actuellement d'environ **30 % par seconde**.

Dans cette version, `OVERFLOW` correspond au dépassement de la limite supérieure de la zone cible.

## Itération réalisée pendant le POC

La zone cible était initialement prévue entre **90 % et 100 %**.

Lors des premiers tests visuels du prototype, cette cible s'est révélée trop proche du bord supérieur du récipient et moins intéressante à utiliser.

Elle a donc été repositionnée entre **70 % et 80 %**.

Cette décision a ensuite été répercutée dans :

- les règles ;
- l'interface ;
- la représentation graphique de la cible ;
- la logique d'évaluation ;
- la documentation.

Cette modification constitue un exemple concret de l'utilisation du POC pour confronter les spécifications au comportement réel du prototype.

## Stack technique

Le projet utilise :

- React ;
- TypeScript ;
- Vite ;
- CSS ;
- npm ;
- Git.

## Installation

Cloner le repository puis installer les dépendances :

```bash
npm install
```

Lancer le projet en environnement de développement :

```bash
npm run dev
```

Vite fournit ensuite l'adresse locale permettant d'ouvrir le jeu dans le navigateur.

### PowerShell Windows

Sur un environnement Windows où PowerShell bloque l'exécution de `npm.ps1`, les commandes peuvent être lancées avec :

```powershell
npm.cmd install
npm.cmd run dev
```

## Build

Pour vérifier la version de production :

```bash
npm run build
```

Sur PowerShell si nécessaire :

```powershell
npm.cmd run build
```

Le build du Rendu 1 a été vérifié avec succès.

## Structure du projet

```text
/
├── public/
├── SPECS/
│   ├── AGENTIC-WORKFLOW.md
│   ├── CONCEPT.md
│   ├── GRAPHICS.md
│   ├── ROADMAP.md
│   ├── RULES.md
│   └── TECHNICAL.md
├── src/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

Les dossiers générés tels que `node_modules/` et `dist/` ne sont pas versionnés.

## Documentation

Les spécifications du projet sont réparties dans plusieurs fichiers afin de séparer les différentes responsabilités.

### `SPECS/CONCEPT.md`

Décrit :

- l'intention du jeu ;
- la promesse joueur ;
- la boucle principale ;
- le périmètre du POC ;
- la vision du MVP.

### `SPECS/RULES.md`

Décrit :

- les règles actuellement implémentées ;
- les seuils de résultat ;
- les états du jeu ;
- les cas limites ;
- l'évolution possible des règles dans le MVP.

### `SPECS/GRAPHICS.md`

Décrit :

- la direction graphique ;
- la hiérarchie visuelle ;
- la palette ;
- la représentation du récipient ;
- la zone cible ;
- l'évolution graphique envisagée pour le MVP.

### `SPECS/TECHNICAL.md`

Décrit :

- la stack ;
- les états React ;
- la logique de remplissage ;
- l'évaluation ;
- le reset ;
- la validation technique ;
- les pistes d'évolution de l'architecture.

### `SPECS/AGENTIC-WORKFLOW.md`

Décrit la manière dont l'intelligence artificielle a été utilisée comme assistant dans un processus contrôlé :

**intention → specs → proposition → code → exécution → vérification → correction → documentation**

### `SPECS/ROADMAP.md`

Décrit le passage envisagé :

**POC → validation utilisateur → MVP → difficulté progressive → enrichissement**

## Ce que le POC a permis d'apprendre

Le POC a permis de valider plusieurs éléments importants :

- l'interaction maintenir / relâcher fonctionne comme mécanique centrale ;
- le niveau d'eau peut être contrôlé en temps réel ;
- une zone cible crée immédiatement un objectif de précision ;
- le feedback `TOO LOW` / `PERFECT` / `OVERFLOW` rend le résultat compréhensible ;
- la possibilité de recommencer permet de créer une boucle de jeu courte ;
- les paramètres définis dans les spécifications doivent être confrontés au prototype réel ;
- une mécanique très simple peut servir de base à une difficulté beaucoup plus riche.

Le déplacement de la cible de 90–100 % vers 70–80 % constitue la première itération de game design issue de cette observation du prototype.

## Vers le MVP

Le POC est volontairement minimal.

Le MVP cherchera à transformer cette mécanique en un jeu plus complet reposant notamment sur quatre dimensions :

1. **précision** ;
2. **perception** ;
3. **gestion des ressources** ;
4. **gestion de la pression**.

Les pistes envisagées comprennent notamment :

- plusieurs niveaux ;
- objectifs variables ;
- pourcentages précis à atteindre ;
- tolérance variable ;
- nombre limité de tentatives ;
- réserve d'eau limitée ;
- chronomètre ;
- variations du débit ;
- différentes formes de récipients ;
- récipients trompe-l'œil ;
- distinction entre volume réel et hauteur visible ;
- disparition progressive des aides ;
- score et évaluation de la performance ;
- animations et feedback enrichi.

Ces fonctionnalités ne sont **pas implémentées dans le POC du Rendu 1**. Elles constituent les principales directions envisagées pour le MVP et sont détaillées dans `SPECS/CONCEPT.md` et `SPECS/ROADMAP.md`.

## Approche de développement

Le projet suit le principe :

**valider d'abord → enrichir ensuite**

Le POC cherche donc à répondre à une question précise avant d'ajouter de la complexité :

> La mécanique maintenir → remplir → relâcher est-elle suffisamment claire et fonctionnelle pour servir de base au jeu ?

Les prochaines itérations pourront enrichir cette base sans remplacer l'interaction centrale déjà validée.

## Version du Rendu 1

Le projet est versionné avec Git.

La version correspondant au Rendu 1 est identifiée par le tag :

`rendu-1`

Ce tag doit pointer vers le commit contenant la version finale du code et de la documentation du Rendu 1.