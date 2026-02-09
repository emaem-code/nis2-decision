// quiz.js — moteur du quiz NIS2 (V2 – formulation professionnelle)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nis2-quiz");
  const resultBox = document.getElementById("quiz-result");
  const resultTitle = document.getElementById("result-title");
  const resultText = document.getElementById("result-text");

  if (!form || !resultBox || !resultTitle || !resultText) {
    console.error("Quiz NIS2: éléments HTML introuvables.");
    return;
  }

  // Variable globale pour l’envoi email
  window.nis2Result = "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Feedback immédiat
    resultBox.style.display = "block";
    resultTitle.textContent = "Analyse de votre situation réglementaire…";
    resultText.textContent = "Évaluation en cours sur la base des critères NIS2.";

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

    let title = "";
    let text = "";

    if (score >= 6) {
      title = "Exposition élevée à la directive NIS2";
      text =
        "Au vu des éléments déclarés, votre organisation présente des caractéristiques compatibles avec une Entité Importante au sens de la directive NIS2.\n\n" +
        "Cela implique des obligations renforcées en matière de cybersécurité, de gouvernance et de gestion des incidents, avec une responsabilité directe du dirigeant.\n\n" +
        "Une analyse approfondie de votre périmètre, de vos dépendances numériques et de votre rôle dans la chaîne d’approvisionnement est fortement recommandée.";

    } else if (score >= 3) {
      title = "Exposition potentielle à la directive NIS2";
      text =
        "Les informations fournies indiquent une exposition intermédiaire à la directive NIS2.\n\n" +
        "Votre entreprise pourrait entrer dans le champ d’application en fonction de critères complémentaires (clients, contrats, rôle opérationnel, dépendance IT).\n\n" +
        "Une qualification réglementaire formelle est recommandée afin de sécuriser votre position.";

    } else {
      title = "Exposition limitée à la directive NIS2";
      text =
        "D’après les éléments déclarés, votre organisation semble actuellement hors du périmètre direct de la directive NIS2.\n\n" +
        "Toutefois, certaines évolutions (croissance, nouveaux clients, exigences contractuelles) peuvent modifier cette situation.\n\n" +
        "Une veille minimale et une sensibilisation du dirigeant restent recommandées.";
    }

    setTimeout(() => {
      resultTitle.textContent = title;
      resultText.textContent = text;

      // Résultat stocké pour l’email
      window.nis2Result = `${title} — ${text.replace(/\n\n/g, " ")}`;

      resultBox.scrollIntoView({ behavior: "smooth" });

      // Gestion des CTA
      const nextSteps = document.getElementById("next-steps");
      const ctaComparatif = document.querySelector(
        '#quiz-result a[href="#comparatif"]'
      );

      if (nextSteps) {
        nextSteps.style.display = score >= 3 ? "block" : "none";
      }

      if (ctaComparatif) {
        ctaComparatif.style.display = score >= 3 ? "inline-block" : "none";
      }
    }, 700);
  });
});
