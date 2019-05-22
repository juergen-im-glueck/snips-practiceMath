#!/usr/bin/env node

const { withHermes } = require('hermes-javascript');

"use strict";

function getInt(minValue, maxValue) {
    return Math.floor(Math.random() * (+maxValue - +minValue)) + +minValue;
}


function challenge(practiceTyp) {
    const a = getInt(1, 10);

    var customData = {
        practiceTyp: practiceTyp
    };

    switch (practiceTyp) {
        case 'Multiplikation': {
            const b = getInt(1, 10);
            customData.result = a * b;
            customData.text = "Wie viel ist " + a + " mal " + b + " ?";
            break
        }

        case 'Subtraktion': {
            const b = getInt(1, a);
            customData.result = a - b;
            customData.text = "Wie viel ist " + a + " minus " + b + " ?";
            break
        }

        case 'Division': {
            const b = getInt(1, 10);
            const product = a * b;
            customData.result = b;
            customData.text = "Wie viel ist " + product + " geteilt durch " + a + " ?";
            break
        }

        case 'VerliebteZahlen': {
            const b = getInt(1, 9);
            customData.result = 10 - b;
            customData.text = "Was ist die verliebte Zahl von " + b + " ?";
            break
        }

        case 'Verdoppeln': {
            customData.result = 2 * a;
            customData.text = "Was ist die Verdopplung von " + a + " ?";
            break
        }

        case 'Halbieren': {
            const product = 2 * a;
            customData.result = a;
            customData.text = "Was ist die Hälfte von " + product + " ?";
            break
        }

        case 'Addition':
        default:  {
            const b = getInt(1, 10);
            customData.result = a + b;
            customData.text = "Wie viel ist " + a + " plus " + b + " ?";
            break
        }
    }

    console.log(customData);
    return customData;
}


const cancelFunc = (msg, flow) => {
    console.log(msg);
    flow.end();
    return "In Ordnung. Wir können ja ein andermal weiter üben."
};

const cancelHandler = (flow) => {
    flow.continue('juergen-im-glueck:cancelPracticing', cancelFunc);
};

const calculateAnswer = (msg) => {
    // check result
    const customData = JSON.parse(msg.customData);

    const answerCorrect = msg.slots.some(slot => slot.slotName == 'result' && slot.value.value == customData.result)

    // if result okay, do a new challenge
    if (answerCorrect) {
        const newCustomData = challenge(customData.practiceTyp);

        return {
            text: "Prima! " + newCustomData.text,
            customData: JSON.stringify(newCustomData)
        };
    } else {
        return {
            text: "Das ist leider nicht richtig. Versuchs noch einmal! " + customData.text,
            customData: msg.customData
        };
    }
};

const answerFunc = (msg, flow) => {
    cancelHandler(flow);

    flow.continue('juergen-im-glueck:mathAnswer', (msg, flow) => {
        cancelHandler(flow);
        answerHandler(flow);

        return calculateAnswer(msg);
    });

    return calculateAnswer(msg);
};

const answerHandler = (flow) => {
    flow.continue('juergen-im-glueck:mathAnswer', answerFunc);
};

withHermes(hermes => {
    const dialog = hermes.dialog();

    dialog.flow('juergen-im-glueck:startPracticingMath', (msg, flow) => {
        console.log(msg);

        const practiceTypeSlot = msg.slots.find(slot => slot.slotName === 'practiceType');

        if (practiceTypeSlot === undefined) {
            // oops, we don't know what to practice
            console.log("did not receive practiceType slog");
            flow.end();
            return "Ich habe leider nicht verstanden, was Du üben möchtest."
        } else {
            const practiceType = practiceTypeSlot.value.value;

            cancelHandler(flow);
            answerHandler(flow);

            const customData = challenge(practiceType);
            return {
                text: "Gerne! Los gehts: " + customData.text,
                customData: JSON.stringify(customData)
            };
        }
    })
});
