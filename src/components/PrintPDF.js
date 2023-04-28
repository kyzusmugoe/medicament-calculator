import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';



import { pdf, PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';

import PDFfactory from './PDF-factory'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PrintPDF = ( {data}) => {
    const jsonData = useSelector(state => state)     
    const [rawData, setRawData] = useState([])
    
    useEffect(()=>{
        if(jsonData.jsonData.length > 0){
            setRawData(jsonData.userRaw)
        }
    },[jsonData]) 
    
    return(
        <>
            <PDFDownloadLink
                document={
                    <PDFfactory data={rawData} />
                }
                fileName="somename.pdf"
                >
                {   
                    ({ blob, url, loading, error }) => (
                        loading ? '處理中...' : <button target="_blank">下載PDF</button>
                    )       
                }
            </PDFDownloadLink>
            <PDFViewer
                width={800}
                height={1200}
            >
                <PDFfactory data={rawData} />    
            </PDFViewer>
        </>
    )
}
export default PrintPDF