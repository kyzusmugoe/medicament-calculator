import React,{useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import { useSelector, useDispatch } from 'react-redux';

import SignatureCanvas from 'react-signature-canvas';

const useStyles = makeStyles(theme => ({
    padContainer: {
      border: '1px solid #666',
      backgroundColor:"#aaa",
      textAlign:"center",
      padding:10
    },
    pad:{
        margin:"0 auto"
    }
  }));

const SignaturePad = ({defalutValue, sendData, leftButtons, rightButtons, who})=>{
    

    const sign_1 = useSelector(state => state.sign_1)
    const dispatch = useDispatch()
    const sigCanvas= {}
    const classes = useStyles();
   // const [open, setOpen] = useState(false)
    const [myPad, setMyPad] = useState()
    
    const [mask, setMask] = useState("flex")
    const [myWho, setMyWho] = useState(who)
    //const [defValue] = useState(defalutValue)
    useEffect(() => {
        
        if(myPad && defalutValue){
           myPad.fromData(defalutValue) 
        }

    },[myPad]);
    
    return(
       <div>
            <div  className={classes.padContainer} >
                
                <div style={{backgroundColor:"#fff",width:600, height:400, margin:"0 auto", position:"relative"}}>
                    <div style={{display:mask, justifyContent:"center",alignItems:"center", width:600, height:400, position:"absolute", top:0, left:0, backgroundColor:"rgba(0, 0, 0, 0.6)"}}
                        onClick={()=>{
                            setMask("none")
                        }}
                    >
                        <div style={{color:"#ccc"}}>
                            <div style={{fontSize:"2em"}}>
                                <span style={{color:"#fe0"}}>{myWho}</span>簽章
                            </div>
                            <div>
                                <span>(點選此處開始簽章)</span>
                            </div>
                        </div>
                    </div>
                    <SignatureCanvas 
                        className={classes.pad}
                        maxWidth={8}
                        ref={(ref) => { setMyPad(ref) }}
                        penColor='black'
                        //backgroundColor="white"
                        canvasProps={{width: 600, height: 400, className: 'sigCanvas'}} 
                        fromDataURL={sign_1}
                        onEnd={()=>{
                            const data = myPad.toDataURL("image/png");
                            sendData(data, myPad.toData())
                        }}
                    />
                </div>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <div>
                        {leftButtons}
                    </div>
                    <div>
                        <Button style={{margin:10}} variant="contained" color="default" onClick={()=>{
                            myPad.clear()
                            sendData("", "")//reducer的地方清除    
                        }}>清除</Button>
                        <Button style={{margin:10}} variant="contained" color="default" onClick={()=>{
                            const data = myPad.toData();
                            if (data) {
                                data.pop(); // remove the last dot or line
                                myPad.fromData(data);
                                sendData(myPad.toDataURL("image/png"),  data)//reducer紀錄上一步的動作
                            }
                        }}>復原</Button>    
                    </div>
                    <div>
                        {rightButtons}                             
                    </div>
                </div>
            </div>
            
        </div>
    )
    
}

export default SignaturePad
