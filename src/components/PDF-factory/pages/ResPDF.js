
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';

import { useSelector, useDispatch } from 'react-redux';


/*
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
*/


// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
       // fontFamily: 'kaiu',
        
        fontFamily: 'NotoSerifTC2',
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
 
    basic:{
        width:600,
        marginTop:30,
        marginBottom:30,
        marginLeft:100,
        fontSize:12
    },
    image: {
        width: 100,
        height: 75
    },
    table: {
        width: "100%",
        //backgroundColor: "#000",
        //paddingRight: 1,
        //paddingBottom: 1
    },
    tr: {
        //backgroundColor: "#000",
        flexDirection: "row",
        //marginTop:-1,
        //borderTopWidth:1,
        //borderBottomWidth:1,
        //borderLeftWidth:1,
    },
    td: {
        //borderRightWidth:1,
        //backgroundColor: "#fff",
        borderWidth:1,
        borderColor:"#000",

        flexGrow: 1,
        fontSize: 10,
        marginTop: 0,
        marginLeft: 0,
        padding: 5,
        textAlign:"center"
    },
});

const stylesHader = StyleSheet.create({
   // flexDirection: 'row',
    paddingLeft:150,
    title:{
       padding: 15,
        justifyContent:'center',
        alignItems:'center',
        width: "100%",

    },
    text: {
        fontSize: 18,
        paddingTop: 10,
        fontWeight:'bold'
    },
    section: {
        flexGrow: 1,
    }
})

// Create Document Component
const ResPDF = ({ data }) => {

    //const jsonData = useSelector(state => state)    
    const [userRaw, setUserRaw] = useState([])
    const [basicData, setBasicData] = useState({})
    const [totalDates, setTotalDates] = useState(0)
    const [totalPrednisolnoe, setTotalPrednisolone] = useState(0)
    
    useEffect(()=>{
        
        if(data && data.userRaw ){
            let tDates =0
            let tPrednisolone =0

            data.userRaw.map(item=>{
                tDates+=item.dayDuration
                tPrednisolone +=(item.mgday*item.dayDuration)
            })
            setTotalDates(tDates)
            setTotalPrednisolone(tPrednisolone)
            

            setUserRaw(data.userRaw)
            setBasicData(data.basicData)
        }
   
    },[data])
    
    return (
        <Page size="A4" style={styles.page} /*debug={true}*/>
            <View>
                <View style={stylesHader.title}>
                    <Text style={stylesHader.text}>STEROID CONVERTER</Text>
                    <Text style={stylesHader.text}>數據產出報告</Text>
                </View>
                {
                    basicData &&
                    <View style={styles.basic}>
                        <Text>姓名：{basicData.patientName?basicData.patientName:"尚未填寫"}</Text>
                        <Text>年齡：{basicData.patientAge?basicData.patientAge:"尚未填寫"}</Text>
                        <Text>性別：{
                            basicData.patientSex == "male"?"男":
                            basicData.patientSex == "female"?"女":
                            "尚未填寫"
                        }</Text>
                        <Text>病歷號碼：{basicData.patientSN?basicData.patientSN:"尚未填寫"}</Text>
                        <Text>體重：{basicData.patientKg?basicData.patientKg+"kg":"尚未填寫"}</Text>            
                    </View>
                }
                <View style={styles.table} >

                    <View style={styles.tr} >
                        <View style={{ width: "100%" }} >
                            <View style={styles.tr} >
                                <View style={{ ...styles.td, width: "33%",  borderRight:"none" }} >
                                    <Text >日期</Text>
                                </View>
                                <View style={{ ...styles.td, width: "33%",  borderRight:"none" }} >
                                    <Text >實際使用藥物</Text>
                                </View>
                                <View style={{ ...styles.td, width: "33%" }} >
                                    <Text >Prednisolone當量</Text>
                                </View>
                            </View>
                            {
                                userRaw &&
                                userRaw.map((item, index)=>{
                                    return(
                                        <View key={"row_"+index} style={styles.tr} >
                                            <View style={{ ...styles.td, width: "12%" , borderTop:"none",  borderRight:"none"}} >
                                                <Text>{item.startDate}</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "4.3%" , borderTop:"none",  borderRight:"none"}} >
                                                <Text>~</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "12%" , borderTop:"none",  borderRight:"none"}} >
                                                <Text>{item.endDate}</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "15%" , borderTop:"none",  borderRight:"none"}} >
                                                <Text>{item.med}</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "15%" , borderTop:"none",  borderRight:"none"}} >
                                                <Text>{item.mg}mg</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "15%" , borderTop:"none",  borderRight:"none"}} >
                                                <Text>{item.mgday}mg/day</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "15%" , borderTop:"none"}} >
                                                <Text>{item.mgkgday}mg/kg/day</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                             <View style={styles.tr} >
                                <View style={{ ...styles.td, width: "33%",  borderRight:"none" }} >
                                    <Text >總共{totalDates}天</Text>
                                </View>
                                <View style={{ ...styles.td, width: "33%",  borderRight:"none" }} >
                                    <Text ></Text>
                                </View>
                                <View style={{ ...styles.td, width: "33%" }} >
                                    <Text >總共劑量：{totalPrednisolnoe.toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>                 
            </View>
        </Page>

    )
}

export default ResPDF