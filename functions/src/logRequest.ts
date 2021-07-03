import * as functions from "firebase-functions";
/**
 * logRequest
 * @description Write a request out to the log
 * @param {functions.https.Request} req Request object to log
 * @param {string} message Message to log
 * @fires functions.logger.log()
 */
export function logRequest(req: functions.https.Request,
  message = "Something went wrong."): void {
  functions.logger.log(`${message}
    ${JSON.stringify(req, null, 4)}`);
}
