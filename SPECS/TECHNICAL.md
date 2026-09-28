# DON'T OVERFLOW! — Spécifications techniques

## 1. Stack technique

Le POC est développé avec :

- React ;
- TypeScript ;
- Vite ;
- CSS ;
- npm pour la gestion des dépendances.

Cette stack permet de construire rapidement une interface interactive tout en conservant une structure suffisamment claire pour faire évoluer le prototype vers un MVP.

## 2. Structure actuelle du projet

La logique principale du POC est volontairement concentrée dans peu de fichiers :

- `src/App.tsx` : logique du jeu et structure de l'interface ;
- `src/App.css` : styles et représentation graphique ;
- `SPECS/` : documentation du concept, des règles et des choix techniques ;
- `README.md` : lancement du projet et synthèse du POC.

Cette structure est volontairement simple pour le POC. Une séparation en plusieurs composants pourra être introduite si le projet devient plus complexe.

## 3. États React

Le jeu repose sur trois états principaux :

```tsx
const [waterLevel, setWaterLevel] = useState(0)
const [isFilling, setIsFilling] = useState(false)
const [result, setResult] = useState('waiting')