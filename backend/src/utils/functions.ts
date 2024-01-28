import { ValidationError } from "class-validator";

export function extractErrorKeysFromErrors (errors: ValidationError[]): string[] {
  const errorKeys = [];

  for (const error of errors) {
    for (const constraint in error.constraints) {
      errorKeys.push(
        `${error.property} - ${constraint}`
      )
    }
  }

  return errorKeys;
} 