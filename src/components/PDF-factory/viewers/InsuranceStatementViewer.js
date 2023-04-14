
import React,{useState, useEffect, forwardRef, useImperativeHandle} from 'react';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { useSelector } from 'react-redux';



const sign={
    position:"absolute",
    width:64,
    height:48
}

const useStyles = makeStyles({
    card:{
        width:700,
        height:990,
        margin:"0 auto",
        padding:10,
        fontSize:12,
        lineHeight:1.5,
       
        "& li":{
            listStyleType:"trad-chinese-informal",
        }
    },
    header:{
        marginBottom:30
    },
    logo:{
        width:200,
        float:"left"
    },
    title:{
        fontSize:18,
        fontWeight:"bolder",

    },
    
    signArea:{
        position:"relative",
        display: "flex",
        alignItems:"flex-end",
        height:60
    },
    sign1:{ ...sign, top:-4, left:210},
    sign2:{ ...sign, top:-4, left:250},
    sign3:{ ...sign, top:-4, left:200},
    sign4:{ ...sign, top:-4, left:200},
    
  });

// Create Document Component
export default () => {
    const data = useSelector(state => state)
    const classes = useStyles();
    //console.log(data)
    const investment = data.investment
    const propRep = data.propRep
    const renderCheckBox=(items)=>{
        let group=""
        items.list.map((item, index)=>{
            const icon = item.checked === true? "■":"□"            
            group +=(icon+item.name)
        })
        return group
    }



    return(
        <Card className={classes.card}>
            <CardContent >                
                <div className="pdf">
                    <div className={classes.header}>
                        <img className={classes.logo} src="./assets/logo.jpg"/>
                        <p className={classes.title}>投資型商品投保內容確認書</p>
                    </div>
                    <div>                        
                        <img src={data.sign_payman}/>                    
                    </div>
                    <p>中   華   民    國 民國{data.nowDate.year}年{data.nowDate.month}月{data.nowDate.date}日 107.01版</p>
                </div>
            </CardContent>
        </Card>
    )
}

