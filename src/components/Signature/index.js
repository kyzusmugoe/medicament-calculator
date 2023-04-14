import React,{useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import Pad from './Pad'

import SignatureCanvas from 'react-signature-canvas';
import { Grid, StepLabel } from '@material-ui/core';

import {
    Error as ErrorIcon,
    Done as DoneIcon,
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
} from '@material-ui/icons';


import PropRep from '../../reducers/fromReducers/PropRep';
import { BorderAll } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    stepper:{
        completed: {
            color:"#f00"
        }
    },
    padContainer: {
      border: '1px solid #666',
      backgroundColor:"#aaa",
      textAlign:"center",
      padding:10  
    },
    pad:{
        margin:"0 auto"
    },
    root: {
        width: '100%',
      },
      button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      actionsContainer: {
        marginBottom: theme.spacing(2),
      },
      resetContainer: {
        padding: theme.spacing(3),
      },
      title:{
          textAlign:"center"
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));

const QontoStepIcon = (props) => {   
    return (
        props.completed?
        <ErrorIcon style={{color:"#F30"}}/>:
        <DoneIcon style={{color:"#03F"}}/>
    );
}


const SignaturePads = ({checkSign, insureType})=>{
    
    

    const sign_1 = useSelector(state => state.sign_1)
    const sign_1_temp = useSelector(state => state.sign_1_temp)

    const sign_2 = useSelector(state => state.sign_2)
    const sign_2_temp = useSelector(state => state.sign_2_temp) 

    const sign_3 = useSelector(state => state.sign_3)
    const sign_3_temp = useSelector(state => state.sign_3_temp) 

    const sign_4 = useSelector(state => state.sign_4)
    const sign_4_temp = useSelector(state => state.sign_4_temp)

    const sign_payman = useSelector(state => state.sign_payman)
    const sign_payman_temp = useSelector(state => state.sign_payman_temp) 
    
    const dispatch = useDispatch()
    const sigCanvas= {}
    const classes = useStyles()
    const [who, setWho] = useState()
    const [myPad, setMyPad] = useState()
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [open, setOpen] = useState(true);

    
    const basicInfo  = useSelector(state => state.basicInfo)
    
    //表單檢查區    
    useEffect(()=>{
       
        //sign3 另外處理，先判斷年齡是否未滿20
        if(parseInt(basicInfo.policyholderAge) < 20 || parseInt(basicInfo.insAge) < 20){
            if(sign_3 !=""){
                checkSign(true)
            }else{
                checkSign(false)
            }
        }

        /*壽險的保費付款人簽章檢查另外處理 */
        if(insureType == "L"){
            if(sign_payman != ""){
                checkSign(true)
            }else{
                checkSign(false)
            }
        }

        if(sign_1 !="" && sign_2 !="" && sign_4 !="" ){
            checkSign(true)
        }else{
            checkSign(false)
        }
        
    },[
        /*需檢查的值*/
        sign_1,
        sign_2,
        sign_3,
        sign_4,
        sign_payman,
    ])
/*
    useEffect(()=>{
        console.log(activeStep)        
    },[activeStep])
*/
   // const [parentSign, setParentSign] = useState(false)
   
    const [formPages, setFormPages] = useState([])

    const PrevSign =()=>{
        setActiveStep(activeStep-1)
    }

    const NextSign =()=>{  
        setActiveStep(activeStep+1)
    }
    
    useEffect(()=>{
        let signList=[
            {
                id:"sign1",
                title:"要保人",
                sign:sign_1,
                signTemp:sign_1_temp,
                dispatcher:(data, tempData)=>{dispatch({type:"SET_SIGN_1", sign_1:data, sign_1_temp:tempData })},
                discription:"此簽章將會使用在【客戶履行個人資料保護法蒐集處理利用告知書】【產險書面分析報告書】【壽險書面分析報告書】【投資型商品投保內容確認書】"
            },{
                id:"sign2",
                title:"被保人",
                sign:sign_2,
                signTemp:sign_2_temp,
                dispatcher:(data, tempData)=>{dispatch({type:"SET_SIGN_2", sign_2:data, sign_2_temp:tempData })},
                discription:"此簽章將會使用在【客戶履行個人資料保護法蒐集處理利用告知書】"
            }
        ]
        
        if(parseInt(basicInfo.policyholderAge) < 20 || parseInt(basicInfo.insAge) < 20 ){
            signList = [
                ...signList,
                {
                    id:"sign3",
                    title:"法定代理人",
                    sign:sign_3,
                    signTemp:sign_3_temp,
                    dispatcher:(data, tempData)=>{dispatch({type:"SET_SIGN_3", sign_3:data, sign_3_temp:tempData })},
                    discription:"此簽章將會使用在【客戶履行個人資料保護法蒐集處理利用告知書"
                }
            ]
        }
        
        //20201214壽險需新增保費付款人簽章
        if(insureType == "L"){
            signList = [          
                ...signList,
                {
                    id:"sign_payman",
                    title:"保費付款人",
                    sign:sign_payman,
                    signTemp:sign_payman_temp,
                    dispatcher:(data, tempData)=>{dispatch({type:"SET_SIGN_PAYMAN", sign_payman:data, sign_payman_temp:tempData })},
                    discription:"此簽章將會使用在【保費來源聲明書】"
                }
            ]
        }
        
        signList = [...signList,
            {
                id:"sign4",
                title:"業務員",
                sign:sign_4,
                signTemp:sign_4_temp,
                dispatcher:(data, tempData)=>{dispatch({type:"SET_SIGN_4", sign_4:data, sign_4_temp:tempData })},
                discription:"此簽章將會使用在【客戶履行個人資料保護法蒐集處理利用告知書】【產險書面分析報告書】【壽險書面分析報告書】【投資型商品投保內容確認書】"
            }
        ]
        //console.log(signList)
        setFormPages(signList)


    },[basicInfo.policyholderAge, basicInfo.insAge, activeStep]) 

    useEffect(() => {
        if(formPages.length>0){
            setWho(formPages[activeStep].title)
        }
    }, [formPages, activeStep])

    const checkerSignIsOK = MyID =>{
        let _checker = true
        switch(MyID){
            case "sign1":
                if(sign_1 !="") _checker = false 
                break;
            case "sign2":
                if(sign_2 !="") _checker = false 
                break;
            case "sign3":
                if(sign_3 !="") _checker = false 
                break;
            case "sign4":
                if(sign_4 !="") _checker = false 
                break;
            case "sign_payman":
                if(sign_payman !="") _checker = false 
                break;
        }
        return _checker
    }
    
    return(
        <div>
            <div style={{textAlign:"center",fontSize:"1.2em"}}>
                請<span style={{color:"#f00"}}>{who}</span>在下方簽名
            </div>
            <div style={{display:"column", justifyContent:"center"}}>
                <div> 
                    <Stepper nonLinear activeStep={activeStep}>
                        {
                            formPages.map((item, index) =>{ 
                                const stepProps = {};
                               
                                return(
                                    <Step key={item.id}  {...stepProps}>
                                        <StepLabel 
                                            className={{
                                                completed:"#0cf",
                                                error:"#0000ff"
                                            }}
                                            completed={checkerSignIsOK(item.id)}
                                            StepIconComponent={QontoStepIcon}
                                            error={checkerSignIsOK(item.id)}                                            
                                        >
                                            {item.title}簽章
                                        </StepLabel>
                                    </Step>
                                )}
                            )
                        }
                    </Stepper>
                </div> 
                <div> 
                {
                    formPages.map((value, index)=>{
                        return(
                            <Collapse key={"pad"+index} in={activeStep == index}>
                                {
                                    /*
                                    <Typography className={classes.title}  gutterBottom>{value.title}</Typography>            
                                     */
                                }
                                <Typography className={classes.title}  gutterBottom>{value.description}</Typography>            
                                <Pad
                                    who={value.title}
                                    defalutValue={value.signTemp}
                                    sendData={(data, tempData)=>{
                                        value.dispatcher(data, tempData)
                                    }}
                                    leftButtons={
                                        formPages.map((row, index)=>{
                                            if(activeStep-1 == index){
                                                return(
                                                    <Button
                                                        key={"LBtn"+index}
                                                        color="primary"
                                                        variant="contained"
                                                        //disabled={formPages[activeStep].sign==""?true:false}                                                        
                                                        onClick={()=>{  setActiveStep(activeStep-1) }}
                                                    >
                                                        <ArrowBackIcon/>
                                                        {row.title}
                                                    </Button>
                                                )
                                            }
                                        })
                                    }

                                    rightButtons={
                                        formPages.map((row, index)=>{
                                            if(activeStep+1 == index){
                                                let id = formPages[activeStep].id
                                                let checker = checkerSignIsOK(id)
                                                return(
                                                    <Button
                                                        key={"RBtn"+index}
                                                        color="primary"
                                                        variant="contained"
                                                        disabled={checker}
                                                        onClick={()=>{ 
                                                            setActiveStep(activeStep+1) 
                                                        }}
                                                    >
                                                        {row.title}                                                        
                                                        <ArrowForwardIcon/>
                                                    </Button>
                                                )
                                            }
                                        })
                                    }

                                />
                            </Collapse>
                        )
                    })
                }
                </div>                   
            </div>
        {/*
        
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={()=>{
                setOpen(false)
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper}>
                <h2 id="transition-modal-title">簽章說明</h2>
                <p id="transition-modal-description">
                    請提供【簽章聲明】的相關提示文字
                </p>
                <Button variant="contained" 
                        color="primary" 
                        onClick={()=>{
                            setOpen(false)
                        }}
                >確定</Button>
            </div>

            </Fade>
        </Modal>
         */}
        </div>
    )
    
}

export default SignaturePads