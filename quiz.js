// quiz.js — NIS2 Decision (V1) : scoring simple, lisible, améliorable
(() => {
  const form = document.getElementById("nis2-quiz");
  const resultBox = document.getElementById("quiz-result");
  const resultTitle = document.getElementById("result-title");
  const resultText = document.getElementById("result-text");

  if (!form || !resultBox) return;

  const scoreStatus = (answers) => {
    // Scoring volontairement conservateur (V1). On affinera ensuite avec ton arbre NIS2.
    let score = 0;

    // Secteur
    if (answers.sector === "it") score += 2;
    if (answers.sector === "health") score += 2;
    if (answers.sector === "industry") score += 1;

    // Taille
    if (answers.size === "50_250") score += 1;
    if (answers.size === "250plus") score += 2;

    // Rôle supply chain
    if (answers.supply === "critical") score += 2;
    if (answers.supply === "supplier") score += 1;

    // Dépendance numérique
    if (answers.digital === "high") score += 2;
    if (answers.digital === "medium") score += 1;

    // Seuils simples
    if (score >= 6) return { level: "Élevée", status: "Probablement concerné (Entité Importante)", score };
    if (score >= 3) return { level: "Modérée", status: "Possiblement concerné (à confirmer)", score };
    return { level: "Faible", status: "Plutôt hors périmètre (à confirmer)", score };
  };

  const render = ({ level, status, score }) => {
    resultBox.style.display = "block";
    resultTitle.textContent = `Exposition ${level} — ${status}`;
    resultText.textContent =
      `Score indicatif: ${score}/8. Ceci n’est pas un avis juridique. ` +
      `Pour un résultat exploitable, fais le diagnostic complet (6 questions) et génère un rapport.`;
    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const answers = {
      sector: String(data.get("sector") || ""),
      size: String(data.get("size") || ""),
      supply: String(data.get("supply") || ""),
      digital: String(data.get("digital") || "")
    };

    const outcome = scoreStatus(answers);
    render(outcome);
  });
})();
