const jsData =[
    {
        "label": "Hydrocortisone",
        "value": 0.25
    },
    {
        "label": "Cortisone",
        "value": 0.2
    },
    {
        "label": "Prednisolone",
        "value": 1
    },
    {
        "label": "Triamcinolone",
        "value": 1.25
    },
    {
        "label": "Methylprednisolone",
        "value": 1.25
    },
    {
        "label": "Dexamethasone",
        "value": 6.67
    },
    {
        "label": "Betamethasone",
        "value": 8.33
    },
    {
        "label": "Fludrocortisone",
        "value": 2.5
    }
]

const basicData = {
    patientName:"",
    patientAge:undefined,
    patientSex:null,
    patientSN:"",
    patientKg:null,
}
const initState = {
    name:"Med",
    basicData:basicData,
    jsonData:jsData,
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