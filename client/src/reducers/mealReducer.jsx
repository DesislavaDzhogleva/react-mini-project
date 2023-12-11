function mealReducer(state, action) {

    switch (action.type) {
        case "SET_MEALDESCRIPTION_ERROR":
            console.log( action.payload);
            return { ...state, mealDescriptionError: action.payload };
        case "SET_MEALIMAGE_ERROR":
            return { ...state,  mealImageError: action.payload };
        case "SET_MEALNAME_ERROR":
            return { ...state, mealNameError: action.payload };
        case "SET_MEALPRICE_ERROR":
            return { ...state, mealPriceError: action.payload };
        case "SET_CATEGORYID_ERROR":
            return { ...state, categoryIdError: action.payload };
        default:
            return state;
    }
}

export default mealReducer;