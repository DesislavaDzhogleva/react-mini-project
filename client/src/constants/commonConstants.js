export const ValidationErrors = {
    emptyInput: "This field cannot be empty",
    inputNotNumber: "This field accepts only valid numbers"
}

export  const ValidationRegexes = {
    //Validates that the price is a positive double or decimal number
    priceRegex: new RegExp(/^(\d+(\.\d*)?|\.\d+)$/),
}