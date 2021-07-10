/* eslint-disable @typescript-eslint/no-explicit-any */
// disabling the above to work with third party firebase stuff
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({origin: true});
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {QUERY_PATHS} from "./../../src/app/api/api-helpers";

admin.initializeApp();

export const submitInquiry = functions.https.onRequest((req, res) => {
  logRequest(req,
      `Bug report submission attempted from ${req.ip ?? "unknown IP. "}.`);

  cors(req, res, () => {
    // Check that method is POST,
    // If not, return 400
    if (req["method"] != "POST") {
      res.status(400)
          .send(responseFactory(
              new FunctionResponse(
                  false,
                  "Wrong HTTP Method: Should be POST",
                  null,
                  new Error(`${req["method"]}
                HTTP verb was used instead of POST`)
              )
          )).end();
    }

    if (req.body == null) {
      res.status(400)
          .send(responseFactory(new FunctionResponse(
              false,
              "Empty body for inquiry",
          req?.body ?? undefined,
          new Error("No body")
          ))).end();

      logRequest(req,
          "Inquiry? More like unquiry. Submission failed: Empty body.");
    }


    // Select the inquiries collection
    try {
      const collectionRef = admin.firestore()
          .collection(QUERY_PATHS.BUG_REPORT);


      // Add request body to as new document
      const promise = collectionRef.add(
          req.body
      );

      // Send 200 and log succesful request
      promise.then((writeResult) => {
        res.status(200)
            .send(responseFactory(new FunctionResponse(
                true,
                "Inquiry successfully submitted!",
                writeResult
            ))).end();
        logRequest(req, "Inquiry submission succesful.");
      })
          .catch(
              (err) => logRequest(err, "Inquiry submission succesful.")
          );
      // Check if Inquiries collection is undefined,
      // If so, return 400
    } catch {
      res.status(400)
          .send(responseFactory(new FunctionResponse(
              false,
              "Could not retrieve collection Inquiries",
          req?.body ?? undefined,
          new Error("Invalid collectionReference")
          ))).end();
    }
  });
});


// Write a method to fire an email on new inquiry.
// export function notifInquiry = functions.database.ref(QUERY_PATHS.INQUIRY)
//   .onCreate((snap)=>

//   )

export const submitBugReport = functions.https.onRequest((req, res) => {
  logRequest(req,
      `Bug report submission attempted from ${req.ip ?? "unknown IP. "}.`);

  cors(req, res, () => {
    // Check that method is POST,
    // If not, return 400
    if (req["method"] != "POST") {
      res.status(400)
          .send(responseFactory(
              new FunctionResponse(
                  false,
                  "Wrong HTTP Method: Should be POST",
                  null,
                  new Error(`${req["method"]}
                HTTP verb was used instead of POST`)
              )
          )
          ).end();
    }

    // Check that the request body is not null
    // If null, return 400
    if (req.body == null) {
      res.status(400)
          .send(responseFactory(new FunctionResponse(
              false,
              "Empty body for bug report",
          req?.body ?? undefined,
          new Error("No body")
          ))).end();

      logRequest(req, "Bug report submission failed: Empty body.");
    }

    // Select the bugReports collection
    try {
      const collectionRef =
      admin.firestore().collection(QUERY_PATHS.BUG_REPORT);


      // Add request body to as new document
      const promise = collectionRef.add(
          req.body
      );

      // Send 200 and log succesful request
      promise.then((writeResult) => {
        res.status(200)
            .send(responseFactory(new FunctionResponse(
                true,
                "Bug report successfully submitted!",
                writeResult
            ))).end();
        logRequest(req, "Bug report submission succesful.");
      });
      // Check if bugReports collection is undefined,
      // If so, return 400
    } catch {
      res.status(400)
          .send(responseFactory(
              new FunctionResponse(
                  false,
                  "Could not retrieve collection bugReports",
            req?.body ?? undefined,
            new Error("Invalid collectionReference")
              ))).end();
    }
  });
});

// export const getBlogPosts = functions.https.onRequest((req, res)=>{
//   logRequest(req,
//       `Blog GET request:  ${req.ip ?? "unknown IP. "}.`);

//   cors(req, res, () => {
//   // Check that method is POST,
//   // If not, return 400
//     if (req["method"] != "GET") {
//       res.status(400)
//           .send(responseFactory(
//               new FunctionResponse(
//                   false,
//                   "Wrong HTTP Method: Should be GET",
//                   null,
//                   new Error(`${req["method"]}
//               HTTP verb was used instead of GET`)
//               )
//           )
//           ).end();
//     }

//     // Select the blog collection
//     try {
//       const collectionRef =
//     admin.firestore().collection(QUERY_PATHS.BLOG);


//       // Add request body to as new document
//       const promise = collectionRef.get();

//       // Send 200 and log succesful request
//       promise.then((writeResult) => {
//         res.status(200)
//             .send(responseFactory(new FunctionResponse(
//                 true,
//                 "Blog results retrieved!",
//                 writeResult
//             ))).end();
//         logRequest(req, "Blog GET request completed.");
//       });
//     // Check if blog collection is undefined,
//     // If so, return 400
//     } catch {
//       res.status(400)
//           .send(responseFactory(
//               new FunctionResponse(
//                   false,
//                   "Could not retrieve collection for blog posts",
//           req?.body ?? undefined,
//           new Error("Invalid collectionReference")
//               ))).end();
//     }
//   });
// });


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
  ${JSON.stringify([req["ip"], req["header"], req["body"]], null, 4)}`);
}


/**
 * Function Response
 * @description HTTP Reponse class
 * @constructor
 * @param {boolean} success Was action succesful?
 * @param {string | undefined} message? Response message
 * @param {any | undefined} data? Data to return
 * @param {Error | undefined} error? Error, if applicable.
 * */
export class FunctionResponse {
  success: boolean;
  message?: string | undefined;
  data?: any | undefined;
  error?: Error | undefined;

  // eslint-disable-next-line require-jsdoc
  constructor(success: boolean, message?: string, data?: any, error?: Error) {
    [this.success, this.message, this.data, this.error] =
      [success, message ?? undefined, data ?? undefined, error ?? undefined];
  }
}

// eslint-disable-next-line valid-jsdoc
/**
 * Reponse Factory
 * @param {FunctionResponse} resp Function response to wrap inside of data
 * object
 * @returns {data: FunctionResponse}
 */
export const responseFactory =
  (resp: FunctionResponse) : {data:FunctionResponse} => {
    return {data: resp};
  };
