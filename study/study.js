/* =====================================================
   WIRELAB — study PROGRESS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "wirelabCompletedUnits";


    /* -------------------------------------------------
       LOAD COMPLETED UNITS
    ------------------------------------------------- */

    let completedUnits = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );


    /* -------------------------------------------------
       NORMALIZE UNIT NUMBERS
       Allows 01 and 1 to match
    ------------------------------------------------- */

    function normalizeUnit(unit) {
        return String(unit).replace(/^0+/, "") || "0";
    }


    /* -------------------------------------------------
       study UNIT CARDS
    ------------------------------------------------- */

    const unitCards =
        document.querySelectorAll(".study-unit");

    let completedCount = 0;


    unitCards.forEach(card => {

        const unitNumber = normalizeUnit(
            card.dataset.unit
        );

        const status =
            card.querySelector(".study-unit-status");


        const isCompleted =
            completedUnits.some(
                unit =>
                    normalizeUnit(unit) === unitNumber
            );


        /* -------------------------------------------------
           ELECTRICAL SAFETY — SECTION
        ------------------------------------------------- */

        if (unitNumber === "0") {

            if (isCompleted) {

                card.classList.add("completed");

                if (status) {
                    status.textContent =
                        "SECTION COMPLETED";
                }

            } else {

                card.classList.remove("completed");

                if (status) {
                    status.textContent =
                        "SAFETY OVERVIEW";
                }
            }

            return;
        }


        /* -------------------------------------------------
           NORMAL study UNITS
        ------------------------------------------------- */

        if (isCompleted) {

            completedCount++;

            card.classList.add("completed");

            if (status) {
                status.textContent =
                    "UNIT COMPLETED";
            }

        } else {

            card.classList.remove("completed");

            if (status) {
                status.textContent =
                    "START UNIT";
            }
        }
    });


    /* -------------------------------------------------
       COURSE UNITS
       Unit 00 is excluded from progress
    ------------------------------------------------- */

    const courseUnits =
        document.querySelectorAll(
            ".study-unit:not(.safety-reference)"
        );

    const totalUnits = courseUnits.length;


    /* -------------------------------------------------
       CALCULATE PROGRESS
    ------------------------------------------------- */

    const percent = totalUnits > 0
        ? Math.round(
            (completedCount / totalUnits) * 100
        )
        : 0;


    /* -------------------------------------------------
       PROGRESS BAR
    ------------------------------------------------- */

    const progressFill =
        document.getElementById("progressFill");

    if (progressFill) {
        progressFill.style.width =
            `${percent}%`;
    }


    /* -------------------------------------------------
       PROGRESS PERCENTAGE
    ------------------------------------------------- */

    const progressPercent =
        document.getElementById("progressPercent");

    if (progressPercent) {
        progressPercent.textContent =
            `${percent}%`;
    }


    /* -------------------------------------------------
       COMPLETED COUNT
    ------------------------------------------------- */

    const completedCountDisplay =
        document.getElementById("completedCount");

    if (completedCountDisplay) {
        completedCountDisplay.textContent =
            `${completedCount} of ${totalUnits} units completed`;
    }










    /* -------------------------------------------------
       REMEMBER study PAGE POSITION
    ------------------------------------------------- */

    const study_SCROLL_KEY = "wirelabstudyScrollPosition";


    /* Save position when leaving study */

    window.addEventListener("beforeunload", () => {

        sessionStorage.setItem(
            study_SCROLL_KEY,
            window.scrollY
        );

    });


    /* Restore position when returning to study */

    const savedScrollPosition =
        sessionStorage.getItem(study_SCROLL_KEY);

    if (savedScrollPosition !== null) {

        window.requestAnimationFrame(() => {

            window.scrollTo(
                0,
                Number(savedScrollPosition)
            );

        });

    }
    

});