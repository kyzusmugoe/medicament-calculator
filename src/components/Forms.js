import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'

import ResTable from './ResTable';

const Froms  = ()=>{
    const dispatch = useDispatch()
    const jsonData = useSelector(state => state)
    const [listData, setListData] = useState([])

    const [currentStartDate, setCurrentStartDate] = useState("2023-04-12")
    const [currentEndDate, setCurrentEndDate] = useState("2023-05-12")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentMed, setCurrentMed] = useState("")
    const [currentMg, setCurrentMg] = useState(20)
    const [currentKg, setCurrentKg] = useState(50)
    
    const [currentName, setCurrentName] = useState("")
    const [currentSex, setCurrentSex] = useState("")
    const [currentAge, setCurrentAge] = useState(0)
    const [currentSN, setCurrentSN] = useState("")

    useEffect(()=>{
        if(jsonData.jsonData.length > 0){
            setListData(jsonData.jsonData)
            setCurrentMed(jsonData.jsonData[0].name)
        }
    },[jsonData.jsonData])


    useEffect(()=>{
        
    },[])
   
    const addItem = () =>{ 
        const mgday = currentMg * jsonData.jsonData[currentIndex].day
        const mgkgday = mgday / currentKg

        dispatch({
            type: "SET_USER_RAW",
            userRaw: {
                startDate:currentStartDate,
                endDate:currentEndDate,
                med:currentMed,
                mg:currentMg,
                mgday:mgday,
                mgkgday:mgkgday,
            }
        })
    }


    return(
        <div>
            <div>
                病人姓名
                <input
                    value={currentName} 
                    onChange={event=>{setCurrentName(event.target.value)}}
                />  
            </div>
            <div>
                病人性別
                男<input type="radio" name='sex' value="male" onClick={event=>{setCurrentSex(event.target.value)}}/>  
                女<input type="radio" name='sex' value="female" onClick={event=>{setCurrentSex(event.target.value)}}/>  
                
            </div>
            <div>
                病人姓名
                <input 
                    type='number' min={0} max={200}
                    onChange={event=>{
                        setCurrentAge(event.target.value)
                    }}
                />  
            </div>
            <div>
                病人體重
                <input
                    value={currentKg}                    
                    onChange={
                        event=>{
                            setCurrentKg(event.target.value)
                        }
                    }
                />
                KG
            </div>
            <div>
                用藥起始時間
                <input 
                    type="date"                     
                    value={currentStartDate}
                    max={currentEndDate}
                    onChange={
                        event=>{
                            setCurrentStartDate((event.target.value))
                        }
                    }
                />
            </div>
            <div>
                用藥結束時間
                    <input 
                        type="date" 
                        value={currentEndDate}
                        min={currentStartDate}
                        onChange={
                            event=>{
                                setCurrentEndDate((event.target.value))
                            }
                        }
                    />
            </div>
            <div>
                藥品
                <select onChange={
                    event=>{
                        setCurrentIndex(event.target.value)
                        setCurrentMed(listData[event.target.value].name)
                    }
                }>
                    {
                        listData.map((item, index)=>{
                            return(
                                <option key={"head"+index} value={index}>{item.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                藥品劑量
                <input
                    value={currentMg}
                    onChange={
                        event=>{setCurrentMg(event.target.value)}
                    }/> 
                mg/天
            </div>
            <div>
                <button onClick={addItem}>輸入下一個項目</button>
                {
                    /*
                    <button>結束</button>
                     */
                }
            </div>
            <ResTable />
        </div>
    )
}

export default Froms