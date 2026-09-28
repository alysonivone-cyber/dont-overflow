# DON'T OVERFLOW! — Spécifications techniques

## 1. Stack technique

Le POC est développé avec :

- React ;
- TypeScript ;
- Vite ;
- CSS ;
- npm pour la gestion des dépendances ;
- Git pour le versionnement du projet.

Cette stack permet de construire rapidement une interface interactive tout en conservant une structure suffisamment claire pour faire évoluer le prototype vers un MVP.

## 2. Structure actuelle du projet

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

## 3. États React

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