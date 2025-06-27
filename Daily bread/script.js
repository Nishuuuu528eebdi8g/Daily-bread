async function getVerseByEmotion() {
  const emotion = document.getElementById("emotion-select").value;
  if (!emotion) {
    alert("Please select an emotion.");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  const storageKey = `verse_${emotion}_${today}`;
  const cachedVerse = localStorage.getItem(storageKey);

  if (cachedVerse) {
    displayVerse(cachedVerse);
    return;
  }

  try {
    const response = await fetch("/.netlify/functions/getVerse", {
      method: "POST",
      body: JSON.stringify({ emotion })
    });
    const data = await response.json();

    if (data.verse) {
      localStorage.setItem(storageKey, data.verse);
      displayVerse(data.verse);
    } else {
      displayVerse("No verse returned.");
    }
  } catch (error) {
    console.error("Error:", error);
    displayVerse("Something went wrong.");
  }
}

function displayVerse(text) {
  document.getElementById("verse-text").textContent = text;
  document.getElementById("verse-reference").textContent = "";
}
