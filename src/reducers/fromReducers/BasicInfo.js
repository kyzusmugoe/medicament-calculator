export default {
    //要保人    
    "policyholderName":"",//要保人姓名
    "policyholderAge":0,//要保人年齡
    "policyholderID":"",//要保人身分證字號
    "policyholderSex":{//要保人性別
        list:[
            {id:"male", name:"男", value:"male", checked:false},
            {id:"female", name:"女", value:"female", checked:true},
        ]
    },
    "policyholderBirthYear":"109",//要保人出生年月日
    "policyholderBirthMonth":"01",//要保人出生年月日
    "policyholderBirthDate":"01",//要保人出生年月日
    "policyholderPhone":"",//要保人電話
    "policyholderCountry":"",//要保人國籍
    "policyholderPostCode":"",//要保人郵遞區號
    "policyholderAddress":"",//要保人地址

    "citizenship":{//要保人國籍
        list:[
            {id:"local", name:"本國人", value:"local", checked:true},
            {id:"foreign", name:"外國人", value:"foreign", checked:false},
        ],
    },
    "citizenshipOther":"",
    //被保人
    "insuredName":"",//被保人姓名
    "insuredSex":{//被保人性別
        list:[
            {id:"male", name:"男", value:"male", checked:false},
            {id:"female", name:"女", value:"female", checked:true},
        ]
    },
    "relationship":{//要/被保人關係
        list:[
            {id:"self",   name:"本人", value:"male", checked:true},
            {id:"parent", name:"父母", value:"parent", checked:false},
            {id:"spouse", name:"配偶", value:"spouse", checked:false},
            {id:"child", name:"子女", value:"child", checked:false},
            {id:"broAndSis", name:"兄弟姊妹", value:"broAndSis", checked:false},
            {id:"grandparents", name:"祖父母", value:"grandparents", checked:false},
            {id:"grandchildren", name:"孫子女", value:"grandchildren", checked:false},
            {id:"employees", name:"企業員工", value:"employees", checked:false},
            {id:"other", name:"其他", value:"other", checked:false},
        ],
        other:""
    },
    "insAge":0,
    "insIdentity":"",//被保人身分證字號
    "insBirthYear":"109",//被保人出生年月日
    "insBirthMonth":"01",//被保人出生年月日
    "insBirthDate":"01",//被保人出生年月日
    "insPhone":"",//被保人電話
    "insCountry":"",//被保人國籍
    "insPostCode":"",//被保人郵遞區號
    "insAddress":"",//被保人地址
    "insuredJob":"",//被保人職業
    //life
    "policyholderTitleCode":{//要保人:職位名稱代碼(0一般,1董事長,2總經理,3副總經理)
        list:[
            {id:"title0", name:"一般", value:"0", checked:true},
            {id:"title1", name:"董事長", value:"1", checked:false},
            {id:"title2", name:"總經理", value:"2", checked:false},
            {id:"title3", name:"副總經理", value:"3", checked:false},
        ]        
    },
    "policyholderJobCode":{//要保人:職業代碼(0一般,1軍火商,2珠寶商,3銀樓業者,4執業律師,5執業會計,6典當業,7博弈業)
        list:[
            {id:"job0", name:"一般", value:"0", checked:true},
            {id:"job1", name:"軍火商", value:"1", checked:false},
            {id:"job2", name:"珠寶商", value:"2", checked:false},
            {id:"job3", name:"銀樓業者", value:"3", checked:false},
            {id:"job4", name:"執業律師", value:"4", checked:false},
            {id:"job5", name:"執業會計", value:"5", checked:false},
            {id:"job6", name:"典當業", value:"6", checked:false},
            {id:"job7", name:"博弈業", value:"7", checked:false},
        ]
    },
   
    "riskTypeA":{//風險屬性(投保投資型)
        list:[
            {id:"conservative", name:"保守", value:"conservative", checked:true},
            {id:"moderate", name:"穩健", value:"moderate", checked:false},
            {id:"aggressive", name:"積極", value:"aggressive", checked:false},
        ]
    },
    "riskTypeB":{//風險屬性(外幣商品)
        list:[
            {id:"currency", name:"有外幣需求可承受匯兌風險", value:"currency", checked:false},
        ]
    },
    //props
    "carID":"",//車牌號碼
    "carType":"",//車種 
    "isOver65":{
        list:[
            {id:"isOver65-1", name:"是", value:"yes", checked:false},
            {id:"isOver65-2", name:"否", value:"no", checked:true},
        ]
    },   
    
    //"address":"",//地址
}