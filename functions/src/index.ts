/* eslint-disable @typescript-eslint/no-explicit-any */
// disabling the above to work with third party firebase stuff

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {FunctionResponse} from "./FunctionResponse";
import {logRequest} from "./logRequest";


// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const submitBugReport = functions.https.onRequest((req, res)=>{
  logRequest(req, `Bug report submission attempted from ${req.ip}.`);


  if (req.body == null) {
    res.status(400);
    res.send(new FunctionResponse(
        false,
        "Empty body for bug report",
        req.body,
        new Error("No body")
    ));
    res.end();
    logRequest(req, "Bug report submission failed: Empty body.");
  }

  const promise = admin.firestore().doc("bugReports").create(
      req.body
  );

  promise.then((writeResult) =>{
    res.status(200);
    res.send(new FunctionResponse(
        true,
        "Bug report successfully submitted!",
        writeResult
    ));
    res.end();
    logRequest(req, "Bug report submission succesful.");
  });
});


