
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';
//import { useSelector } from 'react-redux';

import kaiu from "../../../font/kaiu.ttf"

Font.register({
    family: "kaiu",
    fonts:[
        {
            src:kaiu,
            fontWeight: 'bolder',
        }
    ]
})


// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        fontFamily: 'kaiu',
        padding: 15,
        lineHeight: 1.5
    },
    section: {
        width: "100%",
        height: "auto",
        fontSize: 10,
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        padding: 3

    },
    title: {
        padding: "20px 0",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18
    },
    image: {

        width: 100,
        height: 75
    },
});

const stylesHader = StyleSheet.create({
    flexDirection: 'row',
    width: "100%",
    padding: 15,
    text: {
        fontSize: 13,
        paddingTop: 10,

    },
    logo: {
        marginLeft: 30,
        width: 160,
        height: 160,
    },
    section: {
        flexGrow: 1,
    }
})


// Create Document Component
const PersonalPDFpage = ({ /*data*/ }) => {

    return (
        <Page size="A4" style={styles.page}>
            <View>
                <View style={stylesHader} >
                    <View style={stylesHader.section}>
                        <Image style={stylesHader.logo} src="./assets/logo.jpg" />
                    </View>
                    <View style={stylesHader.section} wrap>
                        <Text style={stylesHader.text}>履行個人資料保護法蒐集、處理及利用個人資料告知書</Text>
                    </View>
                </View>

                <View style={styles.section} >
                    <Text >
                        股份有限公司（下稱本公司）依據個人資料保護法（以下稱個資法）第8條第1項（如為間接蒐集之個人資料
                        則為第9條第1項）規定，向台端告知下列事項，請台端詳閱：
                        &emsp;&emsp;一、蒐集之目的：（一）保險經紀（二）其他經營合於營業登記項目或組織章程所定之業務
                        &emsp;&emsp;二、蒐集之個人資料類別：（一）姓名（二）身分證統一編號（三）地址等聯絡方式（四）其它詳如要保書等相關業務
                        &emsp;&emsp;&emsp;&emsp;申請書或契約書內容
                        &emsp;&emsp;三、個人資料之來源（一）要保人/被保險人（二）司法警憲機關、委託協助處理理賠之公證人或機構（三）當事人之法
                        &emsp;&emsp;&emsp;&emsp;定代理人、輔助人（四）各醫療院所（五）於本公司各項業務內所委託往來之第三人。
                        &emsp;&emsp;四、個人資料利用之期間、地區、對象、方式{"\n"}
                        &emsp;&emsp;&emsp;&emsp;（一）期間：因執行業務所必須及依法令規定應為保存之期間
                        &emsp;&emsp;&emsp;&emsp;（二）對象：本公司、產、壽險公司、財團法人金融消費評議中心、業務委外機構、依法有調查權機關或金融監理機關。{"\n"}
                        &emsp;&emsp;&emsp;&emsp;（三）地區：上述對象所在之地區。（四）方式：合於法令規定之利用方式。
                        &emsp;&emsp;五、依據個資法第3條規定，台端就本公司保有台端之個人資料得行使之權利及方式：{"\n"}
                        &emsp;&emsp;&emsp;&emsp;（一）得向本公司行使之權利：{"\n"}
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1.向本公司查詢、請求閱覽或請求製給複製本。2.向本公司請求補充或更正。{"\n"}
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;3.向本公司請求停止蒐集、處理或利用及請求刪除。{"\n"}
                        &emsp;&emsp;&emsp;&emsp;（二）行使權利之方式：書面。
                        &emsp;&emsp;六、台端不提供個人資料所致權益之影響（個人資料由當事人直接蒐集之情形適用）：{"\n"}
                        &emsp;&emsp;&emsp;&emsp;台端若未能提供相關個人資料時，本公司將可能延後或無法進行必要之審核及處理作業，因此將婉謝、延遲或無法
                        &emsp;&emsp;&emsp;&emsp;提供台端相關服務。病歷、醫療及健康檢查等個人資料蒐集、
                    </Text>
                    <Text style={styles.title}>
                        病歷、醫療及健康檢查等個人資料蒐集、處理及利用同意書
                    </Text>
                    <Text >
                        &emsp;&emsp;本公司依據個人資料保護法及保險法第177條之1暨其授權辦法等規定，關於病歷、醫療及健康檢查等個人資料所為蒐集、{"\n"}
                        處理及利用，除上述告知書所列告知事項外，就台端個人病歷、醫療及健康檢查等資料之蒐集、處理及利用，將於保險業務之{"\n"}
                        客戶服務招攬、理賠、申訴及爭議處理、公司辦理內部控制及稽核之業務及符合相關法令規範等之目的及範圍內使用。若無法{"\n"}
                        取得台端之蒐集、處理及利用前述資料同意，本公司將可能無法提供台端相關保險業務之申請及辦理。 {"\n\n"}
                        &emsp;&emsp;立同意書人(即要/被保險人），本人已瞭解上述說明，並同意貴公司就本人透過貴公司辦理投保、契約變更或申請理賠時{"\n"}
                        所檢附之病歷、醫療及健康檢查等個人資料於特定目的之必要範圍內，為蒐集、處理或利用。並於符合相關法令規範範圍內將{"\n"}
                        上開資料轉送與貴公司有業務往來之產、壽險公司辦理投保、契約變更或理賠作業。立同意書人併此聲明，此同意書係出於本{"\n"}
                        人意願下所為之意思表示。 {"\n\n"}
                        此致{"\n\n"}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", height: 50 }} >
                        <View style={{ width: 160 }}  >
                            <Text style={{ fontSize: 10 }}>立同意書人（即要/被保險人）簽名：</Text>
                        </View>
                        <View style={{ width: 64, height: 48 }} >
                            {/*
                                (data.sign_1 != "" && data.need_sign) &&
                                <Image src={data.sign_1} />
                            */}
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", height: 50 }} >
                        <View style={{ width: 220 }}  >
                            <Text style={{ fontSize: 10 }}>(配偶/子女亦為被保人時，請一併簽署同意)：</Text>
                        </View>
                        <View style={{ width: 64, height: 48 }} >
                            {/*
                                (data.sign_2 != "" && data.need_sign) &&
                                <Image src={data.sign_2} />
                        */}
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", height: 50 }} >
                        <View style={{ width: 150 }}  >
                            <Text style={{ fontSize: 10 }}>法　 定　 代　 理　 人　簽名：</Text>
                        </View>
                        <View style={{ width: 64, height: 48 }} >
                           
                        </View>
                    </View>                   
                    <Text style={{ fontSize: 10 }}>履行上開告知義務，不限取得當事人簽名，縱無簽署亦不影響告知效力。</Text>
                </View>
            </View>
        </Page>

    )
}

export default PersonalPDFpage