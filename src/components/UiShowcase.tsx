import { ReservePanel } from './UI/ReservePanel'
import './UiShowcase.css'

export default function UiShowcase() {
  return (
    <main className="ui-showcase">
      <header className="ui-showcase-header">
        <a className="ui-showcase-back" href="/">
          ← Retour au jeu
        </a>
        <p className="ui-showcase-eyebrow">DON'T OVERFLOW! · UI</p>
        <h1 className="ui-showcase-title">UiShowcase</h1>
        <p className="ui-showcase-description">
          Aperçu des composants d’interface du jeu.
        </p>
      </header>

      <section className="ui-showcase-component" aria-labelledby="reserve-panel-title">
        <div className="ui-showcase-component-heading">
          <div>
            <p className="ui-showcase-component-category">COMPOSANT</p>
            <h2 id="reserve-panel-title">ReservePanel</h2>
          </div>
          <code>UI / ReservePanel</code>
        </div>

        <div className="ui-showcase-preview">
          <ReservePanel reservePercentage={72} displayedReserve={72} />
          <ReservePanel reservePercentage={10} displayedReserve={10} />
          <ReservePanel reservePercentage={1} displayedReserve={1} />
          <ReservePanel reservePercentage={-100} displayedReserve={-100} />
        </div>

        <p className="ui-showcase-component-description">
          Indique la quantité d’eau encore disponible dans la réserve.
        </p>
      </section>
    </main>
  )
}
