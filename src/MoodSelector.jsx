import React from "react";

const moods = [
  { value: "happy", icon: "😊" },
  { value: "sad", icon: "😢" },
  { value: "angry", icon: "😠" },
  { value: "excited", icon: "🤩" },
  { value: "calm", icon: "😌" },
];

export const MoodSelector = ({ selectedMood, onMoodSelect }) => (
  <div className="mood-selector">
    {moods.map((m) => (
      <span
        key={m.value}
        className={selectedMood === m.value ? "selected" : ""}
        onClick={() => onMoodSelect(m.value)}
      >
        {m.icon}
      </span>
    ))}
  </div>
);
