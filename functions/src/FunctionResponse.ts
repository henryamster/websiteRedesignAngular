
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
    [this.success, this.message, this.data.this.error] =
      [success, message, data, error];
  }
}
