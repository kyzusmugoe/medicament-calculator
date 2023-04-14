
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import { Page, Text, View, Image, Document, StyleSheet, Font } from '@react-pdf/renderer';


import ResPDF from './pages/ResPDF'
//import PersonalPDF from './pages/PersonalPDF'
/*
import LifeRepPDF from './pages/LifeRepPDF'
import PropRepPDF from './pages/PropRepPDF'
import InvestmentPDF from './pages/InvestmentPDF'
import InsuranceStatementPDF from './pages/InsuranceStatementPDF'

import PersonalViewer from './viewers/PersonalViewer'
import LifeRepViewer from './viewers/LifeRepViewer'
import PropRepViewer from './viewers/PropRepViewer'
import InvestmentViewer from './viewers/InvestmentViewer'
import InsuranceStatementViewer from './viewers/InsuranceStatementViewer'
*/
//import { Paper } from '@material-ui/core';
/*
const useStyles = makeStyles({
    paper: {
        backgroundColor: "#aaa",
        color: "#f00",
        padding: 10
    },
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
*/

const HibPDFFile = ({ data }) => {
    /*
        const [rawData, setRawData] = useState([])
        
        useEffect(()=>{
            if(jsonData.jsonData.length > 0){
                setRawData(jsonData.userRaw)
            }
        },[jsonData])
    */
    return (
        <Document>
            <ResPDF data={data}/>
        </Document>
    )
}

export default HibPDFFile