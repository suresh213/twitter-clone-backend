import { validateEmail } from '../utils/utils';

/**
 * Wrapper class for handling params from request.
 * @class
 */
export default class RequestParamsHandler {
  /**
   * Sends the error message and exception in sentry.
   * @param {Array<string>} params - Params.
   * @param {Record<string, any>} requestObject - RequestObject.
   * @returns {{ error: boolean, errorMessage: string }} - Validation result.
   */
  checkParams(
    params: string[],
    requestObject: Record<string, any>
  ): { error: boolean; errorMessage: string } {
    const validationResult = {
      error: false,
      errorMessage: '',
    };

    params.forEach((param: string) => {
      if (!requestObject[param]) {
        validationResult.error = true;
        if (param === 'email' && validateEmail(requestObject[param])) {
          validationResult.errorMessage = 'Invalid email address';
        } else {
          validationResult.errorMessage = `${param} is a required field`;
        }
        return validationResult;
      }
    });

    return validationResult;
  }
}
