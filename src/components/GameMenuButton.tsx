type Props = {
  onReturnToWorlds: () => void
}

/** Navigation control shown during gameplay. */
export default function GameMenuButton({ onReturnToWorlds }: Props) {
  return (
    <button type="button" className="player-menu-button" onClick={onReturnToWorlds}>
      ☰ MENU
    </button>
  )
}
