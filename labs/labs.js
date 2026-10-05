document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "wirelabCompletedLabs";
    const TOTAL_LABS = document.querySelectorAll(
        ".lab-card-button:not([disabled])"
    ).length;

    const completedLabs = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const percent = TOTAL_LABS > 0
        ? Math.round((completedLabs.length / TOTAL_LABS) * 100)
        : 0;

    const fill = document.getElementById("progressFill");
    const label = document.getElementById("labsProgressPercent");

    if (fill) {
        fill.style.width = percent + "%";
    }

    if (label) {
        label.textContent = percent + "%";
    }
});
