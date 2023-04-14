import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PrintPDF from './PrintPDF';
import styled from 'styled-components'

const MyApp = ( {changeState, data}) => {
    
    
    const [state, setState] = useState("L")

    const FooterBtns = styled('div')`
        @media print
        {    
            display: none !important;
            
        }
    `
    
    if(state == "L"){
        return(
            <div>
                <button onClick={()=>{ 
                    setState("R")
                    changeState("result")
                }}>結束</button>
            </div>
        )
    }else{
        return(
            <FooterBtns>
                <button  onClick={()=>{ 
                    setState("L")
                    changeState("forms")
                }}>BACK</button>
                <PrintPDF/>
                <button
                    onClick={()=>{
                        window.print()
                    }}
                >PRINT</button>
            </FooterBtns>
        )
    }
}
export default MyApp