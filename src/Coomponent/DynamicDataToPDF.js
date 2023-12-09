import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DynamicDataToPDF = ({ data }) => {
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const input = pdfRef.current;

    if (input) {
      const canvas = await html2canvas(input);
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('dynamic_data.pdf');
    }
  };

  return (
    <div>
      <button onClick={downloadPDF}>Download PDF</button>
      <div ref={pdfRef}>
        
        {/* Render your dynamic data as a list or any other HTML structure */}
        <ul>
          {data.map((item, index) => (
            <div className='flex gap-2 w-full'>
            <li key={index}>{item.id}</li>
            <li key={index}>{item.first_name}</li>
            <li key={index}>{item.last_name}</li>
            <li key={index}>{item.salary}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DynamicDataToPDF;
