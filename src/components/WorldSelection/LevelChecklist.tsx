
import './LevelChecklist.css'
import capybaraChecklist from '../../assets/capybaras/capybara-checklist.png'
import {
  getLevelStars,
  isLevelUnlocked,
} from '../../game/playerProgress'
import type { PlayerProgress } from '../../game/playerProgress'

type ChecklistLevel = {
  id: number
  name: string
}

type LevelChecklistProps = {
  world: number
  levels: ChecklistLevel[]
  progress: PlayerProgress
  onSelectLevel: (levelId: number) => void
  onBack: () => void
}

export function LevelChecklist({
  world,
  levels,
  progress,
  onSelectLevel,
  onBack,
}: LevelChecklistProps) {
  return (
    <section className="level-checklist">
      <button
        type="button"
        className="checklist-back"
        onClick={onBack}
      >
        ← BACK TO WORLDS
      </button>

      <div className="checklist-header">
        <img
          src={capybaraChecklist}
          alt="Happy capybara holding a checklist and pencil"
          className="checklist-capybara-image"
        />

        <div>
          <h2>WORLD {world}</h2>
          <p>Your adventure checklist!</p>
        </div>
      </div>

      <div className="checklist-items">
        {levels.map((level) => {
          const unlocked = isLevelUnlocked(
            progress,
            world,
            level.id,
          )

          const stars = getLevelStars(
            progress,
            world,
            level.id,
          )

          const completed = stars > 0

          return (
            <button
              key={level.id}
              type="button"
              className={`checklist-item ${
                !unlocked ? 'checklist-item-locked' : ''
              }`}
              disabled={!unlocked}
              onClick={() => onSelectLevel(level.id)}
            >
              <span className="checklist-box">
                {!unlocked
                  ? '🔒'
                  : completed
                    ? '☑'
                    : '□'}
              </span>

              <span className="checklist-level-info">
                <span className="checklist-level-number">
                  LEVEL {level.id}
                </span>

                <span className="checklist-level-name">
                  {level.name}
                </span>

                <span className="checklist-level-stars">
                  {completed
                    ? '★'.repeat(stars) +
                      '☆'.repeat(3 - stars)
                    : unlocked
                      ? 'READY TO PLAY'
                      : 'LOCKED'}
                </span>
              </span>

              <span className="checklist-arrow">
                {!unlocked
                  ? '🔒'
                  : completed
                    ? '↻'
                    : '→'}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
