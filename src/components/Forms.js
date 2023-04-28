import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled,{css} from 'styled-components'

import ResTable from './ResTable';


const myButton = css`
    color: #fff;
    background-color: #f36633;
    width: 100%;
    height: 50px;
    border: none;
    font-size: 1.2em;
`
const RowBox = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .row{
        display: flex;
        width: 100%;
        max-width: 600px;
        margin: 5px 0;
        margin-right: 160px;
        .LBox{
            color:#fff;
            flex: 0 0 calc(30% - 20px);
            text-align: right;
            //border: 1px solid red;
            padding: 10px 20px 10px 0;
        }
        .RBox{
            flex: 0 0 70%;
            //border: 1px solid green;
        }
        input{
            width: calc(100% - 20px);
            height: calc(100% - 20px);
            padding: 10px;
            margin: 0;
            border: 0;
        }
        select{
            width: 100%;
            height: 100%;
            padding: 10px;
            option{
            }
        }
        .addItem{
            ${myButton}
        }
    }
`
const FooterBox = styled('div')`
    display: flex;
    width: 100%;
    max-width: 800px;
    justify-content: space-between;
    margin-top: 10px;
    button{
        ${myButton}
        width: 300px;
    }

`

const Froms  = ({nextEvent})=>{
    const dispatch = useDispatch()
    const jsonData = useSelector(state => state)
    const [listData, setListData] = useState([])

    const [currentStartDate, setCurrentStartDate] = useState("2023-04-12")
    const [currentEndDate, setCurrentEndDate] = useState("2023-05-12")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentMed, setCurrentMed] = useState("")
    const [currentMg, setCurrentMg] = useState(20)
    const [currentKg, setCurrentKg] = useState()
    
    /*
    const [currentName, setCurrentName] = useState("")
    const [currentSex, setCurrentSex] = useState("")
    const [currentAge, setCurrentAge] = useState(0)
    const [currentSN, setCurrentSN] = useState("")
    */
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

        
        //經過幾天的換算
        const sd = new Date(currentStartDate)
        const ed = new Date(currentEndDate)
        const byDay = 1000*60*60*24 //毫秒換算成日期
        const dayDuration = (ed.getTime()-sd.getTime())/(byDay)+1 //加1的原因是要包含最後一天

        dispatch({
            type: "SET_USER_RAW",
            userRaw: {
                startDate:currentStartDate,
                endDate:currentEndDate,
                med:currentMed,
                mg:currentMg,
                mgday:mgday.toFixed(2),
                mgkgday:mgkgday.toFixed(2),
                dayDuration:dayDuration
            }
        })

        
    }

    const cleanItem = ()=>{
        dispatch({ type: "CLEAN_USER_RAW"})
    }

    const next = ()=>{
        nextEvent()
    }

   
    const Row = (title, content)=>
        <div className='row'>
            <div className='LBox'>
                {title}
            </div>
            <div className='RBox'>
                {content}
            </div>
        </div>

    return(
        <RowBox>
            {
                Row(
                    "姓名",
                    <input
                        placeholder='請輸入姓名（選填）'
                        value={jsonData.patientName} 
                        onChange={event=>{
                        //setCurrentName(event.target.value)
                        const newBasicData = {
                            ...jsonData.basicData,
                            patientName:event.target.value
                        }
                        dispatch({
                            type: "SET_BASIC_DATA",
                            basicData: newBasicData
                        })
                    }}
                />)
            }
            {
                Row(
                    "性別",
                        <select onChange={
                            event=>{
                                const newBasicData = {
                                    ...jsonData.basicData,
                                    patientSex:event.target.value
                                }
                                dispatch({
                                    type: "SET_BASIC_DATA",
                                    basicData: newBasicData
                                })
                            }
                        }>
                            <option value={"male"}>男</option>
                            <option value={"femail"}>女</option>                            
                    </select>                       
                )
            }           
            {
                Row(
                    "年齡",
                    <input 
                        type='number' min={0} max={200}
                        onChange={event=>{
                            const newBasicData = {
                                ...jsonData.basicData,
                                patientAge:event.target.value
                            }
                            dispatch({
                                type: "SET_BASIC_DATA",
                                basicData: newBasicData
                            })
                        }}
                    /> 
                )
            }
            {
                Row(
                    "病歷號碼",
                    <input 
                        onChange={event=>{
                            const newBasicData = {
                                ...jsonData.basicData,
                                patientSN:event.target.value
                            }
                            dispatch({
                                type: "SET_BASIC_DATA",
                                basicData: newBasicData
                            })
                        }}
                    /> 
                )
            }
            {
                Row(
                    "病人體重（KG）",
                    <input
                        type='number'
                        min={0} max={200}
                        placeholder='請輸入病人體重'
                        value={currentKg?currentKg:""}                    
                        onChange={
                            event=>{
                                setCurrentKg(event.target.value)
                                const newBasicData = {
                                    ...jsonData.basicData,
                                    patientKg:event.target.value
                                }
                                dispatch({
                                    type: "SET_BASIC_DATA",
                                    basicData: newBasicData
                                })
                            }
                        }
                    />
                )
            }
            {
                 Row(
                    "用藥起始時間",
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
                )
            }
            {
                Row(
                    "用藥結束時間",
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
                )
            }
            {
                Row(
                    "藥品",
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
                )
            }
            {
                Row(
                    "藥品劑量 mg/天",
                    <input
                        value={currentMg}
                        onChange={
                            event=>{setCurrentMg(event.target.value)}
                    }/> 
                        
                )
            }
            {
                Row(
                    "",
                    <button className='addItem' onClick={addItem}>輸入下一個項目</button>
                )
            }
            <div>
                {
                    /*
                    <button>結束</button>
                     */
                }
            </div>
            
            {
                jsonData.userRaw.length > 0 &&
                <>
                    <ResTable />
                    {/*
                        jsonData.userRaw.map((item,index)=>
                            <span>{item.dayDuration*item.mgday}</span>
                        )
                    */}
                    <FooterBox> 
                        <button onClick={cleanItem}>清除列表</button>
                        <button onClick={next}>結束輸入</button>
                    </FooterBox>
                </>
            }
        </RowBox>
    )
}

export default Froms