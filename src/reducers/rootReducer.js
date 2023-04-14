/*import LifeState from './fromReducers/life'

const _life = LifeState
console.log("life",_life)
*/
//import BasicInfo from './fromReducers/BasicInfo'
/*
const getInsurerID = () => {
    const _url = new URL(document.location.href)
    return _url.searchParams.get('insurer')
}

const getNowDate = () => {
    const _d = new Date();
    return {
        year: _d.getFullYear() - 1911,
        month: _d.getMonth() + 1,
        date: _d.getDate()
    }

}
*/

const initState = {
    name:"Med",
    jsonData:[],
    userRaw:[]
}

let rootReducer = (state = initState, action) => {
    switch (action.type) {
        //初始設定
        //紀錄所屬營業處，產壽險登錄證號
        case "SET_JSON_DATA":
            return { ...state, jsonData: action.jsonData }
        case "SET_USER_RAW":
            
            return { 
                ...state,
                userRaw:[
                    ...state.userRaw,
                    action.userRaw
                ]
            }
        default:
            return state
    }
}



export default rootReducer