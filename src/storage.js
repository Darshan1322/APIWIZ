export const saveEntry = (entry) => {
  const entries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
  entries.push(entry);
  localStorage.setItem("moodEntries", JSON.stringify(entries));
};

export const getEntries = () => {
  return JSON.parse(localStorage.getItem("moodEntries") || "[]");
};
