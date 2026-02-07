// quiz.js — moteur du quiz NIS2 (V1)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nis2-quiz");
  const resultBox = document.getElementById("quiz-result");
  const resultTitle = document.getElementById("result-title");
  const resultText = document.getElementById("result-text");

  if (!form || !resultBox || !resultTitle || !resultText) {
    console.error("Quiz NIS2: éléments HTML introuvables (form/result).");
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

    // Secteur
    const sector = String(data.get("sector") || "");
    if (sector === "it" || sector === "health") score += 2;
    if (sector === "industry") score += 1;

    // Taille
    const size = String(data.get("size") || "");
    if (size === "50_250") score += 1;
    if (size === "250plus") score += 2;

    // Supply chain
    const supply = String(data.get("supply") || "");
    if (supply === "supplier") score += 1;
    if (supply === "critical") score += 2;

    // Dépendance numérique
    const digital = String(data.get("digital") || "");
    if (digital === "medium") score += 1;
    if (digital === "high") score += 2;

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
      // Résultat
      resultTitle.textContent = `Exposition ${level}`;
      resultText.textContent =
        `${status}. Score indicatif : ${score}/8. Ceci n’est pas un avis juridique.`;

      // Scroll vers résultat
      resultBox.scrollIntoView({ behavior: "smooth" });

      // Affichage conditionnel du bloc next-steps + CTA
      const nextSteps = document.getElementById("next-steps");
      const ctaComparatif = document.querySelector('#quiz-result a[href="#comparatif"]');

      if (nextSteps) {
        nextSteps.style.display = "none";

        if (score >= 3) {
          nextSteps.style.display = "block";
          if (ctaComparatif) ctaComparatif.style.display = "inline-block";
        } else {
          if (ctaComparatif) ctaComparatif.style.display = "none";
        }
      }
    }, 700);
  });
});
