/* =====================================================
   WIRELAB — ELECTRICAL QUANTITIES & OHM'S LAW
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "wirelabCompletedUnits";
    const CURRENT_UNIT = "02";

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
            completeButton.textContent = "UNIT COMPLETED";

        } else {

            completeButton.classList.remove("completed");
            completeButton.textContent = "COMPLETE UNIT";
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


            /* -------------------------------------------------
               SAVE PROGRESS
            ------------------------------------------------- */

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(completedUnits)
            );


            /* -------------------------------------------------
               UPDATE BUTTON
            ------------------------------------------------- */

            updateButton();

        });
    }

});