
import React,{useContext} from 'react';
import WebServiceContext from '../../../webservice/WebServiceContext'
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
    
  });

// Create Document Component
export default () => {
    const data = useSelector(state => state)
    const classes = useStyles();
    const webservice = useContext(WebServiceContext)
    return(
        <Card className={classes.card}>
            <CardContent >                
                <div className="pdf">
                    <div className={classes.header}>
                        <img className={classes.logo} src="./assets/logo.jpg"/>
                        <p className={classes.title}>履行個人資料保護法蒐集、處理及利用個人資料告知書</p>
                        
                    </div>
                    <p>大誠保險經紀人股份有限公司（下稱本公司）依據個人資料保護法（以下稱個資法）第8條第1項（如為間接蒐集之個人資料則為第9條第1項）規定，向台端告知下列事項，請台端詳閱：</p>                    
                    <ul>
                        <li>蒐集之目的：（一）保險經紀（二）其他經營合於營業登記項目或組織章程所定之業務</li>
                        <li>蒐集之個人資料類別：（一）姓名（二）身分證統一編號（三）地址等聯絡方式（四）其它詳如要保書等相關業務申請書或契約書內容</li>
                        <li>個人資料之來源（一）要保人/被保險人（二）司法警憲機關、委託協助處理理賠之公證人或機構（三）當事人之法定代理人、輔助人（四）各醫療院所（五）於本公司各項業務內所委託往來之第三人。</li>
                        <li>個人資料利用之期間、地區、對象、方式
                            <ul>
                                <li>（一）期間：因執行業務所必須及依法令規定應為保存之期間</li>
                                <li>（二）對象：本公司、產、壽險公司、財團法人金融消費評議中心、業務委外機構、依法有調查權機關或金融監理機關。</li>
                                <li>（三）地區：上述對象所在之地區。（四）方式：合於法令規定之利用方式。</li>
                            </ul>
                        </li>
                        <li>依據個資法第3條規定，台端就本公司保有台端之個人資料得行使之權利及方式：
                            <ul>

                                <li>（一）得向本公司行使之權利：1.向本公司查詢、請求閱覽或請求製給複製本。2.向本公司請求補充或更正。
                                    3.向本公司請求停止蒐集、處理或利用及請求刪除。</li>
                                <li>（二）行使權利之方式：書面。</li>
                            </ul>
                        </li>
                        <li>台端不提供個人資料所致權益之影響（個人資料由當事人直接蒐集之情形適用）：
                        台端若未能提供相關個人資料時，本公司將可能延後或無法進行必要之審核及處理作業，因此將婉謝、延遲或無法
                        提供台端相關服務。病歷、醫療及健康檢查等個人資料蒐集、</li>
                    </ul>
                    <p className={classes.title}>病歷、醫療及健康檢查等個人資料蒐集、處理及利用同意書</p>
                    <p>本公司依據個人資料保護法及保險法第177條之1暨其授權辦法等規定，關於病歷、醫療及健康檢查等個人資料所為蒐集、處理及利用，除上述告知書所列告知事項外，就  台端個人病歷、醫療及健康檢查等資料之蒐集、處理及利用，將於保險業務之客戶服務、招攬、理賠、申訴及爭議處理、公司辦理內部控制及稽核之業務及符合相關法令規範等之目的及範圍內使用。若無法取得  台端之蒐集、處理及利用前述資料同意，本公司將可能無法提供  台端相關保險業務之申請及辦理。</p>
                    <p>立同意書人(即要/被保險人），本人已瞭解上述說明，並同意 貴公司就本人透過 貴公司辦理投保、契約變更或申請理賠時所檢附之病歷、醫療及健康檢查等個人資料於特定目的之必要範圍內，為蒐集、處理或利用。並於符合相關法令規範範圍內將上開資料轉送與 貴公司有業務往來之產、壽險公司辦理投保、契約變更或理賠作業。立同意書人併此聲明，此同意書係出於本人意願下所為之意思表示。</p>
                    <p>此致</p>
                    <p>大誠保險經紀人股份有限公司</p>
                    <div className={classes.signArea}>
                        {
                            data.sign_1 != "" &&
                            <img className={classes.sign1} src={data.sign_1}/>
                        }
                        <p>立同意書人（即要/被保險人）簽名：_______________</p>
                    </div>
                    <div className={classes.signArea}>
                        {
                            data.sign_2 != "" &&
                            <img className={classes.sign2} src={data.sign_2}/>
                        }
                        <p>(配偶/子女亦為被保人時，請一併簽署同意)_______________</p>
                    </div>
                    <div className={classes.signArea}>
                        {
                            data.sign_3 != "" &&                        
                            <img className={classes.sign3} src={data.sign_3}/>
                        }
                        <p>法　 定　 代　 理　 人　簽名：_______________</p>
                    </div>                     
                    <p>中   華   民    國  {data.nowDate.year}年{data.nowDate.month}月{data.nowDate.date}日</p>
                    <p>履行上開告知義務，不限取得當事人簽名，縱無簽署亦不影響告知效力。</p>
                </div>
            </CardContent>
        </Card>
    )
}

