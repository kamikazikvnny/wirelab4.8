document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "wirelabCompletedUnits";
    const TOTAL_UNITS = 36;
    const countEl = document.getElementById("homeProgressCount");

    if (!countEl) return;

    function normalizeUnit(unit) {
        return String(unit).replace(/^0+/, "") || "0";
    }

    const completedUnits = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const courseCompleted = completedUnits.filter(
        (unit) => normalizeUnit(unit) !== "0"
    ).length;

    countEl.textContent = String(Math.min(courseCompleted, TOTAL_UNITS));
});
