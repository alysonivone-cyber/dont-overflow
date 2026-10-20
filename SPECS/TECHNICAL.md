# DON'T OVERFLOW! — Spécifications techniques
> **Note de version :** Les sections 1 à 17 décrivent l'architecture du POC et les évolutions techniques envisagées lors du Rendu 1. Les sections 18 à 26 présentent l'organisation, les mécaniques, les validations et le déploiement du jeu réalisé pour le Rendu 2. Les extraits de code et exemples des premières sections sont conservés comme références historiques.

## 1. Stack technique

Le POC est développé avec :

- React ;
- TypeScript ;
- Vite ;
- CSS ;
- npm pour la gestion des dépendances ;
- Git pour le versionnement du projet.

Cette stack permet de construire rapidement une interface interactive tout en conservant une structure suffisamment claire pour faire évoluer le prototype vers un MVP.

## 2. Structure initiale du POC — Rendu 1

La logique principale du POC est volontairement concentrée dans peu de fichiers :

- `src/App.tsx` : logique du jeu et structure principale de l'interface ;
- `src/App.css` : styles et représentation graphique du jeu ;
- `src/index.css` : styles globaux ;
- `src/main.tsx` : point d'entrée de l'application React ;
- `public/` : ressources publiques ;
- `SPECS/` : documentation du concept, des règles, de la direction graphique, des choix techniques et de la roadmap ;
- `README.md` : instructions de lancement et synthèse du POC.

Cette structure est volontairement simple pour le Rendu 1.

Une séparation en plusieurs composants pourra être introduite lorsque la complexité du projet le justifiera.

## 3. États React du POC — Rendu 1

Le jeu repose sur trois états principaux :

```tsx
const [waterLevel, setWaterLevel] = useState(0)
const [isFilling, setIsFilling] = useState(false)
const [result, setResult] = useState('waiting')
```

### `waterLevel`

Représente le niveau actuel de remplissage du récipient.

Sa valeur initiale est :

```tsx
0
```

Le niveau augmente progressivement pendant que le joueur maintient la commande de remplissage.

### `isFilling`

Indique si le remplissage est actuellement actif.

Les deux états possibles sont :

```tsx
true
false
```

Lorsque `isFilling` vaut `true`, le niveau augmente.

Lorsqu'il vaut `false`, le remplissage est arrêté.

### `result`

Représente l'état de la tentative.

La valeur initiale est :

```tsx
'waiting'
```

Après évaluation, elle peut notamment prendre les valeurs :

```tsx
'TOO LOW'
'PERFECT'
'OVERFLOW'
```

La séparation de ces trois états permet de distinguer :

- la valeur mesurée ;
- l'interaction en cours ;
- le résultat de la tentative.

## 4. Logique de remplissage

Le remplissage est contrôlé par un `useEffect` dépendant de `isFilling`.

Lorsque le remplissage est actif, un intervalle augmente progressivement `waterLevel`.

Le POC utilise une augmentation d'environ :

**30 % par seconde**

Cette vitesse est suffisamment lente pour permettre au joueur d'observer la progression tout en conservant une contrainte de timing.

L'intervalle est supprimé lorsque le remplissage s'arrête afin d'éviter qu'il continue à fonctionner inutilement.

## 5. Interaction avec le joueur

Le jeu utilise les événements de pointeur afin de gérer l'interaction principale.

### Début du remplissage

Lorsque le joueur commence à maintenir le bouton :

```tsx
pointerDown
```

`isFilling` passe à `true`.

Le remplissage ne peut commencer que si aucune tentative n'a encore été évaluée.

### Fin du remplissage

Lorsque le joueur relâche :

```tsx
pointerUp
```

`isFilling` repasse à `false`.

Le niveau atteint est alors conservé et évalué.

Le POC prend également en compte :

```tsx
pointerLeave
pointerCancel
```

afin d'éviter que le remplissage continue si le pointeur quitte la zone d'interaction ou si l'interaction est annulée.

## 6. Logique d'évaluation

Le résultat est déterminé à partir du niveau atteint.

La logique actuelle correspond aux règles du POC :

```tsx
const evaluateResult = (level: number) => {
  if (level > 80) {
    return 'OVERFLOW'
  }

  if (level >= 70) {
    return 'PERFECT'
  }

  return 'TOO LOW'
}
```

Les règles sont donc :

| Niveau | Résultat |
|---|---|
| < 70 % | `TOO LOW` |
| 70–80 % inclus | `PERFECT` |
| > 80 % | `OVERFLOW` |

Cette logique correspond directement aux seuils documentés dans `RULES.md`.

## 7. Affichage du niveau

La valeur interne de `waterLevel` peut contenir des décimales.

Pour l'affichage destiné au joueur, elle est arrondie afin d'obtenir un pourcentage plus lisible.

Le niveau d'eau visible dans le récipient dépend également de `waterLevel`.

Dans le POC actuel, le pourcentage de remplissage et la hauteur visuelle de l'eau sont donc directement liés.

Cette relation pourra évoluer dans le MVP lorsque différentes géométries de récipients seront introduites.

## 8. Reset et nouvelle tentative

Après l'évaluation d'une tentative, le résultat reste visible.

Le bouton `HOLD TO FILL` est remplacé par :

`TRY AGAIN`

La fonction de réinitialisation remet le jeu dans son état initial :

```tsx
const resetGame = () => {
  setIsFilling(false)
  setWaterLevel(0)
  setResult('waiting')
}
```

Une nouvelle tentative peut ainsi commencer sans recharger l'application.

## 9. États de debug

Le POC affiche volontairement certaines informations internes :

- `waterLevel` ;
- `isFilling` ;
- `result`.

Ces informations facilitent la vérification du comportement de l'application pendant le développement.

Elles permettent notamment de comparer l'état interne du programme avec le comportement visible à l'écran.

Ces informations ne sont pas destinées à l'interface finale et seront supprimées ou masquées dans le MVP.

## 10. Cohérence entre code et spécifications

Les valeurs utilisées par le code doivent rester cohérentes avec les documents présents dans `SPECS/`.

Le changement de la zone cible de 90–100 % vers 70–80 % a donc nécessité une modification simultanée :

- de la logique d'évaluation ;
- de la représentation graphique ;
- des règles ;
- de la documentation.

Cette synchronisation évite qu'une différence apparaisse entre le comportement réel du jeu et les spécifications.

## 11. Validation technique du POC

Le projet peut être lancé en environnement de développement avec :

```bash
npm run dev
```

Sur un environnement Windows où l'exécution de `npm.ps1` est bloquée par PowerShell, la commande suivante peut être utilisée :

```powershell
npm.cmd run dev
```

Le projet peut également être compilé pour la production avec :

```bash
npm run build
```

ou, dans le même contexte PowerShell :

```powershell
npm.cmd run build
```

Le build du Rendu 1 a été vérifié avec succès avant la création de la version Git correspondante.

## 12. Versionnement

Le projet utilise Git pour assurer la traçabilité du développement.

Les éléments suivants sont versionnés :

- code source ;
- configuration du projet ;
- documentation `SPECS/` ;
- `README.md` ;
- ressources nécessaires au fonctionnement du POC.

Les dépendances installées dans `node_modules/` et les fichiers générés dans `dist/` ne sont pas versionnés.

Ils sont exclus grâce au fichier `.gitignore`.

Le Rendu 1 est destiné à être identifié par le tag Git :

`rendu-1`

## 13. Limites techniques du POC

L'architecture actuelle est adaptée à la validation d'une seule mécanique.

Elle n'a pas encore pour objectif de gérer :

- plusieurs niveaux ;
- une configuration dynamique des objectifs ;
- une réserve d'eau ;
- plusieurs tentatives limitées ;
- un chronomètre ;
- un système de score avancé ;
- différentes géométries de récipients ;
- une progression sauvegardée ;
- des événements complexes.

Ces fonctionnalités appartiennent aux évolutions envisagées pour le MVP.

## 14. Évolution technique vers le MVP

Lorsque les nouvelles mécaniques seront introduites, la structure pourra être progressivement séparée en plusieurs responsabilités.

Une architecture future pourrait notamment comporter :

- `GameContainer` : orchestration générale du jeu ;
- `WaterLevel` : représentation et comportement du liquide ;
- `Container` : représentation du récipient ;
- `ResultFeedback` : affichage des résultats ;
- `GameControls` : gestion des interactions ;
- `Timer` : gestion des contraintes temporelles ;
- `WaterReserve` : gestion de la quantité d'eau disponible ;
- `Score` : calcul et affichage de la performance ;
- `LevelConfig` : paramètres propres à chaque niveau.

Cette architecture constitue une direction possible et n'est pas encore implémentée dans le POC.

## 15. Configuration des niveaux

Afin d'éviter de modifier directement la logique centrale pour chaque nouveau niveau, le MVP pourra utiliser une configuration dédiée.

Un niveau pourrait par exemple être décrit conceptuellement par des paramètres tels que :

```ts
{
  target: 77,
  tolerance: 2,
  attempts: 3,
  timeLimit: 8,
  waterLimit: 250,
  showPercentage: false,
  containerType: 'conical'
}
```

Cet exemple illustre une direction technique possible.

Il ne correspond pas à une structure actuellement implémentée dans le Rendu 1.

L'objectif serait de permettre au moteur du jeu de conserver la même logique générale tout en chargeant différentes contraintes selon le niveau.

## 16. Gestion future des récipients

Dans le POC actuel, `waterLevel` peut être directement traduit en hauteur visuelle.

Cette approche est suffisante pour un récipient simple.

Pour le MVP, différentes formes pourront nécessiter de distinguer :

- le volume d'eau réel ;
- le volume maximal du récipient ;
- la hauteur visuelle du liquide ;
- la géométrie du récipient.

Cette séparation permettra notamment de créer les récipients trompe-l'œil décrits dans `CONCEPT.md` et `GRAPHICS.md`.

Le calcul exact dépendra de la géométrie choisie et devra être défini lors de l'implémentation de cette fonctionnalité.

## 17. Principe d'évolution technique

L'architecture ne doit pas devenir complexe avant que les fonctionnalités ne le nécessitent.

Le principe retenu reste :

**structure minimale pour le POC → modularisation progressive pour le MVP**

Le code doit évoluer en fonction des besoins réellement validés plutôt que d'anticiper une architecture complexe avant qu'elle soit nécessaire.

---

## 18. Évolution de l'architecture — Rendu 2

Le Rendu 1 reposait sur une architecture volontairement minimale, adaptée à la validation d'une mécanique unique.

Le Rendu 2 transforme ce prototype en un jeu comprenant **15 mondes et 75 niveaux jouables**.

Cette évolution a nécessité une organisation plus structurée du code, tout en conservant la stack technique initiale :

- React ;
- TypeScript ;
- Vite ;
- CSS ;
- npm ;
- Git.

Les sections 1 à 17 décrivent l'architecture historique du POC et les évolutions envisagées à cette période.

Les sections suivantes documentent les principaux choix techniques du Rendu 2.

## 19. Organisation du projet final

Le code du jeu est organisé autour de plusieurs répertoires et fichiers spécialisés.

| Élément | Responsabilité principale |
|---|---|
| `src/App.tsx` | Orchestration générale du jeu et coordination des mécaniques |
| `src/App.css` | Styles principaux de l'application |
| `src/components/` | Composants réutilisables de l'interface |
| `src/components/UI/` | Éléments d'interface liés aux contraintes et aux commandes |
| `src/components/WorldSelection/` | Navigation et sélection des mondes et niveaux |
| `src/game/levels.ts` | Configuration des niveaux |
| `src/game/types.ts` | Définitions des types du jeu |
| `src/game/evaluateResult.ts` | Évaluation des résultats |
| `src/game/getFlowSpeed.ts` | Calcul des variations de débit |
| `src/game/getEffectiveFlowSpeed.ts` | Calcul de la vitesse effective selon les contraintes |
| `src/game/getEvaporationRate.ts` | Calcul de l'évaporation |
| `src/game/playerProgress.ts` | Gestion de la progression |
| `src/game/soundManager.ts` | Gestion des effets sonores |
| `src/assets/` | Ressources graphiques et sonores importées |
| `public/` | Ressources publiques, notamment audiovisuelles |
| `SPECS/` | Documentation du projet |

Cette organisation permet de distinguer progressivement la logique du jeu, sa configuration, son interface et ses ressources.

## 20. Configuration et progression des niveaux

Le jeu comprend 75 niveaux répartis en 15 mondes.

Les paramètres des niveaux sont centralisés dans `src/game/levels.ts`.

Les configurations permettent de définir les objectifs et les contraintes propres aux différents défis.

Le moteur du jeu utilise ces paramètres afin d'adapter son comportement sans nécessiter une implémentation entièrement indépendante pour chaque niveau.

La progression du joueur est gérée dans un module spécialisé.

Les données de progression sont sauvegardées localement dans le navigateur, permettant de retrouver les niveaux terminés lors de sessions ultérieures sur la même origine.

## 21. Gestion des interactions et du temps

La mécanique centrale repose toujours sur le maintien et le relâchement d'une commande de remplissage.

Cependant, le comportement du jeu dépend désormais de plusieurs conditions :

- état de remplissage ;
- niveau d'eau ;
- temps écoulé ;
- vitesse de remplissage ;
- ressources disponibles ;
- événements ou obstacles ;
- conditions de réussite et d'échec.

L'application utilise les états React pour piloter l'interface et des références React (`useRef`) pour suivre certaines valeurs utilisées dans les calculs temporels.

Des effets React (`useEffect`) assurent notamment la mise à jour des mécaniques nécessitant des intervalles réguliers.

Cette organisation permet de gérer des comportements tels que l'inertie et l'évaporation sans dépendre exclusivement des mises à jour de l'affichage.

## 22. Modularisation des mécaniques

Plusieurs calculs ont été isolés dans des fonctions spécialisées.

Cette approche facilite leur compréhension, leur réutilisation et leur vérification.

Les modules couvrent notamment :

- le calcul du débit ;
- les effets des obstacles ;
- les interférences de certaines mécaniques ;
- l'évaporation ;
- la représentation visuelle du niveau d'eau ;
- l'évaluation des résultats ;
- la progression du joueur.

Les fonctions spécialisées peuvent être testées indépendamment des composants React.

Cette séparation réduit la nécessité de vérifier l'ensemble de l'interface pour chaque modification d'un calcul.

## 23. Interface et composants réutilisables

Le Rendu 2 comprend plusieurs composants dédiés à l'expérience du joueur.

Ils couvrent notamment :

- l'écran d'accueil et les interventions de Cappy ;
- la sélection des mondes et des niveaux ;
- la représentation du récipient ;
- les commandes de remplissage ;
- les informations relatives aux objectifs ;
- les contraintes de temps, de température et de ressources ;
- les obstacles et événements ;
- les résultats des tentatives ;
- les animations de célébration ;
- la conclusion de l'aventure.

La réutilisation des composants permet de conserver une présentation cohérente à travers les différents mondes.

## 24. Tests et validation technique

Le Rendu 2 a fait l'objet de tests automatisés et de vérifications manuelles.

Les commandes principales utilisées sont :

```powershell
npm.cmd run test
npm.cmd run lint
npm.cmd run build
```

Les derniers résultats validés avant la publication sont :

| Vérification | Résultat |
|---|---|
| Tests automatisés | 120 tests réussis |
| Fichiers de tests | 14 fichiers validés |
| Analyse statique | 0 erreur, 0 avertissement |
| Compilation TypeScript et Vite | Réussie |
| Vérification manuelle | 75 niveaux et conclusion testés |

Les tests automatisés vérifient notamment les fonctions de calcul et certains composants de l'interface.

Les essais manuels complètent ces vérifications en contrôlant le déroulement du jeu.

Ces résultats correspondent à la version testée pour le Rendu 2 et ne constituent pas une garantie d'absence totale de défauts.

## 25. Versionnement et déploiement

Le projet est versionné avec Git et hébergé sur GitHub.

Dépôt :

https://github.com/alysonivone-cyber/dont-overflow

Le Rendu 2 correspond au commit :

`1a4c5f5`

Un tag Git permet d'identifier cette version :

`rendu-2`

Le jeu a été déployé sur Vercel à l'adresse :

https://dont-overflow.vercel.app

Le déploiement utilise la branche `main` du dépôt GitHub.

La compilation de production est réalisée avec :

```bash
npm run build
```

Les fichiers générés dans `dist/` sont utilisés pour la publication.

Les dossiers `node_modules/` et `dist/` restent exclus du versionnement Git.

## 26. Bilan technique

Le développement de DON'T OVERFLOW! illustre une évolution progressive de l'architecture.

Le Rendu 1 privilégiait une structure simple afin de valider rapidement la mécanique de remplissage.

Le Rendu 2 conserve cette base tout en introduisant :

- une configuration de 75 niveaux ;
- des composants React spécialisés ;
- des fonctions de calcul indépendantes ;
- des mécaniques temporelles et événementielles ;
- une sauvegarde de progression ;
- des tests automatisés ;
- une compilation de production vérifiée ;
- un versionnement Git ;
- un déploiement web.

Cette évolution respecte le principe technique formulé dès le Rendu 1 :

**Structure minimale pour le POC → modularisation progressive pour le MVP.**

L'objectif n'a pas été de multiplier les abstractions, mais d'organiser le projet au fur et à mesure de ses besoins fonctionnels.