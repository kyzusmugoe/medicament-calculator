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


const basicData = {
    patientName:"",
    patientAge:18,
    patientSex:"",
    patientSN:"",
    patientKg:0,
}
const initState = {
    name:"Med",
    basicData:basicData,
    jsonData:[],
    userRaw:[]
}

let rootReducer = (state = initState, action) => {
    switch (action.type) {
        //初始設定
        //紀錄所屬營業處，產壽險登錄證號
        case "SET_JSON_DATA":
            return { ...state, jsonData: action.jsonData }
        case "SET_BASIC_DATA":
            return { 
                ...state,
                basicData: action.basicData              
            }
        case "SET_USER_RAW":
            return { 
                ...state,
                userRaw:[
                    ...state.userRaw,
                    action.userRaw
                ]
            }

        case "CLEAN_USER_RAW":
            return { 
                ...state,
                userRaw:[]
            }
        default:
            return state
    }
}



export default rootReducer