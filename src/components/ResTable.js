import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'


const MyTable = styled('table')`
    width: 100%;
    max-width: 800px;
    border:1px solid #333;
    border-collapse: collapse;
    background-color: #fff;
    th,td{
        font-size: 1.2em;
        padding:10px;
        border:1px solid #ccc;
    }
    th{
        width: 33.33%;
        color:#147189;
        font-weight: bolder;
        font-size: 1.2em;
    }
`

const ResTable =()=>{

   
    const jsonData = useSelector(state => state)     
    const [rawData, setRawData] = useState([])

    const [totalDates, setTotalDates] = useState(0)
    const [totalPrednisolnoe, setTotalPrednisolone] = useState(0)
    
    useEffect(()=>{
        if(jsonData.jsonData.length > 0){
            setRawData(jsonData.userRaw)

            let tDates =0
            let tPrednisolone =0

            jsonData.userRaw.map(item=>{
                tDates+=item.dayDuration
                tPrednisolone +=(item.mgday*item.dayDuration)
            })
            setTotalDates(tDates)
            setTotalPrednisolone(tPrednisolone)
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

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>總共{totalDates}天</td>
                        <td>總共劑量：{totalPrednisolnoe}</td>
                    </tr>
                </tbody>
        </MyTable>
    )
}

export default ResTable