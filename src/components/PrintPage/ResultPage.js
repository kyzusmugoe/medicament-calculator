import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import PrintPDF from '../PrintPDF';
import ResTable from '../ResTable';

const ResultBox = styled('div')`
    font-size:1.2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
`
const BasicView = styled('div')`
    display: flex;
    flex-direction: column;
`

const ResultPage = ({back, }) => {
    const jsonData = useSelector(state => state)    
    return(
        <ResultBox >
            <BasicView>
                <span>姓名：{jsonData.basicData.patientName?jsonData.basicData.patientName:"尚未填寫"}</span>
                <span>年齡：{jsonData.basicData.patientAge?jsonData.basicData.patientAge:0}</span>
                <span>性別：{jsonData.basicData.patientSex == "male"?"男":"女"}</span>
                <span>病歷號碼：{jsonData.basicData.patientSN?jsonData.basicData.patientSN:0}</span>
                <span>體重：{jsonData.basicData.patientKg?jsonData.basicData.patientKg:0}</span>
            </BasicView>
            <ResTable />
            <footer>
                <button onClick={back}>
                    返回
                </button>
                <button 
                    onClick={()=>{window.print()}}
                    >列印報告</button>
            </footer>
                <PrintPDF/>
        </ResultBox>
    )
}


export default ResultPage