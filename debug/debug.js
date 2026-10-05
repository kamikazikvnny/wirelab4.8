document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "wirelabCompletedDebug";

    const scenarios = {
        "no-power": {
            icon: "⚡",
            title: "NO POWER",
            story: "A bedroom receptacle has no power. The breaker is on. The neighboring receptacle on the same wall works. A tester at the dead receptacle shows 0 V hot-to-neutral and 0 V hot-to-ground.",
            choices: [
                {
                    text: "The receptacle is simply worn out and should be replaced first.",
                    correct: false,
                    why: "A worn device can fail, but 0 V on both readings points to a lost hot feed before the device."
                },
                {
                    text: "An open hot in the daisy-chain feed, often at the last working receptacle.",
                    correct: true,
                    why: "When one receptacle is dead and the next one upstream still works, the most likely fault is an open hot at a wirenut, backstab, or feed-through terminal."
                },
                {
                    text: "The grounding conductor is missing, so the circuit cannot operate.",
                    correct: false,
                    why: "Ground is a safety path. A 120 V receptacle can still operate without an equipment ground."
                }
            ]
        },
        "faulty-circuit": {
            icon: "◉",
            title: "FAULTY CIRCUIT",
            story: "A GFCI in the bathroom trips as soon as a downstream garage receptacle is used. Resetting the GFCI restores the bathroom, but plugging a tool into the garage trips it again.",
            choices: [
                {
                    text: "The garage receptacle is on the LOAD terminals and has a ground-fault or damaged cord.",
                    correct: true,
                    why: "A GFCI protects everything on its LOAD side. A downstream fault will trip the GFCI even if the bathroom device itself is fine."
                },
                {
                    text: "The bathroom lights are wired to LINE and should be moved to LOAD.",
                    correct: false,
                    why: "Lights on LINE would not explain a trip caused only when the garage receptacle is used."
                },
                {
                    text: "The breaker is too small for the tool and should be upsized.",
                    correct: false,
                    why: "A GFCI trip is a ground-fault response, not an overload. Upsizing a breaker is not the troubleshooting step."
                }
            ]
        },
        "safety-fault": {
            icon: "⚠",
            title: "SAFETY FAULT",
            story: "A new receptacle is installed. It powers a lamp, but a plug-in tester shows reverse polarity and the metal box is bonded to the white conductor.",
            choices: [
                {
                    text: "Hot and neutral are swapped, and the white is incorrectly used as a ground.",
                    correct: true,
                    why: "Reverse polarity plus a white on the box is a dangerous miswire. Neutral is not an equipment ground."
                },
                {
                    text: "The circuit is ungrounded but still correctly wired for a two-wire system.",
                    correct: false,
                    why: "A two-wire circuit would not put the white on the box or show reverse polarity as a correct result."
                },
                {
                    text: "The tester is defective because the lamp still lights.",
                    correct: false,
                    why: "A lamp can light with reversed polarity. Lighting is not proof that the wiring is safe."
                }
            ]
        }
    };

    const categories = document.querySelector(".debug-categories");
    const panel = document.getElementById("debug-scenario");
    const title = document.getElementById("scenario-title");
    const story = document.getElementById("scenario-story");
    const icon = document.getElementById("scenario-icon");
    const choicesEl = document.getElementById("scenario-choices");
    const feedback = document.getElementById("scenario-feedback");
    const backButton = document.getElementById("scenario-back");

    function loadCompleted() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    }

    function saveCompleted(id) {
        const completed = loadCompleted();
        if (!completed.includes(id)) {
            completed.push(id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
        }
    }

    function openScenario(id) {
        const scenario = scenarios[id];
        if (!scenario || !panel) return;

        title.textContent = scenario.title;
        story.textContent = scenario.story;
        icon.textContent = scenario.icon;
        feedback.hidden = true;
        feedback.textContent = "";
        choicesEl.innerHTML = "";

        scenario.choices.forEach((choice) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "scenario-choice";
            button.textContent = choice.text;
            button.addEventListener("click", () => {
                feedback.hidden = false;
                feedback.textContent = choice.why;
                feedback.classList.toggle("correct", choice.correct);
                feedback.classList.toggle("incorrect", !choice.correct);
                if (choice.correct) {
                    saveCompleted(id);
                }
            });
            choicesEl.appendChild(button);
        });

        categories.hidden = true;
        panel.hidden = false;
    }

    document.querySelectorAll("[data-scenario]").forEach((button) => {
        button.addEventListener("click", () => {
            openScenario(button.dataset.scenario);
        });
    });

    if (backButton) {
        backButton.addEventListener("click", () => {
            panel.hidden = true;
            categories.hidden = false;
        });
    }
});
