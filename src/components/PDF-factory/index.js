
import React, { useState, useEffect } from 'react';
import { Document} from '@react-pdf/renderer';

import ResPDF from './pages/ResPDF'

const HibPDFFile = ({ data }) => {
    return (
        <Document>
            <ResPDF data={data}/>
        </Document>
    )
}

export default HibPDFFile