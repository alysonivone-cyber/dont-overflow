# DON'T OVERFLOW!

**DON'T OVERFLOW!** est un jeu de précision développé sous la forme d'un Proof of Concept (POC).

Le principe est volontairement simple : le joueur maintient un bouton pour remplir progressivement un récipient, puis doit relâcher au bon moment afin d'arrêter le niveau d'eau dans une zone cible.

L'objectif de cette première version est de valider la mécanique centrale avant d'enrichir le projet graphiquement ou fonctionnellement.

---

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

---

## Règles actuelles

La version actuelle utilise les seuils suivants :

| Niveau atteint | Résultat |
|---|---|
| inférieur à 70 % | `TOO LOW` |
| entre 70 % et 80 % | `PERFECT` |
| supérieur à 80 % | `OVERFLOW` |

La vitesse de remplissage est actuellement fixée à environ **30 % par seconde**.

La zone cible était initialement prévue entre **90 % et 100 %**. Les premiers tests du POC ont montré qu'une cible placée aussi haut rendait l'interaction moins lisible et moins intéressante.

Elle a donc été repositionnée entre **70 % et 80 %**, puis cette décision a été répercutée dans les règles, l'interface et la logique du jeu.

---

## Stack technique

Le projet utilise :

- React ;
- TypeScript ;
- Vite ;
- CSS ;
- Git pour le versionnement.

La logique principale du POC est volontairement concentrée dans une structure simple afin de faciliter les tests et les itérations.

---

## Installation

Cloner le repository puis installer les dépendances :

```bash
npm install