import Tabs from "@/components/Tabs";

export default function Home() {
  return (
    <main className="app-shell">
      <div className="app-panel">
        <div className="hero-copy">
          <span className="eyebrow">AI Food Studio</span>
          <h1 className="hero-title">
            Clean tools for food prompts, ingredients, and image analysis.
          </h1>
          <p className="hero-description">
            A minimal workspace for testing the flows quickly without jumping
            between separate screens.
          </p>
        </div>
        <Tabs />
      </div>
    </main>
  );
}
