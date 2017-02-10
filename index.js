exports.handler = (event, context, callback) => {
    const https = require("https");

    const plurals = require("./utils/lang/plurals");

    const Warbands = require('./Combat/PvP/Warbands');

    /**
     * MAIN
     * This is where a request comes in from AlexaSkillService to be parsed.
     * App launcher and all INTENT requests are handled here.
     */
    try {

        if (event.session.new) {
            // New session
            console.log("New session");
        }

        switch (event.request.type) {
            case "LaunchRequest": {
                // Launch request
                console.log("Launch request");
                WarbandsHandler();
                break;
            }

            case "IntentRequest": {
                // Intent reqeust
                console.log("Intent request");
                console.log(event.request.intent.name);

                switch (event.request.intent.name) {

                    case "WarbandsTime": {
                        WarbandsHandler();
                        break;
                    }
                    default: {
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse("Failed intent", true),
                                {}
                            )
                        );
                    }
                }

                break;
            }

            case "SessionEndRequest": {
                // Session end request
                console.log("Session end request");

                break;
            }

            default: {
                endSessionHandler("Default hit");
                //context.fail("This is a default response. Some error has occurred.");
            }
        }

    } catch(error) {
        endSessionHandler("Catch hit");
        // context.fail("Failed due to some unknown error");
    }

    function WarbandsHandler() {
        "use strict";
        context.succeed(
            generateResponse(
                buildSpeechletResponse(Warbands.timeToNextWarbands(), true),
                {}
            )
        );
    }

    function endSessionHandler(speech) {
        if (typeof speech === "undefined") {
            speech = "Good bye from the wise old man.";
        }
        context.succeed(
            generateResponse(
                buildSpeechletResponse(speech, true),
                {}
            )
        );
    }
};

// Helper functions
buildSpeechletResponse = (outputText, shouldEndSession) => {
    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }
};

generateResponse = (speechletResponse, sessionAttributes) => {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }
};