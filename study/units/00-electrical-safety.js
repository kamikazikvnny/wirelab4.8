/* =====================================================
   WIRELAB — ELECTRICAL SAFETY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "wirelabCompletedUnits";
    const CURRENT_UNIT = "00";

    const completeButton =
        document.getElementById("completeUnit");


    /* -------------------------------------------------
       LOAD COMPLETED UNITS
    ------------------------------------------------- */

    let completedUnits = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );


    /* -------------------------------------------------
       UPDATE BUTTON
    ------------------------------------------------- */

    function updateButton() {

        if (!completeButton) return;

        if (completedUnits.includes(CURRENT_UNIT)) {

            completeButton.classList.add("completed");
            completeButton.textContent = "SECTION COMPLETED";

        } else {

            completeButton.classList.remove("completed");
            completeButton.textContent = "COMPLETE SECTION";
        }
    }


    /* -------------------------------------------------
       INITIAL BUTTON STATE
    ------------------------------------------------- */

    updateButton();


    /* -------------------------------------------------
       COMPLETE / UNCOMPLETE UNIT
    ------------------------------------------------- */

    if (completeButton) {

        completeButton.addEventListener("click", () => {

            const completed =
                completedUnits.includes(CURRENT_UNIT);


            if (completed) {

                completedUnits = completedUnits.filter(
                    unit => unit !== CURRENT_UNIT
                );

            } else {

                completedUnits.push(CURRENT_UNIT);
            }


            /* Save progress */

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(completedUnits)
            );


            /* Update button */

            updateButton();

        });
    }

});