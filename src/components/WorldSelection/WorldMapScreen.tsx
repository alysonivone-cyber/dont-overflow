import { WorldSelection } from './WorldSelection'
import { LevelChecklist } from './LevelChecklist'
import { levels } from '../../game/levels'
import { isWorldUnlocked, isLevelUnlocked, loadPlayerProgress } from '../../game/playerProgress'

type Props = {
  progress: ReturnType<typeof loadPlayerProgress>
  selectedWorld: number | null
  onSelectWorld: (world: number | null) => void
  onBackToWelcome: () => void
  onSelectLevel: (levelIndex: number) => void
}

/** The map and level checklist share one navigation screen. */
export default function WorldMapScreen({
  progress,
  selectedWorld,
  onSelectWorld,
  onBackToWelcome,
  onSelectLevel,
}: Props) {
  return (
    <main className="app">
      {selectedWorld === null ? (
        <WorldSelection
          onBack={onBackToWelcome}
          progress={progress}
          onSelectWorld={(world) => {
            if (!isWorldUnlocked(progress, world)) return
            onSelectWorld(world)
          }}
        />
      ) : (
        <LevelChecklist
          world={selectedWorld}
          progress={progress}
          levels={levels
            .filter((level) => level.world === selectedWorld)
            .map((level) => ({ id: level.id, name: level.name }))}
          onBack={() => onSelectWorld(null)}
          onSelectLevel={(levelId) => {
            const targetIndex = levels.findIndex(
              (level) => level.world === selectedWorld && level.id === levelId,
            )
            if (targetIndex === -1) return
            if (!isLevelUnlocked(progress, selectedWorld, levelId)) return
            onSelectLevel(targetIndex)
          }}
        />
      )}
    </main>
  )
}
