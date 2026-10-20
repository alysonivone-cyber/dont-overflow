# DON'T OVERFLOW! — Workflow d'utilisation de l'IA
> **Note de version :** Les sections 1 à 12 documentent le workflow initial du Proof of Concept (Rendu 1). Les sections 13 à 20 présentent son application au développement et à la validation du jeu complet pour le Rendu 2.

## 1. Rôle de l'IA dans le projet

L'intelligence artificielle a été utilisée comme assistant de conception, de structuration, de développement et de documentation du POC.

Elle n'a pas été utilisée pour définir seule le jeu ou générer un projet complet sans contrôle humain.

Le principe retenu pendant le développement a été :

**intention → spécifications → proposition technique → implémentation → exécution → observation → correction → validation**

Les décisions concernant le concept, les règles du jeu, les seuils, le périmètre du POC et les ajustements issus de l'observation du prototype restent définies et validées par le développeur.

## 2. Principe de travail

Le développement n'a pas commencé par une demande générale du type :

> « Fais-moi un jeu complet. »

Le concept et les règles ont d'abord été définis afin de fournir à l'IA un cadre précis.

Les demandes adressées à l'IA ont ensuite été limitées à des problèmes ou fonctionnalités ciblés :

- création de la structure React du POC ;
- gestion des états ;
- interaction maintenir / relâcher ;
- évolution progressive du niveau d'eau ;
- traduction des seuils en conditions ;
- réinitialisation d'une tentative ;
- correction de problèmes observés pendant l'exécution et la vérification du prototype ;
- amélioration de la lisibilité du code ;
- structuration et mise à jour de la documentation.

Cette méthode permet de conserver le contrôle du projet tout en utilisant l'IA pour accélérer certaines étapes d'implémentation et d'itération.

## 3. Workflow appliqué

Pour chaque fonctionnalité importante, le processus suivant a été utilisé.

### Étape 1 — Définir l'intention

La fonctionnalité attendue est d'abord décrite indépendamment du code.

Exemple :

Le joueur doit maintenir un bouton pour remplir progressivement un récipient et relâcher lorsqu'il estime avoir atteint une zone cible.

### Étape 2 — Définir les règles

Les règles sont ensuite exprimées sous une forme vérifiable.

Exemple :

- niveau initial : 0 % ;
- vitesse : environ 30 % par seconde ;
- maintien : le niveau augmente ;
- relâchement : le niveau se fige ;
- zone cible : intervalle défini dans les specs ;
- résultat affiché après le relâchement.

### Étape 3 — Demander une implémentation ciblée

L'IA est sollicitée pour proposer ou corriger une partie précise de l'implémentation.

Le code proposé n'est pas considéré comme automatiquement valide.

Il doit être intégré puis exécuté dans l'environnement réel du projet.

### Étape 4 — Exécuter

Le code est intégré au projet puis lancé avec l'environnement de développement Vite.

Le comportement réel du POC est ensuite observé directement dans le navigateur.

### Étape 5 — Vérifier

Le résultat observé est comparé aux spécifications.

Les éléments contrôlés incluent notamment :

- le démarrage du remplissage ;
- son arrêt au relâchement ;
- l'évolution du pourcentage ;
- la correspondance entre l'eau et `waterLevel` ;
- les seuils de résultat ;
- la possibilité de recommencer ;
- la cohérence entre la zone cible graphique et les règles.

### Étape 6 — Corriger

Lorsqu'un problème est observé, la demande suivante adressée à l'IA concerne prioritairement ce problème.

Cette approche évite de régénérer inutilement l'ensemble du projet et réduit le risque d'introduire de nouvelles erreurs dans des parties déjà fonctionnelles.

### Étape 7 — Mettre à jour les specs

Lorsqu'une observation du prototype conduit à une véritable décision de conception, les spécifications sont également mises à jour.

Le code n'est donc pas considéré comme l'unique source décrivant le fonctionnement du jeu.

### Étape 8 — Valider la version

Avant de considérer une version comme terminée :

- le comportement du jeu est vérifié ;
- les spécifications sont comparées au résultat réel ;
- le projet est compilé ;
- les fichiers concernés sont versionnés avec Git ;
- la version destinée au rendu est identifiée précisément.

Cette étape permet de conserver une correspondance entre le code, la documentation et la version remise.

## 4. Exemple concret — Position de la zone cible

La première version des spécifications définissait la zone de réussite entre **90 % et 100 %**.

Cette règle a d'abord été traduite dans le prototype.

Lors du test visuel du POC, la zone cible apparaissait cependant très proche du bord supérieur du récipient.

Le comportement était techniquement fonctionnel, mais l'interaction paraissait moins lisible et moins intéressante.

Une modification a donc été décidée :

**version initiale : 90–100 %**

↓

**version ajustée : 70–80 %**

Cette décision a ensuite été répercutée dans :

- `RULES.md` ;
- la logique `evaluateResult()` ;
- la position graphique de la zone cible ;
- les vérifications du POC ;
- la documentation du projet.

Cet exemple montre que l'IA n'est pas utilisée uniquement pour produire du code : le prototype permet également de confronter les spécifications à une expérience réelle et d'identifier les ajustements nécessaires.

## 5. Exemple concret — Correction d'un comportement

Pendant le développement, certains comportements observés dans le navigateur ne correspondaient pas exactement au résultat recherché.

La démarche appliquée était alors :

**observer le problème → identifier la partie concernée → fournir le contexte → demander une correction ciblée → exécuter → vérifier**

Par exemple, la gestion du résultat et du reset a été ajustée afin que le résultat d'une tentative reste visible après le relâchement.

Le joueur doit volontairement cliquer sur `TRY AGAIN` avant que :

- `waterLevel` revienne à `0` ;
- `result` revienne à `waiting` ;
- une nouvelle tentative puisse commencer.

Cette correction permet de conserver le feedback suffisamment longtemps pour que le joueur puisse observer son résultat.

## 6. Exemple concret — Évolution du concept vers le MVP

Une fois la mécanique fondamentale du POC validée, l'IA a également été utilisée comme outil de réflexion pour explorer les évolutions possibles du MVP.

Plusieurs pistes ont été envisagées, notamment :

- objectifs de précision variables ;
- pourcentages précis à atteindre ;
- nombre limité de tentatives ;
- réserve d'eau limitée ;
- chronomètre ;
- variations du débit ;
- différentes formes de récipients ;
- relation entre volume réel et hauteur visible ;
- disparition progressive des aides ;
- score et feedback enrichi.

Ces propositions ne sont pas considérées comme automatiquement retenues ou implémentées.

Elles sont documentées comme pistes de conception puis organisées selon leur intérêt, leur cohérence avec la mécanique centrale et leur priorité de développement.

Cette distinction permet de séparer :

**idée proposée → décision de conception → spécification → implémentation réelle**

## 7. Vérification humaine

Chaque proposition technique importante est vérifiée directement dans le POC.

L'exécution dans le navigateur constitue une étape obligatoire du workflow.

Une réponse de l'IA n'est donc pas considérée comme une validation.

La validation intervient uniquement après comparaison entre :

**comportement attendu dans les specs ↔ comportement réellement observé**

Cette vérification permet notamment de détecter des problèmes qui ne sont pas nécessairement visibles à la lecture du code, par exemple :

- position visuelle peu adaptée ;
- interaction peu intuitive ;
- feedback trop rapide ;
- incohérence entre une valeur logique et sa représentation graphique.

## 8. Validation technique

La vérification visuelle est complétée par une validation technique.

Avant la préparation du Rendu 1, le projet a notamment été compilé avec la commande de build afin de vérifier que TypeScript et Vite pouvaient produire correctement la version destinée à la production.

Le versionnement Git permet ensuite de figer une version précise du projet.

Le tag :

`rendu-1`

permet d'identifier le commit correspondant au Rendu 1.

Cette étape garantit que le rendu correspond à une version précise du code et de la documentation plutôt qu'à un ensemble de fichiers non versionnés.

## 9. Traçabilité des décisions

Les décisions importantes sont conservées dans les fichiers de spécifications.

La documentation permet ainsi de retrouver :

- l'intention initiale ;
- les règles retenues ;
- les choix graphiques ;
- l'implémentation technique ;
- les ajustements issus de l'observation et de la vérification du prototype ;
- les évolutions envisagées.

Cette organisation permet de distinguer clairement :

**ce qui était prévu → ce qui a été implémenté → ce qui a été observé → ce qui a été modifié**

Git complète cette traçabilité en conservant les différentes versions du projet.

## 10. Limites de l'utilisation de l'IA

L'utilisation de l'IA nécessite une vérification systématique.

Une proposition peut être :

- techniquement incorrecte ;
- incompatible avec le code existant ;
- cohérente en apparence mais différente des specs ;
- fonctionnelle mais peu adaptée à l'expérience utilisateur ;
- trop complexe par rapport au besoin réel ;
- basée sur une interprétation différente de l'intention initiale.

Pour cette raison, le développement reste piloté par les spécifications et par les résultats observés lors de l'exécution et de la vérification du prototype.

L'IA constitue une aide à la conception, à l'implémentation et à l'itération, et non une source automatique de vérité.

## 11. Workflow envisagé pour le MVP au Rendu 1

Le même processus sera conservé pour le développement du MVP :

1. définir la fonctionnalité ;
2. écrire ou mettre à jour les specs ;
3. déterminer les critères permettant de vérifier son fonctionnement ;
4. demander une implémentation ciblée ;
5. intégrer le code ;
6. exécuter ;
7. tester ;
8. identifier les écarts ;
9. corriger ;
10. mettre à jour la documentation ;
11. compiler et vérifier la version ;
12. versionner la modification avant de passer à l'étape suivante.

Cette méthode permettra d'introduire progressivement les nouvelles mécaniques sans perdre la stabilité de la boucle déjà validée.

## 12. Synthèse

Le workflow d'utilisation de l'IA peut être résumé ainsi :

**HUMAIN**  
Définir l'intention et les contraintes

↓

**SPECS**  
Formaliser le comportement attendu

↓

**IA**  
Proposer une solution ou une piste ciblée

↓

**CODE**  
Intégrer la proposition retenue dans le projet

↓

**EXÉCUTION**  
Observer le comportement réel

↓

**HUMAIN**  
Comparer le résultat aux specs

↓

**ITÉRATION**  
Corriger le code ou ajuster la conception

↓

**DOCUMENTATION**  
Répercuter les décisions validées dans les specs

↓

**VALIDATION TECHNIQUE**  
Vérifier le build et la cohérence du projet

↓

**GIT**  
Versionner une version précise et traçable

---

## 13. Évolution du workflow — Rendu 2

Le Rendu 1 a permis de définir et de valider un workflow de développement assisté par intelligence artificielle.

Ce workflow reposait sur une séparation claire des responsabilités :

- **Humain** : définition des intentions, des règles, des priorités et validation des résultats.
- **Spécifications** : formalisation du comportement attendu.
- **IA** : assistance à la conception, à l'implémentation et à la résolution de problèmes.
- **Exécution** : observation du comportement réel dans l'environnement de développement.
- **Vérification** : comparaison entre le résultat obtenu et les objectifs définis.
- **Git** : conservation d'un historique traçable des versions.

Le Rendu 2 a conservé cette méthode tout en l'appliquant à un projet plus complexe, comprenant 15 mondes et 75 niveaux jouables.

Les sections 1 à 12 documentent le workflow du POC. Les sections suivantes présentent son application au développement du jeu final.

## 14. Décomposition du développement en tâches ciblées

Le développement du Rendu 2 n'a pas reposé sur la génération d'une application complète en une seule demande.

Les évolutions ont été abordées progressivement, en distinguant notamment :

- la configuration des niveaux ;
- les objectifs et tolérances ;
- les variations du débit ;
- les contraintes de temps et de ressources ;
- les mécaniques d'inertie et d'évaporation ;
- les obstacles et événements ;
- les composants d'interface ;
- la progression du joueur ;
- les effets visuels et sonores ;
- les tests et la stabilisation.

Cette décomposition a permis de travailler sur des problèmes identifiables et de limiter les modifications simultanées.

L'IA a été utilisée pour proposer des solutions, expliquer certaines erreurs, aider à structurer les fonctions et accompagner les vérifications.

Les propositions ont été intégrées et évaluées dans le projet réel.

## 15. Pilotage humain des décisions

Le développeur est resté responsable des décisions importantes du projet.

Ces décisions comprennent notamment :

- la direction générale du jeu ;
- la progression des 15 mondes ;
- les mécaniques retenues ;
- les objectifs des niveaux ;
- la difficulté recherchée ;
- l'identité visuelle ;
- le personnage Cappy ;
- les ajustements issus des essais ;
- la validation des versions.

Les suggestions de l'IA ne constituent pas automatiquement des décisions de conception.

Une proposition peut être acceptée, adaptée, reportée ou rejetée selon sa cohérence avec le jeu.

Le workflow distingue donc :

**Proposition de l'IA → décision humaine → implémentation → vérification.**

## 16. Vérification progressive des mécaniques

L'augmentation du nombre de mécaniques a rendu les vérifications plus importantes.

Chaque fonctionnalité devait être confrontée à son comportement réel.

La validation pouvait notamment porter sur :

- la vitesse de remplissage ;
- l'arrêt au relâchement ;
- les effets d'inertie ;
- les variations du niveau d'eau ;
- les contraintes temporelles ;
- les ressources disponibles ;
- l'évaluation de la réussite ;
- le passage au niveau suivant ;
- la sauvegarde de progression.

Lorsqu'un comportement ne correspondait pas au résultat attendu, la correction était limitée autant que possible à la partie concernée.

Cette méthode a permis de conserver les fonctionnalités déjà validées tout en développant de nouveaux défis.

## 17. Tests automatisés et validation manuelle

Le Rendu 2 a été accompagné d'une démarche de vérification technique.

Les derniers résultats validés avant la publication comprennent :

- **14 fichiers de tests automatisés validés** ;
- **120 tests réussis** ;
- **aucune erreur ni avertissement détecté par le lint** ;
- **une compilation de production réussie**.

Les commandes utilisées sont :

```powershell
npm.cmd run test
npm.cmd run lint
npm.cmd run build
```

La validation technique a été complétée par une vérification manuelle des **75 niveaux** et de la conclusion du jeu.

Cette vérification était nécessaire pour observer des aspects qui ne sont pas entièrement couverts par les tests automatisés, notamment le ressenti des interactions, les animations et la progression.

Les tests automatisés et manuels constituent ainsi deux méthodes complémentaires.

## 18. Stabilisation et gestion des risques

À l'approche du Rendu 2, la priorité a progressivement évolué.

Pendant le développement, l'objectif principal était d'enrichir le jeu.

Après la validation des niveaux et de la conclusion, la priorité est devenue la stabilité.

Le principe retenu a été de ne pas multiplier les modifications du gameplay lorsque les fonctionnalités principales étaient déjà opérationnelles.

Cette décision permet de limiter le risque d'introduire de nouveaux défauts avant la remise.

La documentation a ensuite été actualisée séparément du code, afin de refléter l'évolution du projet sans modifier le fonctionnement de la version validée.

## 19. Versionnement et livraison

Le projet utilise Git pour conserver l'historique des modifications.

Le code source est hébergé sur GitHub :

https://github.com/alysonivone-cyber/dont-overflow

La version validée pour le Rendu 2 correspond au commit :

`1a4c5f5`

Elle est identifiée par le tag :

`rendu-2`

Le jeu a été publié sur Vercel :

https://dont-overflow.vercel.app

Cette organisation permet de distinguer la version du jeu validée pour le rendu des éventuelles modifications documentaires ultérieures.

## 20. Bilan de l'utilisation de l'IA

Le développement de DON'T OVERFLOW! montre comment l'intelligence artificielle peut accompagner un projet logiciel tout en conservant un pilotage humain.

Le Rendu 1 a permis de définir un workflow fondé sur des spécifications explicites et une validation par l'exécution.

Le Rendu 2 a appliqué ce workflow à un jeu complet, avec des mécaniques variées, une progression de 75 niveaux et une interface enrichie.

L'IA a contribué à accélérer certaines tâches de développement, de structuration, de débogage, de test et de documentation.

Cependant, les propositions n'ont pas été considérées comme automatiquement correctes.

La validation a reposé sur l'exécution réelle, les tests et les décisions du développeur.

Le principe retenu reste :

**Intention humaine → spécifications → assistance IA → implémentation → tests → corrections → validation → versionnement.**

L'IA est ainsi utilisée comme un outil d'assistance au développement, et non comme un substitut au raisonnement, à la conception ou à la vérification humaine.