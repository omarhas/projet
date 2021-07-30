import React from 'react'
import jsPDF from 'jspdf'

const PdfGenerator = () => {
    const jsPdfGenerator = () => {
        var doc = new jsPDF('p', 'pt');
        doc.save('Contrat.pdf');
    }

    return (
        <>
            <button type='submit' onClick={jsPdfGenerator}>
                Generate PDF
            </button>
        </>
    )

}
export default PdfGenerator