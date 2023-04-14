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
    
    signArea:{
        position:"relative",
        display: "flex",
        alignItems:"flex-end",
        height:60
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
    const propRep = data.propRep
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
                <p className={classes.title}>{renderCheckBox(propRep.propType)}</p>
                <table className={classes.table}>
                    <tbody>
                        <tr>
                            <td colSpan="4">基本資料</td>
                        </tr>
                        <tr>
                            <td rowSpan="2">
                                要保人姓名<br /> (法人名稱)
                            </td>
                            <td rowSpan="2">
                                {basicInfo.policyholderName}
                            </td>
                            <td>
                                被保險人姓名<br /> (法人名稱)
                            </td>
                            <td>
                                {basicInfo.insuredName}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                出生日期/性別
                            </td>
                            <td>
                                民國{basicInfo.insBirthYear}年{basicInfo.insBirthMonth}月{basicInfo.insBirthDate}日 / 性別:{renderCheckBox(basicInfo.insuredSex)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" rowSpan="3">
                                被保險人(若為團體險,請附投保名冊)<br/>
                                投保強制汽車責任險必填
                            </td>
                            <td>
                                身分證字號
                            </td>
                            <td>
                                {basicInfo.insIdentity}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                車牌號碼
                            </td>
                            <td>
                                 {basicInfo.carID}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                車輛種類
                            </td>
                            <td>
                                {basicInfo.carType}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                保險需求
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                本次投保之目的及需求(可複選)
                            </td>
                            <td colSpan="2">
                                {renderCheckBox(propRep.purpose)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                欲投保之保險種類
                            </td>
                            <td colSpan="2">
                                {renderCheckBox(propRep.insTypes)}：
                                <span className={classes.underLine}>{propRep.insTypes.other}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                是否有指定之保險公司
                            </td>
                            <td colSpan="2">
                                {renderCheckBox(propRep.specifyComp)}
                                <div>
                                    {renderCheckBox(propRep.insComps)}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                保險期間
                            </td>
                            <td colSpan="2">
                                民國{propRep.insStartYear}年
                               {propRep.insStartMonth}月
                               {propRep.insStartDate}日起至
                               民國{propRep.insEndYear}年
                               {propRep.insEndMonth}月
                               {propRep.insEndDate}日
                             </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                欲投保之保險金額(強制險免填)
                            </td>
                            <td colSpan="2">
                                <span>{propRep.wantMoney}</span>萬元
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                是否已有投保其他商業保險之有效保險契約
                                {renderCheckBox(propRep.haveOther)}：
                                <span className={classes.underLine}>{propRep.haveOther.other}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                保險費支出
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                預估繳交之保險費金額
                            </td>
                            <td colSpan="2">
                                保費：<span>{renderMoney(propRep.estimatedCost)}</span>元
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                業務員建議事項
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                建議投保之保險公司名稱及概況
                            </td>
                            <td colSpan="2">
                                {propRep.recommendComp}保險,概況說明方式{renderCheckBox(propRep.insState)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                保險商品/險種名稱(強制免填)
                            </td>
                            <td colSpan="2">
                                {propRep.productionName}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                保險金額(強制免填)
                            </td>
                            <td colSpan="2">
                                保額<span className={classes.underLine}>{propRep.productionCost}</span>萬/元(團單詳名冊)
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                保險費 (強制免填)
                            </td>
                            <td colSpan="2">
                                {propRep.insCost}元
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                保障範圍(強制免填)
                            </td>
                            <td colSpan="2">
                                {renderCheckBox(propRep.insScope)}：
                                {propRep.insScope.other}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                建議投保保險公司理由
                            </td>
                            <td colSpan="2">
                                {renderCheckBox(propRep.recommend)}：
                                {propRep.recommend.other}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={classes.signArea} style={{alignItems:"center"}}>
                    要保人簽名:
                    {
                        data.sign_1 !="" &&
                        <img className={classes.sign1} src={data.sign_1}/>
                    }
                    <p style={{marginLeft:100}}>本報告由台端確認後,正本隨要保文件交本公司,若台端欲留存影本,可請業務服務人員提供</p>
                </div>
                <div className={classes.signArea} style={{alignItems:"center", whiteSpace:"nowrap"}}>
                    單位名稱: {loginInfo.UserUnit}
                    <span style={{marginRight: 150}}>業務人員簽名:</span>
                    {
                        data.sign_4 !="" &&
                        <img  className={classes.sign4} src={data.sign_4}/>
                    }
                    登錄字號:{loginInfo.propLicenseID}  
                    <div className={classes.signArea}  style={{marginLeft:20}}>簽署章:</div>
                </div>
                <p>大誠保險經紀人股份有限公司</p>
                <p>總公司地址:新北市板橋區文化路一段266號18樓之1 日期:民國{data.nowDate.year}年{data.nowDate.month}月{data.nowDate.date}日 10807版</p>

                </div>
            </CardContent>
        </Card>
    )
}

