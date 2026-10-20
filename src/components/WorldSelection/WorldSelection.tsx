
import './WorldSelection.css'
import capybaraGlobe from '../../assets/capybaras/capybara-globe.png'
import {
  getWorldStars,
  isWorldUnlocked,
} from '../../game/playerProgress'
import type { PlayerProgress } from '../../game/playerProgress'

type WorldSelectionProps = {
  onSelectWorld: (world: number) => void
  onBack: () => void
  progress: PlayerProgress
}

const worlds = [
  { id: 1, name: 'Basics', icon: '💧', color: '#E1F2FF' },
  { id: 2, name: 'Reserve', icon: '☁️', color: '#FBE2EF' },
  { id: 3, name: 'Timer', icon: '⏱️', color: '#FFF0CE' },
  { id: 4, name: 'Inertia', icon: '🌊', color: '#E6E1FF' },
  { id: 5, name: 'Heat', icon: '🌡️', color: '#FFE1D9' },
  { id: 6, name: 'Obstacles', icon: '🧱', color: '#DFF2E8' },
  { id: 7, name: 'Motion', icon: '↔️', color: '#DFF2F8' },
  { id: 8, name: 'Frogs', icon: '🐸', color: '#E5F5D6' },
  { id: 9, name: 'Mystery', icon: '✨', color: '#F7E3F6' },
  { id: 10, name: 'Challenge', icon: '⚡', color: '#FFF0DC' },
  { id: 11, name: 'Warriors', icon: '⚔️', color: '#F7DCDC' },
  { id: 12, name: 'Survivors', icon: '🛡️', color: '#DFE7FA' },
  { id: 13, name: 'Mud', icon: '🟤', color: '#EFE4D6' },
  { id: 14, name: 'Chaos', icon: '🌪️', color: '#E5E0F8' },
  { id: 15, name: 'Final', icon: '👑', color: '#FBEBCB' },
]

export function WorldSelection({
  onSelectWorld,
  onBack,
  progress,
}: WorldSelectionProps) {
  return (
    <section className="world-selection">
      <button
        type="button"
        className="world-back-button"
        onClick={onBack}
      >
        ← BACK
      </button>
      <div className="world-selection-header">
        <div className="world-capybara">
          <img
            src={capybaraGlobe}
            alt="Happy capybara hugging a globe"
            className="world-capybara-image"
          />
        </div>

        <div className="world-capybara-message">
          <h2>CHOOSE YOUR WORLD</h2>
          <p>⭐ Your adventure starts here!</p>
        </div>
      </div>

      <div className="world-selection-grid">
        {worlds.map((world) => {
          const unlocked = isWorldUnlocked(
            progress,
            world.id,
          )
          const stars = getWorldStars(progress, world.id)

          return (
            <button
              key={world.id}
              type="button"
              className={`world-selection-card ${
                !unlocked ? 'world-card-locked' : ''
              }`}
              style={{ backgroundColor: world.color }}
              disabled={!unlocked}
              onClick={() => onSelectWorld(world.id)}
            >
              <span className="world-selection-icon">
                {unlocked ? world.icon : '🔒'}
              </span>

              <span className="world-selection-number">
                WORLD {world.id}
              </span>

              <span className="world-selection-name">
                {world.name}
              </span>

              <span className="world-selection-stars">
                {unlocked
                  ? `⭐ ${stars} / 15`
                  : 'LOCKED'}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
