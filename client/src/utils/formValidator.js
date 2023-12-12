// formValidation.js
import { ValidationErrors, ValidationRegexes } from '../constants/commonConstants';

export function validateFormFields(editValues, dispatch) {
    let isValid = true;
    Object.keys(editValues).forEach((field) => {
      if (field === 'mealPrice') {
        if (validateNumberFields(field, editValues[field], dispatch) === false) {
          isValid = false;
        }
      } else {
        if (validateTextFields(field, editValues[field], dispatch) === false) {
          isValid = false;
        }
      }
    });
    return isValid;
  }

  
export const validateTextFields = (target, value, dispatch) => {
    if (value.trim() === "") {
        dispatch({ type: `SET_${target.toUpperCase()}_ERROR`, payload: ValidationErrors.emptyInput });
        return false;
    }
    dispatch({ type: `SET_${target.toUpperCase()}_ERROR`, payload: null });
    return true;
}

export const validateNumberFields = (target, value, dispatch) => {
    if (target === "mealPrice") {
        if (!ValidationRegexes.priceRegex.test(value) || value.trim() === "") {
            dispatch({ type: `SET_${target.toUpperCase()}_ERROR`, payload: ValidationErrors.inputNotNumber });
            return false;
        }
        dispatch({ type: `SET_${target.toUpperCase()}_ERROR`, payload: null });
        return true;
    }
}
