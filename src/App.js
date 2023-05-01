import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import WebServiceContext from "./webservice/WebServiceContext";

import Froms from './components/Forms';
import FooterBtn from './components/FooterBtn';

import ResultPage from './components/PrintPage/ResultPage'
import styled from 'styled-components';



const MainBox = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 100%;
    height: 100%;
    background-color: #e3e3e3;
    .title{
        color:#fff;
        text-align: center;
        font-size: 1.6em;
        padding: 30px 0;
    }
    .main_logo{
        width: 100%;
        max-width: 200px;
        margin: 30px;
        margin-top: 120px;
        @media screen and (max-width:640px){
            margin: 20px;
            
        }
    }
    .content{
        flex:1 0 auto;
        background-color: #147189;
        width: calc(100% - 200px);
        margin: 50px;
        padding: 50px;
        @media screen and (max-width:640px){
            max-width: calc(100% - 80px);
            width: 100%;
            margin: 20px;
            padding: 20px;
        }
        border-radius: 40px;
        display:flex;
        flex-direction: column;
        align-items: center;
        .n1{
            font-size: 15px;
            text-align: center;
            color:#F36633;
            width: 100%;
            max-width: 600px;
        }
        .n2{
            font-size: 12px;
            text-align: left;
            color:#Fff;
            width: 100%;
            max-width: 800px;
            line-break: anywhere;
            a{
                color:#Fff;
            }
        }
    }
`
const FooterBox = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 100px;
    max-width: 1400px;
    @media screen and (max-width:830px){

        max-width: 600px;
        flex-direction: column;
        align-items: flex-start;
        
    }
    @media screen and (max-width:640px){
        font-size: 15px;
        max-width: 275px;
    }
    div{
        margin-bottom: 30px;
    }
`
const MyApp = () => {
    
    const ws = useContext(WebServiceContext)
    const dispatch = useDispatch()
    const [page, setPage] = useState("forms")

    useEffect(()=>{
        ws.GetJsonData().then(res=>{
            dispatch({
                type: "SET_JSON_DATA",
                jsonData: res
            })
        })
        return
    },[])
    
    return(
        <>
        {
            page == "forms" ?
            <MainBox>
                <img className='main_logo' src="./assets/logo.png"/>
                <div className='content'>
                    <div className='title'>STEROID CALCULATOR</div>
                        <Froms
                            nextEvent={()=>{                                
                                setPage("result")
                            }}
                        />                        
                    <p className='n1'>本工具僅供專業醫療人員參考，無法作為任何診斷與治療之建議或依據。本工具不具備任何儲存或傳輸資料功能，使用資料請遵守《個人資料保護法》之規定。</p>
                    <p className='n2'>
                        Reference:<br/>Nicolaides NC, et al. Glucocorticoid Therapy and Adrenal Suppression. Glucocorticoid Equivalencies. Available from:
                        <a href="https://www.ncbi.nlm.nih.gov/books/NBK279156/table/adrenal_glucocorticoid-therapy-and-adrenal-suppression.T./ (accessed in 2023.2)" target='_blank'>
                            https://www.ncbi.nlm.nih.gov/books/NBK279156/table/adrenal_glucocorticoid-therapy-and-adrenal-suppression.T./ (accessed in 2023.2)
                        </a>
                    </p>
                   
                </div>
                <FooterBox>
                                
                    <div>
                        ©2023 GSK 公司集團或其授權對象<br/>
                        葛蘭素史克藥廠股份有限公司台灣分公司地址： 100 台北市忠孝西路一段 66 號 23 樓<br/>
                        商標為 GSK 公司集團所有或授權使用
                    </div>
                    <div>
                            NP-TW-OOO-OOOO-OOOOOO
                    </div>
                </FooterBox>
               
            </MainBox>
            :
            <ResultPage
                back={()=>{
                    setPage("forms")
                }}
            />
        }
        </>
    )
}
export default MyApp