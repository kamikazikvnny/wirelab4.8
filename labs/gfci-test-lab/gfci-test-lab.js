document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "wirelabCompletedLabs";
    const LAB_ID = "gfci-branch";

    const steps = [
        {
            label: "LINE VS LOAD",
            title: "Where does the panel feed land?",
            prompt: "Incoming hot, neutral, and ground from the breaker must land on the GFCI LINE terminals. LOAD is reserved for devices that should be protected.",
            highlight: "line",
            choices: [
                {
                    text: "Connect the panel feed to the LINE terminals.",
                    correct: true,
                    why: "LINE is the source. The GFCI monitors current leaving and returning through the LINE side."
                },
                {
                    text: "Connect the panel feed to the LOAD terminals so everything is protected first.",
                    correct: false,
                    why: "Feeding LOAD first leaves the GFCI unpowered or wired backwards. Source always goes to LINE."
                }
            ]
        },
        {
            label: "DOWNSTREAM PROTECTION",
            title: "How is the second receptacle protected?",
            prompt: "You want the garage receptacle to trip the bathroom GFCI if a ground fault occurs.",
            highlight: "load",
            choices: [
                {
                    text: "Feed the downstream receptacle from the GFCI LOAD terminals.",
                    correct: true,
                    why: "Anything on LOAD is in the GFCI protection zone. A fault there should trip TEST/RESET on the GFCI."
                },
                {
                    text: "Pigtail the downstream receptacle onto LINE with the panel feed.",
                    correct: false,
                    why: "LINE-side devices are not GFCI-protected. That garage receptacle would stay live during a downstream fault."
                }
            ]
        },
        {
            label: "SWITCHED LIGHT",
            title: "Where does the light circuit start?",
            prompt: "A single-pole switch will control a light that should also be GFCI protected.",
            highlight: "load",
            choices: [
                {
                    text: "Take a protected hot from the LOAD side, send it to the switch, then to the light.",
                    correct: true,
                    why: "The switched light stays in the protection zone if its hot originates on LOAD."
                },
                {
                    text: "Take an unprotected hot from the breaker and switch it independently.",
                    correct: false,
                    why: "That light would not be GFCI-protected, which breaks the lab objective."
                }
            ]
        },
        {
            label: "NEUTRAL RULE",
            title: "Can the downstream devices share a random neutral?",
            prompt: "The GFCI compares current on the hot and the neutral associated with that device.",
            highlight: "load",
            choices: [
                {
                    text: "Keep LOAD hot and LOAD neutral together as a pair for downstream devices.",
                    correct: true,
                    why: "Mixing neutrals with another circuit creates a current imbalance and nuisance trips, or leaves a fault undetected."
                },
                {
                    text: "Borrow a nearby lighting neutral to save a conductor.",
                    correct: false,
                    why: "A borrowed neutral is a classic GFCI trip cause and a code problem."
                }
            ]
        },
        {
            label: "TEST",
            title: "What proves the lab is wired correctly?",
            prompt: "After energizing, you need a field check that the protection zone actually works.",
            highlight: "line",
            choices: [
                {
                    text: "Press TEST on the GFCI, confirm it trips, then verify the downstream receptacle and light go dead.",
                    correct: true,
                    why: "TEST injects a simulated ground fault. Downstream LOAD devices should lose power until RESET."
                },
                {
                    text: "If the GFCI receptacle itself has power, the downstream devices are automatically protected.",
                    correct: false,
                    why: "Power at the GFCI only proves LINE is hot. LOAD protection has to be verified."
                }
            ]
        }
    ];

    let current = 0;
    let answered = false;

    const stepNumber = document.getElementById("stepNumber");
    const fill = document.getElementById("labProgressFill");
    const label = document.getElementById("stepLabel");
    const title = document.getElementById("stepTitle");
    const prompt = document.getElementById("stepPrompt");
    const choiceList = document.getElementById("choiceList");
    const feedback = document.getElementById("stepFeedback");
    const nextButton = document.getElementById("nextStep");
    const completeButton = document.getElementById("completeLab");
    const lineTerm = document.querySelector(".term.line");
    const loadTerm = document.querySelector(".term.load");

    function render() {
        const step = steps[current];
        answered = false;
        stepNumber.textContent = String(current + 1);
        fill.style.width = ((current + 1) / steps.length) * 100 + "%";
        label.textContent = step.label;
        title.textContent = step.title;
        prompt.textContent = step.prompt;
        feedback.hidden = true;
        nextButton.hidden = true;
        completeButton.hidden = true;
        choiceList.innerHTML = "";

        lineTerm.classList.toggle("active", step.highlight === "line");
        loadTerm.classList.toggle("active", step.highlight === "load");

        step.choices.forEach((choice) => {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = choice.text;
            button.addEventListener("click", () => {
                if (answered && choice.correct === false) return;
                feedback.hidden = false;
                feedback.textContent = choice.why;
                feedback.classList.toggle("correct", choice.correct);
                button.classList.add("selected");
                if (choice.correct) {
                    answered = true;
                    Array.from(choiceList.querySelectorAll("button")).forEach((el) => {
                        el.disabled = true;
                    });
                    if (current < steps.length - 1) {
                        nextButton.hidden = false;
                    } else {
                        completeButton.hidden = false;
                    }
                }
            });
            choiceList.appendChild(button);
        });
    }

    nextButton.addEventListener("click", () => {
        current += 1;
        render();
    });

    completeButton.addEventListener("click", () => {
        const completed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        if (!completed.includes(LAB_ID)) {
            completed.push(LAB_ID);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
        }
        window.location.href = "../labs.html";
    });

    render();
});
