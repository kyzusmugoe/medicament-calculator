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
        width: 200px;
        margin: 30px;
    }
    .content{
        flex:1 0 auto;
        background-color: #147189;
        width: calc(100% - 200px);
        margin: 50px;
        padding: 50px;
        border-radius: 40px;
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
                <img className='main_logo' src="./assets/logo.jpg"/>
                <div className='content'>
                    <div className='title'>STEROID CALCULATOR</div>
                        <Froms
                            nextEvent={()=>{                                
                                setPage("result")
                            }}
                        />                        
                </div>
                {
                    /**
                     * 
                    <FooterBtn
                        changeState={state=>{ 
                            setPage(state)
                        }}
                    />
                    */
                }
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