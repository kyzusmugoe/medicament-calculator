import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'


const MyTable = styled('table')`
    width: 100%;
    max-width: 1200px;
    border:1px solid #333;
    border-collapse: collapse;
    background-color: #fff;
    th, td{
        font-size: 1.2em;
        padding:10px;
        border:1px solid #ccc;
        text-align: center;
    }
    th{
        width: 33.33%;
        color:#147189;
        font-weight: bolder;
        font-size: 1.2em;
        
        
    }
    td{
        animation-name: fadeIn;
        animation-duration: 600ms;
        @keyframes fadeIn {
            0%{ 
                transform: translateY(-10px);
                opacity:0
            }
            100%{ 
                transform: translateY(0);
                opacity:1
            }
        }
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
        
        <MyTable className='ResTable'>
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
                        <td colSpan={3}>總共{totalDates}天</td>
                        <td colSpan={2}></td>
                        <td colSpan={2}>總共劑量：
                        {
                            //totalPrednisolnoe.toFixed(2)
                            Math.round(totalPrednisolnoe * 100) / 100
                        }</td>
                    </tr>
                </tbody>
        </MyTable>
    )
}

export default ResTable