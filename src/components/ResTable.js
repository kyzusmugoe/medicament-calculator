import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'

const MyTable = styled('table')`
    border:1px solid #333;
    border-collapse: collapse;

    th,td{
        padding:10px;
        border:1px solid #333;
    }
`

const ResTable =()=>{

   
    const jsonData = useSelector(state => state)     
    const [rawData, setRawData] = useState([])
    
    useEffect(()=>{
        if(jsonData.jsonData.length > 0){
            setRawData(jsonData.userRaw)
        }
    },[jsonData])

    return(

        <MyTable>
            <thead>
                    <tr>
                        <th colSpan={3}>日期</th>
                        <th colSpan={2}>實際使用藥物</th>
                        <th colSpan={2}>Prednisolone當量</th>
                    </tr>
                   
                </thead>
                <tbody>
                   
                    {
                        
                        rawData.map((item, index)=>{
                            return(
                                <tr key={"row_"+index}>
                                    <td>{item.startDate}</td>
                                    <td>~</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.med}</td>
                                    <td>{item.mg}mg</td>
                                    <td>{item.mgday}mg/day</td>
                                    <td>{item.mgkgday}mg/kg/day</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
        </MyTable>
    )
}

export default ResTable