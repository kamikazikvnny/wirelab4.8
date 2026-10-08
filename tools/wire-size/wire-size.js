/* =====================================================
   WIRELAB — WIRE SIZE CALCULATOR
===================================================== */


/* =====================================================
   DOM ELEMENTS
===================================================== */

const amperageInput =
    document.getElementById("amperage");

const voltageInput =
    document.getElementById("voltage");

const distanceInput =
    document.getElementById("distance");

const materialInput =
    document.getElementById("material");

const insulationInput =
    document.getElementById("insulation");

const calculateButton =
    document.getElementById("calculate-button");

const resultCard =
    document.getElementById("result-card");

const resultSize =
    document.getElementById("result-size");

const resultDetails =
    document.getElementById("result-details");

const message =
    document.getElementById("calculator-message");


/* =====================================================
   WIRE AMPACITY DATA
===================================================== */

const copperAmpacity = {

    "14": {
        60: 15,
        75: 20,
        90: 25
    },

    "12": {
        60: 20,
        75: 25,
        90: 30
    },

    "10": {
        60: 30,
        75: 35,
        90: 40
    },

    "8": {
        60: 40,
        75: 50,
        90: 55
    },

    "6": {
        60: 55,
        75: 65,
        90: 75
    },

    "4": {
        60: 70,
        75: 85,
        90: 95
    },

    "3": {
        60: 85,
        75: 100,
        90: 115
    },

    "2": {
        60: 95,
        75: 115,
        90: 130
    },

    "1": {
        60: 110,
        75: 130,
        90: 150
    },

    "1/0": {
        60: 125,
        75: 150,
        90: 170
    },

    "2/0": {
        60: 145,
        75: 175,
        90: 195
    },

    "3/0": {
        60: 165,
        75: 200,
        90: 225
    },

    "4/0": {
        60: 195,
        75: 230,
        90: 260
    }

};


const aluminumAmpacity = {

    "12": {
        60: 15,
        75: 20,
        90: 25
    },

    "10": {
        60: 25,
        75: 30,
        90: 35
    },

    "8": {
        60: 30,
        75: 40,
        90: 45
    },

    "6": {
        60: 40,
        75: 50,
        90: 60
    },

    "4": {
        60: 55,
        75: 65,
        90: 75
    },

    "3": {
        60: 65,
        75: 75,
        90: 85
    },

    "2": {
        60: 75,
        75: 90,
        90: 100
    },

    "1": {
        60: 85,
        75: 100,
        90: 115
    },

    "1/0": {
        60: 100,
        75: 120,
        90: 135
    },

    "2/0": {
        60: 115,
        75: 135,
        90: 150
    },

    "3/0": {
        60: 130,
        75: 155,
        90: 175
    },

    "4/0": {
        60: 150,
        75: 180,
        90: 205
    }

};


/* =====================================================
   WIRE SIZE ORDER
===================================================== */

const wireSizes = [

    "14",
    "12",
    "10",
    "8",
    "6",
    "4",
    "3",
    "2",
    "1",
    "1/0",
    "2/0",
    "3/0",
    "4/0"

];


/* =====================================================
   FIND WIRE SIZE
===================================================== */

function findWireSize(
    amperage,
    material,
    temperature
) {

    const table =
        material === "aluminum"
            ? aluminumAmpacity
            : copperAmpacity;


    for (const size of wireSizes) {

        if (!table[size]) {
            continue;
        }


        const ampacity =
            table[size][temperature];


        if (
            ampacity &&
            ampacity >= amperage
        ) {

            return {
                size,
                ampacity
            };

        }

    }


    return null;

}


/* =====================================================
   CALCULATE VOLTAGE DROP
===================================================== */

function calculateVoltageDrop(
    amperage,
    distance,
    size,
    material
) {

    /*
       Approximate circular-mil resistance values.
       Used here for educational voltage-drop estimation.
    */

    const resistance = {

        copper: {

            "14": 3.07,
            "12": 1.93,
            "10": 1.21,
            "8": 0.764,
            "6": 0.491,
            "4": 0.308,
            "3": 0.245,
            "2": 0.194,
            "1": 0.154,
            "1/0": 0.122,
            "2/0": 0.0967,
            "3/0": 0.0766,
            "4/0": 0.0608

        },

        aluminum: {

            "14": 5.05,
            "12": 3.17,
            "10": 1.99,
            "8": 1.26,
            "6": 0.808,
            "4": 0.508,
            "3": 0.403,
            "2": 0.319,
            "1": 0.253,
            "1/0": 0.202,
            "2/0": 0.160,
            "3/0": 0.127,
            "4/0": 0.101

        }

    };


    const ohmsPer1000 =
        resistance[material][size];


    if (!ohmsPer1000) {
        return null;
    }


    const totalDistance =
        distance * 2;


    return (
        amperage *
        ohmsPer1000 *
        totalDistance /
        1000
    );

}


/* =====================================================
   CALCULATE
===================================================== */

function calculateWireSize() {

    const amperage =
        Number(amperageInput.value);

    const voltage =
        Number(voltageInput.value);

    const distance =
        Number(distanceInput.value);

    const material =
        materialInput.value;

    const temperature =
        Number(insulationInput.value);


    /* -------------------------------------------------
       VALIDATION
    ------------------------------------------------- */

    if (
        !amperage ||
        amperage <= 0
    ) {

        showMessage(
            "Enter a valid amperage."
        );

        return;

    }


    if (
        distanceInput.value === "" ||
        distance < 0
    ) {

        showMessage(
            "Enter a valid distance."
        );

        return;

    }


    /* -------------------------------------------------
       FIND WIRE
    ------------------------------------------------- */

    const wire =
        findWireSize(
            amperage,
            material,
            temperature
        );


    if (!wire) {

        resultCard.hidden = true;

        showMessage(
            "The selected table does not contain a wire size large enough for this load."
        );

        return;

    }


    /* -------------------------------------------------
       VOLTAGE DROP
    ------------------------------------------------- */

    const voltageDrop =
        calculateVoltageDrop(
            amperage,
            distance,
            wire.size,
            material
        );


    const voltageDropPercent =
        voltageDrop !== null
            ? (voltageDrop / voltage) * 100
            : null;


    /* -------------------------------------------------
       DISPLAY
    ------------------------------------------------- */

    resultSize.textContent =
        `${wire.size} AWG`;

    resultDetails.innerHTML = `

        ${material === "copper"
            ? "Copper"
            : "Aluminum"
        }

        ·

        ${wire.ampacity} A ampacity

        ·

        ${temperature}°C

        <br>

        Estimated voltage drop:
        ${voltageDrop !== null
            ? `${voltageDrop.toFixed(2)} V`
            : "—"
        }

        ${voltageDropPercent !== null
            ? `(${voltageDropPercent.toFixed(1)}%)`
            : ""
        }

    `;


    resultCard.hidden = false;

    clearMessage();

}


/* =====================================================
   MESSAGE HELPERS
===================================================== */

function showMessage(
    text
) {

    message.textContent =
        text;

}


function clearMessage() {

    message.textContent =
        "";

}


/* =====================================================
   BUTTON
===================================================== */

calculateButton.addEventListener(
    "click",
    calculateWireSize
);


/* =====================================================
   ENTER KEY
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            calculateWireSize();

        }

    }
);