import './FillButton.css'

type FillButtonProps = {
  isWaiting: boolean
  isFilling: boolean
  isInertiaActive: boolean
  isEvaporating: boolean
  onToggleFilling: () => void
  onRetry: () => void
}

export function FillButton({
  isWaiting,
  isFilling,
  isInertiaActive,
  isEvaporating,
  onToggleFilling,
  onRetry,
}: FillButtonProps) {
  const disabled =
    isWaiting && (isInertiaActive || isEvaporating)

  const label = !isWaiting
    ? 'TRY AGAIN'
    : isInertiaActive
      ? 'WATER STILL FLOWING...'
      : isEvaporating
        ? 'EVAPORATING...'
        : isFilling
          ? 'STOP FILLING'
          : 'START FILLING'

  return (
    <button
      className="fill-button"
      type="button"
      disabled={disabled}
      onClick={isWaiting ? onToggleFilling : onRetry}
    >
      {label}
    </button>
  )
}