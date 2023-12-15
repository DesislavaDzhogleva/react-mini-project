function mealReducer(state, action) {

    switch (action.type) {
        case "SET__ID":
            return { ...state, _id: action.payload, _idError: "" };
        case "SET_MEALDESCRIPTION":
            return { ...state, mealDescription: action.payload, mealDescriptionError: "" };
        case "SET_MEALIMAGE":
            return { ...state,  mealImage: action.payload, mealImageError: "" };
        case "SET_MEALNAME":
            return { ...state, mealName: action.payload, mealNameError: "" };
        case "SET_MEALPRICE":
            return { ...state, mealPrice: action.payload, mealPriceError: "" };
        case "SET_CATEGORYID":
            return { ...state, categoryId: action.payload, categoryIdError: "" };
        case "SET_MEALDESCRIPTION_ERROR":
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