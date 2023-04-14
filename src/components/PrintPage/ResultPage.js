import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import ResTable from '../ResTable';

const ResultPage = () => {
    


    return(
        <div >
            <div
                style={{
                    fontSize:24,
                    color:'#333'        
                }}
            >
                <img width={100} src='./assets/logo.jpg'/>
                <ResTable />
            </div>
        </div>
    )

}
export default ResultPage