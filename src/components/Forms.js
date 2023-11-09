import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components'

import ResTable from './ResTable';


import DatePicker from "react-datepicker";
import Select,{ createFilter } from 'react-select';

import "react-datepicker/dist/react-datepicker.css";
//import type { DatePickerProps } from 'antd';

const myButton = css`
    color: #fff;
    background-color: #f36633;
    width: 100%;
    height: 50px;
    border: none;
    font-size: 1.2em;
    transition: color 300ms, background-color 300ms;
    &:hover{
        background-color: #ff9000;
    }
`
const RowBox = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .row{
        display: flex;
        font-size: 18px;
        width: 100%;
        max-width: 600px;
        margin: 5px 0 15px 0;
        margin-right: 160px;
        @media screen and (max-width:900px){
            margin: 5px 0 15px 0;
        }
        @media screen and (max-width:640px){
            margin: 5px 0 15px 0;
            max-width: 100%;
            flex-direction: column;
            align-items: flex-start;
        }
        .LBox{            
            color:#fff;
            flex: 0 0 calc(30% - 20px);
            text-align: right;
            //border: 1px solid red;
            padding: 10px 20px 10px 0;
            position: relative;
            &.must::after{
                content: "*";
                color: #F36633;
                position: absolute;
            }
        }
        .RBox{
            width: 100%;
            flex: 0 0 70%;
            //border: 1px solid green;
        }
        input{
            width: calc(100% - 20px);
            height: calc(100% - 20px);
            padding: 10px;
            margin: 0;
            border: 0;
            font-size: 18px;
        }
        &.notice{
            .RBox{
                border: 1px solid #AD175B;
                position: relative;                
                &::after{
                    font-size: 15px;
                    content: "此欄位尚未填寫";
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 120px;
                    position: absolute;
                    color: #AD175B;
                    background-color: rgb(255, 255, 255);
                    right: 15px;
                    bottom: -15px;
                    padding:5px 10px;
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
            }
           
        }
        
        .addItem{
            ${myButton}
        }
       
        .css-1im77uy-control{ height:44px}
        

    }
    .tableBox{
        width: 100%;
        max-width: 900px;
        overflow-x: auto;
    }
    
    .react-datepicker{
        padding:20px;
        .react-datepicker__header{
            background-color: #fff;
        }
        .react-datepicker__current-month{
            margin-bottom: 10px;
        }
        .react-datepicker__navigation--previous,
        .react-datepicker__navigation--next{
            top:20px
        }
        
        
        .react-datepicker__day{
            border-radius: 50%;
        }
        .react-datepicker__day-name, 
        .react-datepicker__day, 
        .react-datepicker__time-name {
            width: 2.7rem;
            line-height: 2.7rem;
        }
        .react-datepicker__day--keyboard-selected{
            background: #ccc;
            border-radius: 50%;
        }
        .react-datepicker__day--selected{
            background: rgb(255,130,75);
            background: linear-gradient(90deg, rgba(255,130,75,1) 0%, rgba(255,178,56,1) 100%);     
            color: #fff;
            border-radius: 50%;
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
    button.clear{
        color: #999;
        background-color: #eee;
        &:hover{
            color: #000;
            background-color: #fff;
        }   
    }

`
const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

const Row = (title, content, must = false, notice) =>
<div className={'row '+ (notice ? "notice" : "")}>
    <div className={'LBox ' + (must ? "must" : "")}>
        {title}
    </div>
    <div className='RBox'>
        {content}
    </div>
</div>




const Froms = ({ nextEvent }) => {
    const dispatch = useDispatch()
    const jsonData = useSelector(state => state)
    const [listData, setListData] = useState([])

    const [currentStartDate, setCurrentStartDate] = useState(null)
    const [currentEndDate, setCurrentEndDate] = useState(null)
    //const [currentIndex, setCurrentIndex] = useState(0)
    const [currentValue, setCurrentValue] = useState()
    const [currentMed, setCurrentMed] = useState(null)
    const [currentMg, setCurrentMg] = useState()
    const [currentKg, setCurrentKg] = useState()
    const [currentSex, setCurrentSex] = useState(null)
    const [currentAge, setCurrentAge] = useState(undefined)
    
    const [chechKg, setCheckKg] = useState(false)
    const [chechMg, setCheckMg] = useState(false)
    const [chechValue, setCheckValue] = useState(false)    
    const [checkStartDate, setCheckStartDate] = useState(null)
    const [checkEndDate, setCheckEndDate] = useState(null)
    /*
    const [currentName, setCurrentName] = useState("")
    const [currentSex, setCurrentSex] = useState("")
    const [currentSN, setCurrentSN] = useState("")
    */


    useEffect(() => {
        if (jsonData.jsonData.length > 0) {
            setListData(jsonData.jsonData)
            setCurrentMed(jsonData.jsonData[0].label)
            const _now = new Date()
            //setCurrentStartDate(formatDate(new Date()))
            //setCurrentEndDate(formatDate(new Date(Date.now()+(1000*60*60*24))))

            if(jsonData.basicData.patientAge){
                setCurrentAge(jsonData.basicData.patientAge)
            }
            if(jsonData.basicData.patientKg){
                setCurrentKg(jsonData.basicData.patientKg)
            }
            if(jsonData.basicData.patientSex== 'male'){
                setCurrentSex({value: 'male', label: '男'})
            }else if(jsonData.basicData.patientSex== 'female'){
                setCurrentSex({value: 'female', label: '女'})
            }
        }
    }, [jsonData])



    const addItem = () => {
        //檢查項目
        let check = false
        if(currentKg == null    ){ check = true; setCheckKg(true)    }else{ setCheckKg(false)}
        if(currentMg == null    ){ check = true; setCheckMg(true)    }else{ setCheckMg(false)}
        if(currentValue == null ){ check = true; setCheckValue(true) }else{ setCheckValue(false)}
        if(currentStartDate == null ){ check = true; setCheckStartDate(true) }else{ setCheckStartDate(false)}
        if(currentEndDate == null ){ check = true; setCheckEndDate(true) }else{ setCheckEndDate(false)}
        if(check) return


        //const mgday = currentMg * jsonData.jsonData[currentIndex].day
        const mgday = currentMg * currentValue
        const mgkgday = mgday / currentKg

        //經過幾天的換算
        const sd = new Date(currentStartDate)
        const ed = new Date(currentEndDate)
        const byDay = 1000 * 60 * 60 * 24 //毫秒換算成日期
        const dayDuration = (ed.getTime() - sd.getTime()) / (byDay) + 1 //加1的原因是要包含最後一天

        dispatch({
            type: "SET_USER_RAW",
            userRaw: {
                startDate: currentStartDate,
                endDate: currentEndDate,
                med: currentMed,
                mg: currentMg,
                //mgday: mgday.toFixed(2),
                mgday: Math.round(mgday * 100) / 100,
                //mgkgday: mgkgday.toFixed(2),
                mgkgday: Math.round(mgkgday * 100) / 100,
                dayDuration: dayDuration
            }
        })


    }

    const cleanItem = () => {
        dispatch({ type: "CLEAN_USER_RAW" })
    }

    const next = () => {
        nextEvent()
    }    

    return (
        <RowBox>
            {
                Row(
                    "姓名",
                    <input
                        placeholder='請輸入姓名(選填)'
                        value={jsonData.basicData.patientName}
                        onChange={event => {
                            //setCurrentName(event.target.value)
                            const newBasicData = {
                                ...jsonData.basicData,
                                patientName: event.target.value
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
                    <Select
                        placeholder='請選擇性別(選填)'
                        className='react-select'
                        value={currentSex}
                        onChange={option => {
                            setCurrentSex(option.value)
                            const newBasicData = {
                                ...jsonData.basicData,
                                patientSex: option.value
                            }
                            dispatch({
                                type: "SET_BASIC_DATA",
                                basicData: newBasicData
                            })
                        }}
                        options={[
                            { value: 'female', label: '女' },
                            { value: 'male', label: '男' }
                        ]}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                primary: '#f6A934',
                                primary75: '#f6A934',
                                primary50: '#f6A934',
                                primary25: '#ccc',
                            },
                        })}
                    />
                )
            }
            {
                Row(
                    "年齡",
                    <input
                        type='number' min={0} max={200}
                        placeholder='請輸入年齡(選填)'                        
                        value={currentAge}
                        onChange={event => {
                            const newBasicData = {
                                ...jsonData.basicData,
                                patientAge: event.target.value
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
                        value={jsonData.basicData.patientSN}
                        placeholder='請輸入病歷號碼(選填)'
                        onChange={event => {
                            const newBasicData = {
                                ...jsonData.basicData,
                                patientSN: event.target.value
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
                    "病人體重(kg)",
                    <>
                        <input
                            type='number'
                            min={0} max={200}
                            placeholder='請輸入病人體重'
                            value={currentKg ? currentKg : ""}
                            onChange={
                                event => {
                                    setCheckKg(false)
                                    setCurrentKg(event.target.value)
                                    const newBasicData = {
                                        ...jsonData.basicData,
                                        patientKg: event.target.value
                                    }
                                    dispatch({
                                        type: "SET_BASIC_DATA",
                                        basicData: newBasicData
                                    })
                                }
                            }
                        />
                    </>,
                    true,
                    chechKg
                )
            }
            {
                Row(
                    "用藥起始時間",
                    <DatePicker
                        selected={currentStartDate? new Date(currentStartDate):null}
                        // selected={startDate}
                        onChange={date => {
                            setCheckStartDate(false)
                            setCurrentStartDate(formatDate(date))
                        }}
                        maxDate={
                            currentEndDate?
                            new Date(currentEndDate):
                            formatDate(new Date())
                        }
                        placeholderText="請選擇用藥起始時間"
                    />,
                    true,
                    checkStartDate
                )
            }
            {
                Row(
                    "用藥結束時間",
                    <DatePicker
                        selected={currentEndDate? new Date(currentEndDate):null}
                        onChange={date =>{
                            setCheckEndDate(false)                            
                            setCurrentEndDate(formatDate(date))
                        }}
                        minDate={
                            currentStartDate?
                            new Date(currentStartDate):                            
                            new Date(Date.now()+(1000*60*60*24))
                        }
                        placeholderText="請選擇用藥結束時間"
                    />,
                    true,
                    checkEndDate
                )
            }
            {
                Row(
                    "藥品",
                    <Select
                        placeholder='請選擇藥品'                       
                        onChange={option => {
                            //console.log(option)
                            setCheckValue(false)
                            //option.value是拿來做選擇排序的 day才是真正的數值 
                            setCurrentValue(option.value)
                            setCurrentMed(option.label)
                        }}
                        options={listData}
                        selectProps={currentMed}
                        isOptionSelected={(option, selectValue) => selectValue.some(i => i === option)}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            height:"44px",
                            colors: {
                                ...theme.colors,
                                primary: '#f6A934',
                                primary75: '#f6A934',
                                primary50: '#f6A934',
                                primary25: '#ccc',
                            },
                        })}
                    />,
                    true,
                    chechValue
                )
            }
            {/*
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
                    </select>,
                    true
                )
            */}
            {
                Row(
                    "藥品劑量 mg/天",
                    <input
                        value={currentMg}
                        type='number'
                        onChange={
                            event => { 
                                setCheckMg(false)
                                setCurrentMg(event.target.value)
                            }
                        } />,
                    true,
                    chechMg,
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
                    <div className='tableBox'>
                        <ResTable />
                    </div>
                    {/*
                        jsonData.userRaw.map((item,index)=>
                            <span>{item.dayDuration*item.mgday}</span>
                        )
                    */}
                    <FooterBox>
                        <button onClick={cleanItem} className='clear'>清除列表</button>
                        <button onClick={next}>結束輸入</button>
                    </FooterBox>
                </>
            }
        </RowBox>
    )
}

export default Froms