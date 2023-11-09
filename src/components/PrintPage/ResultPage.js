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
    .title{        
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            font-size: 1.4em;
            margin: 0;
            font-weight: bold;
        }
    }
`

const BasicView = styled('div')`
    display: flex;
    flex-direction: column;
    padding: 30px;
    width: 100%;
    max-width: 500px;
`

const FooterBox = styled('div')`
    width: 100%;
    max-width: 930px;
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    > button, > a{
        display: flex;
        justify-content: center;
        font-size: 1.1em;
        color: #fff;
        background-color: #777;
        width: 100%;
        max-width: 280px;
        border: none;
        padding: 8px 0;
        transition:  background-color 500ms;
        text-decoration: none;
        :hover{
            background-color: #aaa;
        }
    }
    > a button{
        font-size: inherit;
        color: #fff;
        background: none;
        border: none;
    }
`

const ResultPage = ({back, }) => {
    const jsonData = useSelector(state => state)    
    return(
        <ResultBox className='printPage'>
            <div className='title'>
                <p>STEROID CONVERTER</p>
                <p>數據產出報告</p>
            </div>
            <BasicView>
                <span>姓名：{jsonData.basicData.patientName?jsonData.basicData.patientName:"尚未填寫"}</span>
                <span>年齡：{jsonData.basicData.patientAge?jsonData.basicData.patientAge:"尚未填寫"}</span>
                <span>性別：{
                    jsonData.basicData.patientSex == "male"?"男":
                    jsonData.basicData.patientSex == "female"?"女":
                    "尚未填寫"
                }</span>
                <span>病歷號碼：{jsonData.basicData.patientSN?jsonData.basicData.patientSN:"尚未填寫"}</span>
                <span>體重：{jsonData.basicData.patientKg?jsonData.basicData.patientKg+"kg":"尚未填寫"}</span>
            </BasicView>
            <ResTable />
            <FooterBox>
                <button onClick={back}>
                    返回
                </button>
                
                {
                <PrintPDF/>
                }

                <button 
                    onClick={()=>{window.print()}}
                    >
                    列印報告
                </button>
            </FooterBox>
            {/**
            <PrintPDF preview={true}/>
             */}
        </ResultBox>
    )
}


export default ResultPage