# DON'T OVERFLOW! — Workflow d'utilisation de l'IA

## 1. Rôle de l'IA dans le projet

L'intelligence artificielle a été utilisée comme assistant de conception, de structuration et de développement du POC.

Elle n'a pas été utilisée pour définir seule le jeu ou générer un projet complet sans contrôle humain.

Le principe retenu pendant le développement a été :

**intention → spécifications → proposition technique → implémentation → exécution → observation → correction → validation**

Les décisions concernant le concept, les règles du jeu, les seuils, le périmètre du POC et les ajustements après test restent définies et validées par le développeur.

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
- correction de problèmes observés pendant les tests ;
- amélioration de la lisibilité du code et de la documentation.

Cette méthode permet de conserver le contrôle du projet tout en utilisant l'IA pour accélérer certaines étapes d'implémentation.

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
- vitesse : 30 % / seconde ;
- maintien : le niveau augmente ;
- relâchement : le niveau se fige ;
- zone cible : intervalle défini dans les specs ;
- résultat affiché après le relâchement.

### Étape 3 — Demander une implémentation ciblée

L'IA est sollicitée pour proposer ou corriger une partie précise de l'implémentation.

Le code proposé n'est pas considéré comme automatiquement valide.

Il doit être exécuté dans l'environnement réel du projet.

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

Lorsqu'un problème est observé, la demande suivante adressée à l'IA concerne uniquement ce problème.

Cette approche évite de régénérer inutilement l'ensemble du projet et réduit le risque d'introduire de nouvelles erreurs dans des parties déjà fonctionnelles.

### Étape 7 — Mettre à jour les specs

Lorsqu'un test conduit à une véritable décision de conception, les spécifications sont également mises à jour.

Le code n'est donc pas considéré comme l'unique source décrivant le fonctionnement du jeu.

## 4. Exemple concret — position de la zone cible

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
- les tests du POC ;
- la documentation du projet.

Cet exemple montre que l'IA n'est pas utilisée uniquement pour produire du code : le prototype généré permet également de confronter les spécifications à une expérience réelle et d'identifier les ajustements nécessaires.

## 5. Exemple concret — correction d'un comportement

Pendant le développement, certains comportements observés dans le navigateur ne correspondaient pas exactement au résultat recherché.

La démarche appliquée était alors :

**observer le problème → identifier la partie concernée → fournir le contexte → demander une correction ciblée → exécuter → vérifier**

Par exemple, la gestion du résultat et du reset a été ajustée afin que le résultat d'une tentative reste visible après le relâchement.

Le joueur doit volontairement cliquer sur `TRY AGAIN` avant que :

- `waterLevel` revienne à `0` ;
- `result` revienne à `waiting` ;
- une nouvelle tentative puisse commencer.

Cette correction permet de conserver le feedback suffisamment longtemps pour que le joueur puisse observer son résultat.

## 6. Vérification humaine

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

## 7. Traçabilité des décisions

Les décisions importantes sont conservées dans les fichiers de spécifications.

La documentation permet ainsi de retrouver :

- l'intention initiale ;
- les règles retenues ;
- les choix graphiques ;
- l'implémentation technique ;
- les ajustements issus des tests ;
- les évolutions envisagées.

Cette organisation permet de distinguer clairement :

**ce qui était prévu → ce qui a été implémenté → ce qui a été observé → ce qui a été modifié.**

## 8. Limites de l'utilisation de l'IA

L'utilisation de l'IA nécessite une vérification systématique.

Une proposition peut être :

- techniquement incorrecte ;
- incompatible avec le code existant ;
- cohérente en apparence mais différente des specs ;
- fonctionnelle mais peu adaptée à l'expérience utilisateur.

Pour cette raison, le développement reste piloté par les spécifications et par les résultats observés lors des tests.

L'IA constitue une aide à l'implémentation et à l'itération, et non une source automatique de vérité.

## 9. Workflow retenu pour la suite

Le même processus sera conservé pour le développement du MVP :

1. définir la fonctionnalité ;
2. écrire ou mettre à jour les specs ;
3. demander une implémentation ciblée ;
4. intégrer le code ;
5. exécuter ;
6. tester ;
7. identifier les écarts ;
8. corriger ;
9. mettre à jour la documentation ;
10. valider avant de passer à la fonctionnalité suivante.

Cette méthode permet d'utiliser l'IA comme accélérateur de développement tout en conservant une démarche contrôlée, traçable et guidée par les objectifs du projet.

## 10. Synthèse

Le workflow d'utilisation de l'IA peut être résumé ainsi :

**HUMAIN**
Définir l'intention et les contraintes

↓

**SPECS**
Formaliser le comportement attendu

↓

**IA**
Proposer une solution technique ciblée

↓

**CODE**
Intégrer la proposition dans le projet

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