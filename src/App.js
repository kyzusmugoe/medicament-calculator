import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import WebServiceContext from "./webservice/WebServiceContext";

import Froms from './components/Forms';
import FooterBtn from './components/FooterBtn';

import ResultPage from './components/PrintPage/ResultPage'



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
        <div>
            {
                page == "forms" ?
                <Froms/>:
                <ResultPage/>
            }
            <FooterBtn
                changeState={state=>{ 
                    setPage(state)
                }}
            />
        </div>
    )
}
export default MyApp