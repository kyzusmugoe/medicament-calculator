
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';

import { useSelector, useDispatch } from 'react-redux';

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
    table: {
        width: "100%",
        backgroundColor: "#000",
        paddingRight: 1,
        paddingBottom: 1
    },
    tr: {
        backgroundColor: "#000",
        flexDirection: "row",
        //marginTop:-1,
        //borderTopWidth:1,
        //borderBottomWidth:1,
        //borderLeftWidth:1,
    },
    td: {
        //borderRightWidth:1,
        backgroundColor: "#fff",
        flexGrow: 1,
        fontSize: 10,
        marginTop: 1,
        marginLeft: 1,
        padding: 1
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
const ResPDF = ({ data }) => {

    console.log(data)
    //const jsonData = useSelector(state => state)    
    const [rawData, setRawData] = useState(data)
    
    useEffect(()=>{
        setRawData(data)
    },[data])
    
    return (
        <Page size="A4" style={styles.page}>
            <View>
                <View style={stylesHader} >
                    <View style={stylesHader.section}>
                        <Image style={stylesHader.logo} src="./assets/logo.jpg" />
                    </View>
                    <View style={stylesHader.section} wrap>
                        <Text style={stylesHader.text}>產出報告</Text>
                    </View>
                </View>
                <View style={styles.table} >
                    
                    <View style={styles.tr} >
                        <View style={{ ...styles.td, width: "100%" }} >
                            <Text >Report</Text>
                            <View style={styles.tr} >
                                <View style={{ ...styles.td, width: "33%" }} >
                                    <Text >日期</Text>
                                </View>
                                <View style={{ ...styles.td, width: "33%" }} >
                                    <Text >實際使用藥物</Text>
                                </View>
                                <View style={{ ...styles.td, width: "33%" }} >
                                    <Text >Prednisolone當量</Text>
                                </View>
                            </View>
                            {
                                rawData.map((item, index)=>{
                                    return(
                                        <View style={styles.tr} >
                                            <View style={{ ...styles.td, width: "12%" }} >
                                                <Text>{item.startDate}</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "4%" }} >
                                                <Text>~</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "12%" }} >
                                                <Text>{item.endDate}</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "15%" }} >
                                                <Text>{item.med}</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "15%" }} >
                                                <Text>{item.mg}mg</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "15%" }} >
                                                <Text>{item.mgday}mg/day</Text>
                                            </View>
                                            <View style={{ ...styles.td, width: "15%" }} >
                                                <Text>{item.mgkgday}mg/kg/day</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>                 
            </View>
        </Page>

    )
}

export default ResPDF