"use client";
import { useState } from "react";
import ImageUploader from "./ImageUpload";
import IngredientRecognition from "./IngredientRecognition";
import ImageCreator from "./ImageCreator";
import ChatAssistant from "./ChatAssistant"; // шинэ tab

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("image");

  const tabClass = (name) =>
    `px-3 py-1 text-sm rounded ${
      activeTab === name
        ? "bg-gray-200 text-gray-900"
        : "text-gray-400 hover:text-gray-600"
    }`;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex gap-2">
        <button
          className={tabClass("image")}
          onClick={() => setActiveTab("image")}
        >
          Image analysis
        </button>
        <button
          className={tabClass("ingredient")}
          onClick={() => setActiveTab("ingredient")}
        >
          Ingredient recognition
        </button>
        <button
          className={tabClass("creator")}
          onClick={() => setActiveTab("creator")}
        >
          Image creator
        </button>
        <button
          className={tabClass("chat")}
          onClick={() => setActiveTab("chat")}
        >
          Chat Assistant
        </button>
      </div>

      <div className="flex justify-center w-full">
        {activeTab === "image" && <ImageUploader />}
        {activeTab === "ingredient" && <IngredientRecognition />}
        {activeTab === "creator" && <ImageCreator />}
        {activeTab === "chat" && <ChatAssistant />}
      </div>
    </div>
  );
}
