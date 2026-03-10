"use client";
import { useState } from "react";
import ImageUploader from "./ImageUpload";
import IngredientRecognition from "./IngredientRecognition";
import ImageCreator from "./ImageCreator";
import ChatAssistant from "./ChatAssistant";

const tabs = [
  { id: "image", label: "Image Analysis", component: <ImageUploader /> },
  {
    id: "ingredient",
    label: "Ingredients",
    component: <IngredientRecognition />,
  },
  { id: "creator", label: "Image Creator", component: <ImageCreator /> },
  { id: "chat", label: "Chat", component: <ChatAssistant /> },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("image");
  const activeItem = tabs.find((item) => item.id === activeTab) || tabs[0];

  return (
    <div className="tabs-shell">
      <div className="segmented-control" role="tablist" aria-label="AI tools">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`segment-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="feature-stage">{activeItem.component}</div>
    </div>
  );
}
