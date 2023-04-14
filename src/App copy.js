import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BasicInfoForm from './components/HIB-forms/BasicInfoForm'
import PersonalForm from './components/HIB-forms/PersonalForm'
import LifeRepForm from './components/HIB-forms/LifeRepForm'
//import InsuranceStatementForm from './components/HIB-forms/InsuranceStatementForm'
import PropRepForm from './components/HIB-forms/PropRepForm'
import InvestmentForm from './components/HIB-forms/InvestmentForm'
import SignPad from './components/Signature'
import WebServiceContext from './webservice/WebServiceContext'
import DialogButton from './components/DialogButton'


import { pdf, PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';

import { /*HibPDFViewer,*/ HibPDFFile } from './components/PDF-factory'
//import LifePDF from './components/PDF-factory/LifePDF'
//import PropRepPDF from './components/PDF-factory/PropRepPDF'

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CountriresCode from './components/HIB-forms/FormsUIcomponents/CountriresCode'

import Tooltip from '@material-ui/core/Tooltip';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { saveAs } from "file-saver";

import ReactGA, { set } from 'react-ga';

import {
    NavigateNext as NavigateNextIcon,
    Reply as ReplyIcon,
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    Save as SaveIcon,
    Redo as RedoIcon,
    CloudUpload as CloudUploadIcon
} from '@material-ui/icons';

//react-scoll
import { Link, Element, animateScroll as scroll } from "react-scroll";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//GA設定
ReactGA.initialize('UA-155703268-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        paddingBottom: 50
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

const countriresCode = CountriresCode

const MyApp = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const myData = useSelector(state => state)
    const insStateChecker = useSelector(state => state.lifeRep.insuredType.list[2].checked)
    const [activeStep, setActiveStep] = React.useState(0)
    const [insMode, setInsMode] = React.useState('online')//模式兩種：online(預設)|download
    const webservice = useContext(WebServiceContext)
    let needPDF = true//判斷是否需要傳送PDF
    let insureType = "";
    let finalStep = 4;//控制step在何處時產生PDF
    const _url = new URL(document.location.href)
    const insurer = _url.searchParams.get('insurer')
    const tempFileUid = _url.searchParams.get('TempFileUid')

    let insType = "";
    let formPages = [];
    let description = [
        "請勾選個人資料蒐集條款",
        "請填入客戶基本資料，紅色必填欄位全部完成後可執行下一步",
        "請依照客戶需求完成此份表單，必填欄位完成後即可執行下一步",
        "請依序完成各項簽名，完成簽名後點選下一步進行預覽",
        "確認書面分析報告書的資料是否正確，確認完成後點選下方的送出按鈕完成本次的書份分析報告",
    ];


    //#region 判斷 insurer

    //20210612 新增讀取外部的json檔判斷公司類型
    if (webservice.comps) {
        webservice.comps.map(comp => {
            if (comp.insurer == insurer) {
                insType = comp.type;
            }
        })
    }
    if (insType == 'pass') {
        formPages = [
            { id: "personal", title: "個人資料告知書" }
        ]
        needPDF = false;
    } else if (insType == "life30") {
        insureType = "L"
        formPages = [
            { id: "personal", title: "個人資料告知書", view: true, nextStepText: "下一步" },
            { id: "basicInfo", title: "基本資料", nextStepText: "下一步" },
            { id: "lifeRep", title: "【人身保險商品】書面分析報告", view: true, nextStepText: ["行動投保", "-客戶在現場(下一步，線上簽名)"]  },
            { id: "insuranceStatement", title: "保費來源聲明書", view: true, disabled: true, nextStepText: "下一步" },
            { id: "sign", title: "簽署板", nextStepText: "下一步" },
            { id: "previewPDF", title: "預覽" }
        ]
        // finalStep = formPages.length - 2
        finalStep = 4
    } else if (insType == "life") {
        insureType = "L"
        formPages = [
            { id: "personal", title: "個人資料告知書", view: true, nextStepText: "下一步" },
            { id: "basicInfo", title: "基本資料", nextStepText: "下一步" },
            { id: "lifeRep", title: "【人身保險商品】書面分析報告", view: true, nextStepText: "下一步" },
            { id: "insuranceStatement", title: "保費來源聲明書", view: true, disabled: true, nextStepText: "下一步" },
            { id: "sign", title: "簽署板", nextStepText: "下一步" },
            { id: "previewPDF", title: "預覽" },
        ]
        finalStep = formPages.length - 2
    } else if (insType == "prop") {
        insureType = "P"
        formPages = [
            { id: "personal", title: "個人資料告知書", view: true, description: "請勾選個人資料蒐集條款", nextStepText: "下一步" },
            { id: "basicInfo", title: "基本資料", description: "請填入客戶基本資料，紅色必填欄位全部完成後可執行下一步", nextStepText: "下一步" },
            { id: "propRep", title: "財產保險/強制or任意汽車責任保險/旅行平安保險 書面分析報告", view: true, description: "請依照客戶需求完成此份表單，必填欄位完成後即可執行下一步", nextStepText: "下一步" },
            { id: "sign", title: "簽署板", description: "請依序完成各項簽名，完成簽名後點選下一步進行預覽", nextStepText: "下一步" },
            { id: "previewPDF", title: "預覽", description: "確認書面分析報告書的資料是否正確，確認完成後點選下方的送出按鈕完成本次的書份分析報告", nextStepText: "下一步" },
        ]
        finalStep = formPages.length - 1
    } else {
        formPages = [
            { id: "loadiing", title: "讀取中請稍後..." }
        ]
        //這邊到時候要用 window.location.href
        description = ["請勾選個人資料蒐集條款，確認完成後點選右下角按鈕執行行動投保系統"]
    }

    //#endregion 判斷 insurer
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setOpenNextTooltip(false)
        setOpenSnackbar(true)
    };

    const handleBack = () => {
        /*if (activeStep == finalStep) {
            console.log("final")
        }*/
        if (insMode == "download" && activeStep == finalStep) {
            setActiveStep(2)
            setInsMode("online");//恢復PDF至線上流程模式
            //恢復PDF需要簽名
            dispatch({
                type: "NEED_SIGN",
                need_sign: true
            })
        } else {
            setActiveStep(prevActiveStep => prevActiveStep - 1);
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const setTempChecker = (check) => {
        setTempAccess(check)
    }

    const formCheckHandler = (check) => {
        setFormAccess(check)
    }

    //表單通過驗證
    //const [personalAccess, setPersonalAccess] = useState(false)
    const [formAccess, setFormAccess] = useState(false)
    const [tempAccess, setTempAccess] = useState(false)
    const [readyToUpload, setReadyToUpload] = useState(true)
    const [checkMessage, setCheckMessage] = useState({})

    const [canUpload, setCanUpload] = useState(true)

    //民國生日轉年齡
    const birthToAge = (year, month, data) => {
        const birth = (1911 + year) + "/" + month + "/" + data
        const _year = 1000 * 60 * 60 * 24 * 365;
        const now = new Date();
        const birthday = new Date(birth);
        return Math.round((now - birthday) / _year);
    }

    const basicInfo = useSelector(state => state.basicInfo)
    const lifeRep = useSelector(state => state.lifeRep)
    const propRep = useSelector(state => state.propRep)
    let uploadData;

    //製作PDF
    //20201103新增PDF放大縮小的控制    
    const [numPages, setNumPages] = useState([]);
    const [pageButtons, setPageButtons] = useState([])
    const [PDFscale, setPDFscale] = useState(1)
    const [pageNumber, setPageNumber] = useState(1);
    const [tempPDF, setTempPDF] = useState("")//PDF資料，完成PDF製作後會先蒐集PDF的base64字串到這裡，在透過按鈕送到server
    const [tempPDFBlob, setTempPDFBlob] = useState(null)//PDF資料，完成PDF製作後會先蒐集PDF的blob，手動下載使用
    //const [tempPDF2, setTempPDF2] = useState("")//PDF資料，完成PDF製作後會先蒐集PDF的base64字串到這裡，在透過按鈕送到server

    const makePDf = () => {
        pdf(<HibPDFFile data={myData} layout={formPages} />).toBlob().then(blob => {
            var reader = new FileReader();
            reader.readAsDataURL(blob)
            reader.onload = (e) => {
                setTempPDF(reader.result)
            }

            //20210824
            setTempPDFBlob(blob)

        })
    }

    const onDocumentLoadSuccess = pdf => {
        setNumPages(pdf.numPages);
        let btns = []
        for (let i = 1; i <= pdf.numPages; i++) {
            btns.push(i)
        }
        setPageButtons(btns)

        pdf.getData().then((res) => {
            //console.log(res)
        })
    }


    /*返回列表的控制項 */
    const [redirectToListOpen, setRedirectToListOpen] = useState(false);
    const backToList = () => {
        window.location.href = "../../html/MobPSlist.html?insurer=" + insurer + "&insureType=" + insureType;
    }
    useEffect(() => {
        /*
        //判斷一定要從Portal進入
        if (!document.referrer.match(/MobPSlist/i)) {
            setRedirectToListOpen(true)
        }*/
    }, [insurer, redirectToListOpen])

    useEffect(() => {
        if (activeStep == finalStep) {
            makePDf()
        }
        scroll.scrollTo(80 * activeStep);
    }, [activeStep])


    useEffect(() => {
        if (tempPDF != "" && activeStep == finalStep) {
            setCanUpload(false)//開啟上傳按鈕
        } else {
            setCanUpload(true)//關閉上傳按鈕
        }
    }, [tempPDF, activeStep])


    //#region 收集資料 collectData()
    const collectData = () => {
        //處理資料已符合上傳格式
        uploadData = {
            ...basicInfo,
            insureType: insureType,
            policyholderSex: basicInfo.policyholderSex.list[0].checked == true ? 1 : 2,
            policyholderCountry: (() => {
                let _cid = "TW";
                countriresCode.map((item) => {
                    if (item.value == basicInfo.policyholderCountry)
                        _cid = item.id
                })
                return _cid
            })(),
            policyholderJobCode: (() => {
                let _value = "";
                basicInfo.policyholderJobCode.list.map((item) => {
                    if (item.checked)
                        _value = item.value
                })
                return _value
            })(),
            policyholderTitleCode: (() => {
                let _value = "";
                basicInfo.policyholderTitleCode.list.map((item) => {
                    if (item.checked)
                        _value = item.value
                })
                return _value
            })(),
            insuredSex: basicInfo.insuredSex.list[0].checked == true ? 1 : 2,
            insCountry: (() => {
                let _cid = "TW";
                countriresCode.map((item) => {
                    if (item.value == basicInfo.insCountry)
                        _cid = item.id
                })
                return _cid
            })(),
            formData: insureType == "L" ? lifeRep : propRep,
            investment: myData.investment,
            insuredJob: basicInfo.insuredJob,
            riskTypeA: basicInfo.riskTypeA,
            riskTypeB: basicInfo.riskTypeB,
            //prop的資料
            carID: basicInfo.carID,//車牌號碼
            carType: basicInfo.carType,//車種
        }
        console.log("uploadData", uploadData)
    }
    //#endregion

    //#region saveTempFile() 儲存暫存資料
    const saveTempFile = () => {
        collectData();
        webservice.asyncSaveTempFile(uploadData).then((res) => {
            console.log("asyncSaveTempFile", res)
            if (res) {
                alert('已暫存！將導回到列表');
                var url = "../../html/MobPSlist.html?insurer=" + insurer + "&insureType=" + insureType;
                window.location.href = url;
                ReactGA.event({
                    category: '書面分析報告系統',
                    action: '暫存成功',
                    label: "insurer:" + insurer + ',' + "TempFileUid:" + res[0].TempFileUid
                });
            } else {
                alert('此單已進入審核階段，無法暫存');
                ReactGA.event({
                    category: '書面分析報告系統',
                    action: '此單已進入審核階段，無法暫存',
                    label: "insurer:" + insurer + ',' + "TempFileUid:" + res[0].TempFileUid
                });
            }
        });
    }
    //#endregion saveTempFile 儲存暫存資料
    const saveDataPdfFile = () => {
        collectData()
        webservice.asyncUploadPDF(tempPDF, myData.basicInfo, uploadData).then((res) => {
            var url = "../../html/MobPSlist.html?insurer=" + insurer + "&insureType=" + insureType;
            if (res.pdfRes == "[OK]") {
                alert("上傳成功，將導回列表")
                window.location.href = url;
                ReactGA.event({
                    category: '書面分析報告系統',
                    action: '上傳成功',
                    label: "insurer:" + insurer + ',' + "TempFileUid:" + res.result[0].TempFileUid
                });
            } else {
                alert("上傳失敗，請聯絡資訊部")
                ReactGA.event({
                    category: '書面分析報告系統',
                    action: '上傳失敗',
                    label: "insurer:" + insurer + ',' + "TempFileUid:" + res.result[0].TempFileUid
                });
            }
        })
    }

    //20210823 儲存後下載，使用blob方式
    const saveDataAndDownload = () => {
        collectData();
        webservice.asyncSaveTempFileForDownload(uploadData).then((res) => {
            //console.log("saveDataAndDownload", res)
            if (res) {
                var url = "../../html/MobPSlist.html?insurer=" + insurer + "&insureType=" + insureType;
                //window.location.href = url;
                ReactGA.event({
                    category: '書面分析報告系統',
                    action: '儲存成功(純下載)',
                    label: "insurer:" + insurer + ',' + "TempFileUid:" + res[0].TempFileUid
                });
                return true
            } else {
                alert('此單已進入審核階段，無法暫存');
                ReactGA.event({
                    category: '書面分析報告系統',
                    action: '此單已進入審核階段，無法暫存',
                    label: "insurer:" + insurer + ',' + "TempFileUid:" + res[0].TempFileUid
                });
                return false
            }
        }).then(res => {
            if (res) {
                var timeInMs = Date.now();
                saveAs(
                    tempPDFBlob,
                    "HIB" + timeInMs + ".pdf"
                )
                window.open(URL.createObjectURL(tempPDFBlob), '_self');


            }
        })
    }

    const dataURItoBlob = base64Data => {
        //console.log(base64Data);//data:image/png;base64,
        var byteString;
        if (base64Data.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(base64Data.split(',')[1]);//base64 解碼
        else {
            byteString = unescape(base64Data.split(',')[1]);
        }
        var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];//mime型別 -- image/png

        // var arrayBuffer = new ArrayBuffer(byteString.length); //建立緩衝陣列
        // var ia = new Uint8Array(arrayBuffer);//建立檢視
        var ia = new Uint8Array(byteString.length);//建立檢視
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ia], {
            type: mimeString
        });
        return blob;
    }

    //20210817 暫時停用：改隱藏重要個資後就下載
    const uploadPdfAndGetEncryptPDF = () => {
        collectData()
        webservice.asyncUploadPDFAndGetPDF(tempPDF, myData.basicInfo, uploadData).then((res) => {
            //*下載PDF，使用saveAs套件            
            saveAs(
                "data:application/pdf;base64," + res.pdfRes.fileString,
                "example.pdf"
            )
        })
    }

    useEffect(() => {

        //取得login資料
        webservice.asyncLogin().then((res) => {
            dispatch({
                type: "SET_LOGIN_INFO",
                loginInfo: res
            })
        });

        //抓取暫存資料
        if (tempFileUid && tempFileUid != "NEW") {
            webservice.asyncTempFileUid().then((res) => {
                const _d = res[0]
                const _pSex = _d.要保人性別代碼 == 1 ? true : false;
                const _iSex = _d.被保人性別代碼 == 1 ? true : false;
                const _pCountry = _d.要保人國籍 == "TW" ? true : false;
                //const _iCountry = _d.被保人國籍 == "TW"?true:false;  
                const psJson = JSON.parse(_d.PSjson)

                dispatch({
                    type: "SET_TEMP_DATA",
                    basicInfo: {
                        ...basicInfo,
                        "policyholderName": _d.要保人姓名,//要保人姓名
                        "policyholderAge"://要保人年齡
                            birthToAge(
                                parseInt(_d.要保人生日[0] + _d.要保人生日[1] + _d.要保人生日[2]),//
                                parseInt(_d.要保人生日[3] + _d.要保人生日[4]),
                                parseInt(_d.要保人生日[5] + _d.要保人生日[6])
                            ),
                        "policyholderID": _d.要保人身份證號,//要保人身分證字號
                        "policyholderSex": {//要保人性別
                            list: [
                                { id: "male", name: "男", value: "male", checked: _pSex },
                                { id: "female", name: "女", value: "female", checked: !_pSex },
                            ]
                        },
                        "policyholderBirthYear": parseInt(_d.要保人生日[0] + _d.要保人生日[1] + _d.要保人生日[2]),//要保人出生年月日
                        "policyholderBirthMonth": parseInt(_d.要保人生日[3] + _d.要保人生日[4]),//要保人出生年月日
                        "policyholderBirthDate": parseInt(_d.要保人生日[5] + _d.要保人生日[6]),//要保人出生年月日
                        "policyholderPhone": _d.要保人手機,//要保人電話
                        "policyholderCountry": (() => {
                            let _cValue = "台灣";
                            countriresCode.map((item) => {
                                if (item.id == _d.要保人國籍)
                                    _cValue = item.value
                            })
                            return _cValue
                        })(),//要保人國籍
                        "policyholderPostCode": _d.要保人所在鄉鎮代碼,//要保人郵遞區號
                        "policyholderAddress": _d.要保人住址,//要保人地址   
                        "policyholderTitleCode": {//要保人:職位名稱代碼(0一般,1董事長,2總經理,3副總經理)
                            list: myData.basicInfo.policyholderTitleCode.list.map((value, index) => {
                                index == parseInt(_d.要保人職位) ? value.checked = true : value.checked = false
                                return value
                            })
                        },
                        "policyholderJobCode": {//要保人:職業代碼(0一般,1軍火商,2珠寶商,3銀樓業者,4執業律師,5執業會計,6典當業,7博弈業)
                            list: myData.basicInfo.policyholderJobCode.list.map((value, index) => {
                                index == parseInt(_d.要保人職業) ? value.checked = true : value.checked = false
                                return value
                            })
                        },

                        "citizenship": {//要保人國籍
                            list: [
                                { id: "local", name: "本國人", value: "local", checked: _pCountry },
                                { id: "foreign", name: "外國人", value: "foreign", checked: !_pCountry },
                            ],
                        },
                        //被保人
                        "insuredName": _d.被保人姓名,//被保人姓名
                        "insuredSex": {//被保人性別
                            list: [
                                { id: "male", name: "男", value: "male", checked: _iSex },
                                { id: "female", name: "女", value: "female", checked: !_iSex },
                            ]
                        },
                        "insAge": birthToAge(
                            parseInt(_d.被保人生日[0] + _d.被保人生日[1] + _d.被保人生日[2]),//
                            parseInt(_d.被保人生日[3] + _d.被保人生日[4]),
                            parseInt(_d.被保人生日[5] + _d.被保人生日[6])
                        ),//要保人年齡,
                        "insIdentity": _d.被保人身份證號,//被保人身分證字號
                        "insBirthYear": parseInt(_d.被保人生日[0] + _d.被保人生日[1] + _d.被保人生日[2]),//被保人出生年月日
                        "insBirthMonth": parseInt(_d.被保人生日[3] + _d.被保人生日[4]),//被保人出生年月日
                        "insBirthDate": parseInt(_d.被保人生日[5] + _d.被保人生日[6]),//被保人出生年月日
                        "insPhone": _d.被保人手機,//被保人電話
                        "insCountry": (() => {
                            let _cValue = "台灣";
                            if (psJson.insCountry) {
                                countriresCode.map((item) => {
                                    if (item.id == psJson.insCountry)
                                        _cValue = item.value
                                })
                            }
                            return _cValue
                        })(),//被保人國籍
                        "insPostCode": _d.被保人所在鄉鎮代碼,//被保人郵遞區號
                        "insAddress": _d.被保人住址,//被保人地址
                        "insuredJob": psJson.insuredJob ? psJson.insuredJob : basicInfo.insuredJob,//被保人職業 
                        "riskTypeA": psJson.riskTypeA ? psJson.riskTypeA : basicInfo.riskTypeA,
                        "riskTypeB": psJson.riskTypeB ? psJson.riskTypeB : basicInfo.riskTypeB,
                        "carID": psJson.carID ? psJson.carID : basicInfo.carID,//車牌號碼
                        "carType": psJson.carType ? psJson.carType : basicInfo.carType,//車種   
                        "isOver65": psJson.isOver65 ? psJson.isOver65 : basicInfo.isOver65,//是否高齡   
                        "relationship": psJson.relationship ? psJson.relationship : basicInfo.relationship//要被保人關係  
                    },
                    insureType: insureType,
                    formData: psJson.formData,
                    investment: psJson.investment
                })
            });
        }
    }, [insType])


    const [nextBtnColor, setNextBtnColor] = useState("inherit")
    
    //#region 20210201 新增Snackbar提示訊息
    const [openSnackbar, setOpenSnackbar] = useState(true)
    const [openNextTooltip, setOpenNextTooltip] = useState(false)
    useEffect(() => {
        if (formAccess == true) {
            setOpenNextTooltip(true)
        }
    }, [formAccess])
    //#endregion 20210201 新增Snackbar提示訊息

    const downloadPDF = () => {
        console.log(tempPDF)
    }

    return (
        <div className={classes.root}>
            {/*
            <Button onClick={()=>{makePDf()}}>makePDf</Button>
             */}
            <Stepper activeStep={activeStep} orientation="vertical" >
                {
                    formPages.map((item, index) => {
                        if (item.disabled == true) {
                            //console.log(item.title+"=>關閉")
                            return
                        }
                        return (
                            <Step key={item.id} >
                                <StepLabel
                                    style={{ cursor: "pointer" }}
                                    onClick={(event) => {
                                        activeStep > index + 1 && // personalAccess &&
                                            setActiveStep(index)
                                    }}
                                >
                                    <span id={"labelID-" + index} style={{ color: "#729a1f", fontSize: "1.6em", fontWeight: "bolder" }}>{item.title}</span>
                                </StepLabel>
                                <StepContent>
                                    <Element name={"scroll_" + index} >
                                        <div className={classes.actionsContainer}>
                                            {
                                                item.id === "loading" &&
                                                <div>...</div>
                                            }
                                            {
                                                item.id === "personal" &&
                                                <PersonalForm
                                                    checkForm={(checker) => {
                                                        setFormAccess(checker)
                                                    }}
                                                />
                                            }
                                            {
                                                item.id === "basicInfo" &&
                                                <BasicInfoForm
                                                    insureType={insureType}
                                                    checkForm={(checker) => {
                                                        setTempChecker(checker)
                                                        setFormAccess(checker)
                                                    }}
                                                    checkMessage={(message) => {
                                                        console.log(message)
                                                        setCheckMessage(message)
                                                    }}
                                                />
                                            }
                                            {
                                                item.id === "propRep" &&
                                                <PropRepForm checkForm={formCheckHandler} />
                                            }
                                            {
                                                item.id === "lifeRep" &&
                                                <div>
                                                    <LifeRepForm checkForm={formCheckHandler} />
                                                    {
                                                        insStateChecker &&
                                                        <div>
                                                            <span style={{ color: "#729a1f", fontSize: "1.6em", fontWeight: "bolder" }}>投資型商品投保內容確認書</span>
                                                            <InvestmentForm checkForm={formCheckHandler} />
                                                        </div>
                                                    }
                                                </div>
                                            }
                                            {
                                                /*
                                                    item.id === "insuranceStatement" && 
                                                    <div>
                                                        <InsuranceStatementForm checkForm={formCheckHandler} />                        
                                                    </div>
                                                */
                                            }
                                            {
                                                item.id === "sign" &&
                                                <SignPad insureType={insureType} checkSign={formCheckHandler} />
                                            }
                                            {
                                                item.id === "preview" &&
                                                <div>
                                                    <PDFDownloadLink
                                                        document={
                                                            <HibPDFFile data={myData} layout={formPages} />
                                                        }
                                                        fileName="somename.pdf"
                                                    >
                                                        {

                                                            ({ blob, url, loading, error }) => (
                                                                loading ? 'Loading document...' : <Button target="_blank" className={classes.button}>下載PDF(測試檢查使用，正式版會移除)</Button>
                                                            )

                                                        }
                                                    </PDFDownloadLink>
                                                    {
                                                        /*
                                                            <Modal
                                                                aria-labelledby="transition-modal-title"
                                                                aria-describedby="transition-modal-description"
                                                                className={classes.modal}
                                                                open={checkMessage ==={}?true:false}
                                                                onClose={()=>{
                                                                    setOpen(false)
                                                                    setActiveStep(1);
                                                                }}
                                                                closeAfterTransition
                                                                BackdropComponent={Backdrop}
                                                                BackdropProps={{timeout: 500,}}
                                                            >
                                                                <div className={classes.paper}>
                                                                    <h2 id="transition-modal-title">未完成的表格內容</h2>
                                                                    <p id="transition-modal-description">
                                                                        {
                                                                        }
                                                                    </p>
                                                                    <Button variant="contained" 
                                                                        color="primary"
                                                                        onClick={()=>{
                                                                            setOpen(false)                                        
                                                                            setActiveStep(1);
                                                                        }}
                                                                    >確定</Button>
                                                                </div>
                                                            </Modal>
                                                        */
                                                    }
                                                </div>
                                            }
                                            {
                                                item.id === "previewPDF" &&
                                                <div>
                                                    {
                                                        activeStep == finalStep &&
                                                        <Button
                                                            disabled={activeStep === 0}
                                                            //className={classes.button}
                                                            onClick={handleBack}
                                                            size="large"
                                                            style={{ margin: 3 }}
                                                            className={classes.button}
                                                        >
                                                            上一步
                                                        </Button>
                                                    }
                                                    {
                                                        pageButtons.map((item, index) => {
                                                            return (
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    key={"page_btn_" + item}
                                                                    style={{ margin: 3 }}
                                                                    onClick={() => {
                                                                        setPageNumber(item)
                                                                    }
                                                                    }>第{item}頁</Button>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        tempPDF != "" &&
                                                        <span>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                key={"page_btn_" + item}
                                                                style={{ margin: 3 }}
                                                                onClick={() => {
                                                                    setPDFscale(PDFscale + .5 > 5 ? 5 : PDFscale + .5)
                                                                }
                                                                }>放大</Button>

                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                key={"page_btn_" + item}
                                                                style={{ margin: 3 }}
                                                                onClick={() => {
                                                                    setPDFscale(PDFscale - .5 < 1 ? 1 : PDFscale - .5)
                                                                }
                                                                }>縮小</Button>
                                                        </span>
                                                    }

                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        backgroundColor: tempPDF ? "#aaa" : "#fff",
                                                        padding: 10,
                                                        overflow: "scroll"
                                                    }}>
                                                        <Document
                                                            file={tempPDF}
                                                            onload={() => { console.log("isPDF") }}
                                                            onLoadSuccess={onDocumentLoadSuccess}
                                                            onLoadError={error => console.log(error)}
                                                            noData="PDF資料已經準備好，現在進行處理中"
                                                        >
                                                            <Page pageNumber={pageNumber} scale={PDFscale} />
                                                        </Document>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                item.id === "previewPDF2" &&
                                                <PDFViewer width={1000} height={1200}>
                                                    <HibPDFFile data={myData} layout={formPages} />
                                                </PDFViewer>
                                            }
                                            {
                                                activeStep != finalStep &&
                                                <Button
                                                    disabled={activeStep === 0}
                                                    //className={classes.button}
                                                    onClick={handleBack}
                                                    size="large"
                                                    className={classes.button}
                                                >
                                                    上一步
                                                </Button>
                                            }
                                            {
                                                activeStep != finalStep &&
                                                <Tooltip
                                                    arrow
                                                    title="完成! 點擊此處進入下一步"
                                                    placement="top"
                                                    open={openNextTooltip}
                                                >                                                    
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.button}
                                                        style={{
                                                            padding:"5px 22px", 
                                                            /*
                                                            backgroundColor:
                                                            (
                                                                Array.isArray( formPages[activeStep].nextStepText) && !formAccess?
                                                                "#ccc":
                                                                Array.isArray( formPages[activeStep].nextStepText) && formAccess?
                                                                "#a1bd83":
                                                                "not-set"
                                                            )*/
                                                        }}
                                                        onClick={handleNext}
                                                        size="large"
                                                        disabled={!formAccess}
                                                        //disabled={!personalAccess}
                                                    >
                                                        {
                                                            Array.isArray( formPages[activeStep].nextStepText)?
                                                            <span style={{fontSize:18}}><b style={{ fontSize: 24 }}>{formPages[activeStep].nextStepText[0]}</b>{formPages[activeStep].nextStepText[1]}</span>:
                                                            formPages[activeStep].nextStepText                                                            
                                                        }
                                                    </Button>
                                                </Tooltip>
                                            }
                                            {
                                                insType == "life30" && activeStep == 2 &&
                                                <DialogButton
                                                    label={
                                                        <span style={{ fontSize: 18 }}>
                                                            <b style={{ fontSize: 24 }}>遠距投保</b>-客戶不在現場(不簽名，預覽下載PDF)
                                                        </span>
                                                    }
                                                    alertText="注意事項"
                                                    subText={
                                                        <span>
                                                            未簽名的書面分析報告只僅供下載，傳送給客戶簽名並回傳業務員，再由業務員從<span style={{ color: "#f00", fontSize: 18, fontWeight: "blod" }}>行動保專區</span>找出該筆資料上傳，才可進行後續行動保作業流程
                                                        </span>
                                                    }
                                                    allowLabel="確定"
                                                    rejectLabel="取消"
                                                    color="secondary"
                                                    //buttonColor="#7db4c9"
                                                    disabled={!formAccess}
                                                    size="origin"
                                                    doAllow={() => {
                                                        setInsMode("download")
                                                        //設定不需要簽名
                                                        dispatch({
                                                            type: "NEED_SIGN",
                                                            need_sign: false
                                                        })
                                                        setActiveStep(finalStep)
                                                    }}
                                                />
                                            }
                                        </div>
                                    </Element>
                                </StepContent>
                            </Step>
                        )
                    })}
            </Stepper>
            <div style={{ width: "100%", position: "fixed", bottom: 0, left: 0, zIndex: 1 }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderBottom: "none",
                        backgroundColor: "#fff",
                        padding: "10px 20px",
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        boxShadow: "0 0 10px #ccc",
                    }}>
                        <div>
                            <DialogButton
                                label={
                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                                        <ReplyIcon />
                                        <span>不儲存離開</span>
                                    </div>
                                }
                                alertText="書面分析報告尚未完成，確認是否不儲存返回列表?"
                                subText="返回列表後請務必回到本次書面分析報告並完成送出，已利完成簽署，未上傳完成無法送出核保。"
                                allowLabel="確定返回"
                                rejectLabel="取消"
                                doAllow={() => {
                                    var url = "../../html/MobPSlist.html?insurer=" + insurer + "&insureType=" + insureType;
                                    window.location.href = url;
                                }}
                            />
                        </div>

                        {
                            needPDF == false &&
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                size="large"
                                onClick={() => {
                                    webservice.goToMobAppWithoutData()
                                }}
                            >
                                <NavigateNextIcon />
                                略過，開啟行動投保
                            </Button>
                        }
                        {
                            //(insType == "life" || insType == "prop") &&
                            <Tooltip
                                arrow
                                title="預覽確認完成後的書面分析報告，請務必點選此按鈕已完成流程"
                                placement="bottom-start"
                                open={tempAccess}
                            >
                                <DialogButton
                                    label={
                                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", fontSize: 24 }}>
                                            <CloudUploadIcon style={{ paddingRight: 15 }} />
                                            <span>
                                                送出書面分析報告
                                            </span>
                                        </div>
                                    }
                                    alertText="確認是否送出完成資料?"
                                    subText="(送出後無法修改資料)資料送出完成後，將導回列表清單，未上傳完成無法送出核保。"
                                    allowLabel="確定"
                                    rejectLabel="取消"
                                    disabled={(insMode == "online" && canUpload == false) ? false : true}
                                    color="secondary"
                                    doAllow={saveDataPdfFile}
                                />
                            </Tooltip>
                        }
                        {
                            insType == "life30" &&
                            <Tooltip
                                arrow
                                title="預覽確認完成後的書面分析報告，請務必點選此按鈕已完成流程"
                                placement="bottom-start"
                                open={tempAccess}
                            >
                                <DialogButton
                                    label={
                                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", fontSize: 24 }}>
                                            <CloudDownloadIcon style={{ paddingRight: 15 }} />
                                            <span>
                                                下載書面分析報告
                                            </span>
                                        </div>
                                    }
                                    alertText="確認下載書面分析報告"
                                    subText={
                                        <span>
                                            <p>
                                                下載書面分析報告後無法再次進行修改資料，請再次確認資料是否正確？
                                            </p>
                                            <p>
                                                因應個人資料保護法，下載書面分析報告檔案內並未包含個人機敏性資料，書面分析報告除了須請客戶簽署外,【保費來源聲明書】客戶須一併填寫身分證字號及聯絡電話
                                            </p>
                                            <p>
                                                下載後請至列表處點選<span style={{ color: "#fa0" }}>上傳書面分析報告</span>將完成的資料送回即可完成書面分析報告。
                                            </p>
                                            <img src="./assets/uploadSample.jpg" />
                                        </span>
                                    }
                                    allowLabel="確定下載"
                                    rejectLabel="取消"
                                    disabled={(insMode == "download" && canUpload == false) ? false : true}
                                    color="secondary"
                                    //20210817 暫時停用：改隱藏重要個資後就下載 doAllow={uploadPdfAndGetEncryptPDF}
                                    doAllow={() => {
                                        saveDataAndDownload()
                                    }}
                                />
                            </Tooltip>
                        }
                        {
                            needPDF == true &&
                            <Tooltip
                                arrow
                                title="您已可以暫存資料"
                                placement="bottom-start"
                                open={tempAccess}
                            >
                                <DialogButton
                                    label={
                                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                                            <SaveIcon style={{ paddingRight: 10 }} />
                                            {activeStep == 3 || activeStep == 4 ? "暫存資料(簽名除外)" : "暫存資料"}
                                        </div>
                                    }
                                    alertText="確定暫存資料後，將會回到上頁列表"
                                    subText="暫存後請務必回本系統完成後續作業，未上傳完成無法送出核保。"
                                    allowLabel="確定暫存"
                                    rejectLabel="取消"
                                    disabled={!tempAccess}
                                    doAllow={saveTempFile}
                                />
                            </Tooltip>
                        }
                    </div>
                </div>
            </div>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={24000}
                onClose={event => { setOpenSnackbar(false) }}
            >
                <Alert
                    variant="filled"
                    style={{ display: "flex" }}
                    severity="info"
                    action={
                        <CloseIcon onClick={event => { setOpenSnackbar(false) }} />
                    }>
                    {description[activeStep]}
                </Alert>
            </Snackbar>

            <Dialog
                open={redirectToListOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">注意!</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        請從列表進入書面分析報告系統，謝謝！
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={backToList} color="secondary" variant="contained">
                        點選返回列表
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default MyApp