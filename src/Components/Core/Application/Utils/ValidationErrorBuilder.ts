import type { ValidationError } from "../Services/MBZValidator";

/**
 * ValidationErrorBuilder provides utility methods for creating and formatting validation errors.
 *
 * This class helps maintain consistency in error creation and provides
 * flexible formatting options for displaying errors to users.
 */
export default class ValidationErrorBuilder {
  /**
   * Create a validation error with code, user message, and technical details
   * @param code Error code for programmatic handling
   * @param userMessage User-friendly error message
   * @param technicalDetails Technical details for debugging
   * @returns ValidationError object
   */
  static createError(
    code: string,
    userMessage: string,
    technicalDetails: string,
  ): ValidationError {
    return {
      code,
      message: userMessage,
      technicalDetails,
    };
  }

  /**
   * Format a validation error for display
   * @param error The validation error to format
   * @param showDetails Whether to include technical details
   * @returns Formatted error string
   */
  static formatErrorForDisplay(
    error: ValidationError,
    showDetails: boolean,
  ): string {
    if (showDetails) {
      return `${error.message}\n\nTechnische Details:\n[${error.code}] ${error.technicalDetails}`;
    }
    return error.message;
  }

  /**
   * Format multiple validation errors for display
   * @param errors Array of validation errors
   * @param showDetails Whether to include technical details
   * @param maxErrors Maximum number of errors to display (0 = all)
   * @returns Formatted error string
   */
  static formatErrorsForDisplay(
    errors: ValidationError[],
    showDetails: boolean,
    maxErrors: number = 0,
  ): string {
    if (errors.length === 0) {
      return "";
    }

    const errorsToDisplay = maxErrors > 0 ? errors.slice(0, maxErrors) : errors;
    const remainingCount = errors.length - errorsToDisplay.length;

    let result = errorsToDisplay
      .map((error) => this.formatErrorForDisplay(error, showDetails))
      .join("\n\n");

    if (remainingCount > 0) {
      result += `\n\n... und ${remainingCount} weitere Fehler`;
    }

    return result;
  }

  /**
   * Create a summary message for multiple errors
   * @param errors Array of validation errors
   * @returns Summary message
   */
  static createErrorSummary(errors: ValidationError[]): string {
    if (errors.length === 0) {
      return "";
    }

    if (errors.length === 1) {
      return errors[0].message;
    }

    const firstError = errors[0].message;
    const additionalCount = errors.length - 1;
    return `${firstError} (+${additionalCount} weitere Probleme)`;
  }

  /**
   * Format technical details from multiple errors
   * @param errors Array of validation errors
   * @returns Formatted technical details string
   */
  static formatTechnicalDetails(errors: ValidationError[]): string {
    return errors
      .map(
        (error, index) =>
          `${index + 1}. [${error.code}] ${error.technicalDetails}`,
      )
      .join("\n");
  }
}
