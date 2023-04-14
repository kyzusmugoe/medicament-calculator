
import React,{useState, useEffect, forwardRef, useImperativeHandle} from 'react';

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
    sign1:{ ...sign, top:-4, left:210},
    sign2:{ ...sign, top:-4, left:250},
    sign3:{ ...sign, top:-4, left:200},
    sign4:{ ...sign, top:-4, left:200},
    
  });

// Create Document Component
export default () => {
    const data = useSelector(state => state)
    const classes = useStyles();
    //console.log(data)
    const investment = data.investment
    const propRep = data.propRep
    const renderCheckBox=(items)=>{
        let group=""
        items.list.map((item, index)=>{
            const icon = item.checked === true? "■":"□"            
            group +=(icon+item.name)
        })
        return group
    }



    return(
        <Card className={classes.card}>
            <CardContent >                
                <div className="pdf">
                    <div className={classes.header}>
                        <img className={classes.logo} src="./assets/logo.jpg"/>
                        <p className={classes.title}>投資型商品投保內容確認書</p>
                    </div>
                    <div>                        
                        <p>親愛的客戶，為確保您的權益在您完成要保文件後請確認以下事項：</p>                    
                        <ol>
                            <li>投保商品名稱(業務員填寫)：{investment.productionName}</li>
                            <li>
                                <p>您是否知道您所投保的商品是投資型保單？</p>
                                勾選：{renderCheckBox(investment.q1)}
                            </li>
                            <li>
                                <p>您是否知道本商品的匯率不保證：當本商品投資標的計價貨幣單位為外幣(非台幣)時，於配息、中途部分提領、解約或滿期給付時會有匯率風險，本商品並無保證匯率之漲跌。</p>
                                勾選：{renderCheckBox(investment.q2)}
                            </li>
                            <li>
                                <p>您是否知道本商品的本金不保證：本商品中途部份提領或提前解約或贖回基金標的時，所投資的本金會因投資績效而變動。</p>
                                勾選：{renderCheckBox(investment.q3)}
                            </li>                       
                            <li>
                                <p>您是否知道本商品的配息金額不保證：本商品所連結之標的，當產生配息時，配息的金額會因投資績效而變動。</p>
                                勾選：{renderCheckBox(investment.q4)}
                            </li>                       
                            <li>
                                <p>您所投保的這個商品的相關費用與投資風險是否已經清楚知道。</p>
                                勾選：{renderCheckBox(investment.q5)}
                            </li>                       
                            <li>
                                <p>在您投保本商品當時，本契約各項書面文件(如建議書、風險告知書、要保書、重要事項告知書、投資型商品投保內容確認書)是否皆為您本人親自簽名？</p>
                                勾選：{renderCheckBox(investment.q6)}                                 
                                <div className={classes.signArea}>
                                    {
                                        data.sign_1 != "" &&
                                        <img className={classes.sign1} style={{left:120}} src={data.sign_1}/>
                                    }
                                    {
                                        data.sign_2 != "" &&
                                        <img className={classes.sign2} style={{left:220}}  src={data.sign_2}/>
                                    }
                                    <p>要(被)保險人簽名：______________________________</p>
                                </div>
                            </li>                                            
                            <li>
                                請簽名確認您在投保當時已親見業務員
                                 <div className={classes.signArea}>
                                    {
                                        data.sign_4 != "" &&
                                        <img className={classes.sign4}  style={{left:100}}  src={data.sign_4}/>
                                    }
                                    <p>業務員簽名：_______________</p>
                                </div>
                                <div className={classes.signArea}>
                                    {
                                        data.sign_1 != "" &&
                                        <img className={classes.sign1} style={{left:120}}  src={data.sign_1}/>
                                    }
                                    {
                                        data.sign_2 != "" &&
                                        <img className={classes.sign2} style={{left:220}}  src={data.sign_2}/>
                                    }
                                    <p>要(被)保險人簽名：______________________________</p>
                                </div>       
                            </li>                                            
                        </ol>
                    </div>
                    <p>中   華   民    國 民國{data.nowDate.year}年{data.nowDate.month}月{data.nowDate.date}日 107.01版</p>
                </div>
            </CardContent>
        </Card>
    )
}

