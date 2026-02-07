// quiz.js — moteur du quiz NIS2 (V1)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nis2-quiz");
  const resultBox = document.getElementById("quiz-result");
  const resultTitle = document.getElementById("result-title");
  const resultText = document.getElementById("result-text");

  if (!form) {
    console.error("Formulaire NIS2 introuvable");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Feedback immédiat (preuve que le JS fonctionne)
    resultBox.style.display = "block";
    resultTitle.textContent = "Analyse en cours…";
    resultText.textContent = "Veuillez patienter.";

    const data = new FormData(form);

    let score = 0;

    if (data.get("sector") === "it" || data.get("sector") === "health") score += 2;
    if (data.get("sector") === "industry") score += 1;

    if (data.get("size") === "50_250") score += 1;
    if (data.get("size") === "250plus") score += 2;

    if (data.get("supply") === "supplier") score += 1;
    if (data.get("supply") === "critical") score += 2;

    if (data.get("digital") === "medium") score += 1;
    if (data.get("digital") === "high") score += 2;

    let level, status;

    if (score >= 6) {
      level = "Élevée";
      status = "Probablement concerné (Entité Importante)";
    } else if (score >= 3) {
      level = "Modérée";
      status = "Possiblement concerné (à confirmer)";
    } else {
      level = "Faible";
      status = "Plutôt hors périmètre (à confirmer)";
    }

    setTimeout(() => {
      resultTitle.textContent = `Exposition ${level}`;
      resultText.textContent =
        `${status}. Score indicatif : ${score}/8. Ceci n’est pas un avis juridique.`;
      resultBox.scrollIntoView({ behavior: "smooth" });
    }, 700);
  });
});
