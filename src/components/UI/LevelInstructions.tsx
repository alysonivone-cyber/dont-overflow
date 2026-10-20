
import './LevelInstructions.css'

type LevelInstructionsProps = {
  instruction: string
  tip?: string
}

export function LevelInstructions({
  instruction,
  tip,
}: LevelInstructionsProps) {
  return (
    <div className="level-instructions">
      <p className="level-instruction">
        {instruction}
      </p>
    
        {tip && (
    <div className="level-tip-card">
        <div className="level-tip-heading">
            <span aria-hidden="true">✦</span>
                <span>GAMEPLAY TIP</span>
            </div>

            <p className="level-mechanic-tip">
                {tip}
            </p>
        </div>
        )}
     </div>
    )
}   