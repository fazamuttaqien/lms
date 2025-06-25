import arcjet, {
    detectBot,
    fixedWindow,
    protectSignup,
    sensitiveInfo,
    shield,
    slidingWindow,
} from "@arcjet/next";
import { env } from "./env";

export {
    detectBot,
    fixedWindow,
    protectSignup,
    sensitiveInfo,
    shield,
    slidingWindow,
}

// The arcjet instance is created outside of the handler
export default arcjet({
    key: env.ARCJET_KEY,
    characteristics: ["fingerprint"],
    // Define base rules here, can also be empty if you dont want to use any base rules
    rules: [
        shield({
            mode: "LIVE",
        })
    ]
})