const CityReducer = (prevState={
    cityName:"北京",
},action)=>{
    console.log("action::",action);
    let newState = {...prevState};
    switch(action.type){
        case "change-city":
            newState.cityName = action.payload;
            return newState;
        default:
            return prevState
    }
}

export default CityReducer