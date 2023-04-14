import React, { useState, useEffect } from 'react'
import { Button, Modal, styled, Paper, Fade, Collapse } from '@material-ui/core/';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const WelcomeDialog = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "& ol": {
        padding: 10
    }
})


const ModalButton = styled(Button)({
    color: "#fff",
    backgroundColor: "#f68901",
    borderRadius: 10,
    margin: 3,
    padding: "5px 15px"
})

const ModalPaper = styled(Paper)({
    maxWidth: 800,
    border: "none",
    padding: 20,
    paddingBottom: 0,
    textAlign: "center"
})

export default ({
    label = "Comfirm",
    alertText = "彈出視窗",
    subText,
    allowLabel = "確定",
    rejectLabel = "取消",
    color = "primary",
    buttonColor = null,
    size = "normal",
    doAllow = () => {
        console.log("not set doAllow")
    },
    disabled = false,
}) => {

    const [myOpen, setMyOpen] = useState(false)

    const [btnDisable, setBtnDisable] = useState(disabled)

    useEffect(() => {
        setBtnDisable(disabled)
    }, [disabled])


    const [btnColor, setBtnColor] = useState()
    const [fontColor, setFontColor] = useState("#fff")


    useEffect(() => {
        
        if (buttonColor && disabled == false) {
            setBtnColor({ backgroundColor: buttonColor })
            setFontColor("#fff")
        }else{
            //setBtnColor({ backgroundColor: "#ccc" })
            //setFontColor("#333")
        }
    }, [buttonColor, disabled])



    return (
        <div style={{ display: "inline", verticalAlign: "-webkit-baseline-middle" }}>
            <Button
                style={{
                    ...btnColor,
                    color: {fontColor},
                    borderRadius: size == "normal" ? 10 : 3,
                    margin: 3,
                    padding: "5px 15px",
                }}
                disabled={btnDisable}
                variant="contained"
                color={color}
                onClick={() => {
                    setMyOpen(true)
                }}
            >{label}</Button>
            <WelcomeDialog open={myOpen} closeAfterTransition >
                <Fade in={myOpen}>

                    <ModalPaper >
                        <ErrorOutlineIcon style={{ fontSize: 100, color: "#f63" }} />
                        <div style={{ padding: "30px 20px" }}>
                            <span style={{ color: "#ED6767", fontSize: 30 }}>{alertText}</span>
                            <p>{subText}</p>
                        </div>

                        <div >
                            <footer style={{ marginBottom: -20 }}>
                                <ModalButton
                                    style={{}}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setMyOpen(false)
                                    }}
                                >{rejectLabel}</ModalButton>
                                <ModalButton
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        doAllow()
                                        setMyOpen(false)
                                    }}
                                >{allowLabel}</ModalButton>
                            </footer>
                        </div>
                    </ModalPaper>
                </Fade>
            </WelcomeDialog>
        </div>
    )
}
