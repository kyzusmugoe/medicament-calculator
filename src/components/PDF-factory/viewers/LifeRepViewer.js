
import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { useSelector } from 'react-redux';



const sign={
    position:"absolute",
    width:64,
    height:48
}

const useStyles = makeStyles({
    card:{
        width:700,
        height:990,
        margin:"0 auto",
        padding:10,
        fontSize:12,
        lineHeight:1.5,
       
        "& li":{
            listStyleType:"trad-chinese-informal",
        }
    },
    header:{
        marginBottom:30
    },
    logo:{
        width:200,
        float:"left"
    },
    title:{
        fontSize:18,
        fontWeight:"bolder",
    },
    th:{
        textAlign:"center",
        fontWeight:"bolder"
    },
    signArea:{
        position:"relative",
        display: "flex",
        alignItems:"center",
        
        height:50
    },
    table:{
        borderCollapse:"collapse",
        "& td":{
            padding:0,
            border:"1px solid #333"
        }
    },
    underLine:{textDecoration:"underline"},
    sign1:{ ...sign, top:4, left:80},
    sign2:{ ...sign, top:-4, left:250},
    sign3:{ ...sign, top:-4, left:200},
    sign4:{ ...sign, top:0, left:200},
    
  });

// Create Document Component
export default () => {
    const data = useSelector(state => state)
    const classes = useStyles();
    const loginInfo = data.loginInfo
    const basicInfo = data.basicInfo
    const lifeRep = data.lifeRep
    const renderCheckBox=(items)=>{        
        let group=""
        items.list.map((item, index)=>{
            const icon = item.checked === true? "■":"□"            
            group +=(icon+item.name)
        })
        return group
    }

    const renderMoney = (money)=>{
        return new Intl.NumberFormat('zh-TW').format(money)
    }
    return(
        <Card className={classes.card}>
            <CardContent >                
                <div className="pdf">
                <p className={classes.title}>大誠保險經紀人股份有限公司</p>
                <p className={classes.title}>【人身保險商品】書面分析報告</p>
                <table className={classes.table}>
                    <tbody>
                        <tr className={classes.th}>
                            <td  colSpan="10">基本資料</td>
                        </tr>
                        <tr >
                            <td colSpan="3" style={{width:"50%"}}>要保人</td>
                            <td colSpan="7" style={{width:"50%"}}>被保險人(若為團體險,請附投保名冊)</td>
                        </tr>
                        <tr>
                            <td style={{width:"25%"}}>姓名/法人名稱</td>
                            <td colSpan="2" style={{width:"25%"}}>{basicInfo.policyholderName}</td>
                            <td style={{width:"25%"}}>姓名</td>
                            <td colSpan="6" style={{width:"25%"}}>{basicInfo.insuredName}</td>
                        </tr>
                        <tr>
                            <td>年齡/法人免填</td>
                            <td colSpan="2">{basicInfo.policyholderAge}</td>
                            <td>性別</td>
                            <td colSpan="2">
                                {renderCheckBox(basicInfo.insuredSex)}
                            </td>
                            <td colSpan="3">年齡</td>
                            <td>{basicInfo.insAge}</td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                國籍{renderCheckBox(basicInfo.citizenship)}
                                <span className={classes.underLine}>{lifeRep.citizenshipOther}</span>
                            </td>
                            <td>職業</td>
                            <td colSpan="6">{basicInfo.insuredJob}</td>
                        </tr>
                        <tr>
                            <td colSpan="6" >要保人:職業代碼(0一般,1軍火商,2珠寶商,3銀樓業者,4執業律師,5執業會計,6典當業,7博弈業)</td>
                            <td colSpan="4" >
                                {
                                    basicInfo.policyholderJobCode.list.map((item, index)=>{
                                        if(item.checked) return item.value                                    
                                    })
                                }
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6">要保人:職位名稱代碼(0一般,1董事長,2總經理,3副總經理)</td>
                            <td colSpan="4">{
                                 basicInfo.policyholderTitleCode.list.map((item, index)=>{
                                    if(item.checked) return item.value
                                })
                            }</td>
                        </tr>
                        <tr>
                            <td colSpan="3">風險屬性<br /> (投保投資型或外幣商品時填寫)</td>
                            <td colSpan="7">
                                投資型商品:{renderCheckBox(basicInfo.riskTypeA)}
                                外幣型商品:{renderCheckBox(basicInfo.riskTypeB)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="10" className={classes.th}>保險需求</td>
                        </tr>
                        <tr>
                            <td colSpan="2">本次投保之目的及需求(可複選)</td>
                            <td colSpan="8">
                                {renderCheckBox(lifeRep.demand)}                                
                                <span className={classes.underLine}>{lifeRep.demand.other}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">欲投保之保險種類</td>
                            <td colSpan="8">
                                {renderCheckBox(lifeRep.insuredType)}                                
                                <span className={classes.underLine}>{lifeRep.insuredType.other}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">是否有指定之保險公司</td>
                            <td colSpan="8">
                                {renderCheckBox(lifeRep.specifyComp)}<br />
                                {renderCheckBox(lifeRep.insComps)}
                                {lifeRep.insComps.other}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">欲投保之保險金額</td>
                            <td colSpan="8"><span className={classes.underLine}>{lifeRep.wantMoney}</span>萬元</td>
                        </tr>
                        <tr>
                            <td colSpan="10">
                                是否已有投保其他商業保險之有效保險契約
                                {renderCheckBox(lifeRep.haveOther)}
                                <span className={classes.underLine}>{lifeRep.haveOther.other}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="10" className={classes.th}>保險費支出</td>
                        </tr>
                        <tr>
                            <td colSpan="2">預估繳交之保險費金額</td>
                            <td colSpan="8">
                                {renderCheckBox(lifeRep.payment)}<br /> 
                                幣別：{
                                    lifeRep.paymentCurrency.list.map((item)=>{
                                        if(item.checked == true) return item.name
                                    })
                                }。
                                保費：<span className={classes.underLine}>{renderMoney(lifeRep.paymentPremium)}</span> 元
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">僅長年期保險填寫：<br /> 1.繳交保險費之人預估退休剩餘年期</td>
                            <td colSpan="8"> {renderCheckBox(lifeRep.payYears)}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">2.繳交保險費之來源</td>
                            <td colSpan="8">
                                {renderCheckBox(lifeRep.paySource)} 
                                <span className={classes.underLine}>{lifeRep.paySource.other}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="10">業務員建議事項</td>
                        </tr>
                        <tr>
                            <td colSpan="2">建議投保之保險公司名稱及概況</td>
                            <td colSpan="8">
                                <span className={classes.underLine}>{lifeRep.recommendComp}</span>人壽保險,概況說明方式{renderCheckBox(lifeRep.insState)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">保險商品/險種名稱</td>
                            <td colSpan="2">{lifeRep.insProdoctionName} </td>
                            <td colSpan="2">保險金額</td>
                            <td colSpan="4"> {lifeRep.insCost}</td>
                        </tr>
                        <tr>
                            <td colSpan="2">保險費及繳費年期</td>
                            <td colSpan="8">  
                                <span className={classes.underLine}>{renderMoney(lifeRep.insTotal)}</span>元
                                {renderCheckBox(lifeRep.insTotalYear)} 
                                <span className={classes.underLine}>{lifeRep.insTotalYear.other}</span> 年
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">保障範圍</td>
                            <td colSpan="8">
                                {renderCheckBox(lifeRep.insScope)}
                                <span className={classes.underLine}>{lifeRep.insScope.other}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">建議投保保險公司理由</td>
                            <td colSpan="8">
                                {renderCheckBox(lifeRep.recommend)}
                                <span className={classes.underLine}>{lifeRep.recommend.other}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={classes.signArea}>
                    要保人簽名:
                    {
                        data.sign_1 != "" &&
                        <img className={classes.sign1} src={data.sign_1}/>
                    }
                    <p style={{marginLeft:100}}>本報告由台端確認後,正本隨要保文件交本公司,若台端欲留存影本,可請業務服務人員提供</p>
                </div>
                <div style={{display: "flex",flexDirection: "row", alignItems: "center"}}>
                    單位名稱: {loginInfo.UserUnit}
                    <div className={classes.signArea} >
                        業務人員簽名:
                        {
                            data.sign_4 != "" &&
                            <img className={classes.sign4} style={{ position:"unset"}} src={data.sign_4}/>
                        }
                    </div>
                    登錄字號:{loginInfo.lifeLicenseID} 
                    <div className={classes.signArea} style={{marginLeft:20}}>簽署章:</div>
                </div>
                <p>大誠保險經紀人股份有限公司</p>
                <p>總公司地址:新北市板橋區文化路一段266號18樓之1 日期:民國{data.nowDate.year}年{data.nowDate.month}月{data.nowDate.date}日 10807版</p>
                
                </div>
            </CardContent>
        </Card>
    )
}

