/*eslint-disable*/
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const FileExporter = () => {
  const [data, setData] = useState([
    { id: 1, language: 'en', content: 'Hello' },
    { id: 2, language: 'ar', content: 'مرحبا' },
    { id: 3, language: 'en', content: 'How are you?' },
    { id: 4, language: 'ar', content: 'كيف حالك؟' }
  ]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'content.xlsx');
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(data);
    // Add BOM for UTF-8
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'content.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* <h2>Content</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <button type='submit' onClick={exportToExcel}>Export to Excel</button>
      <button type='submit' onClick={exportToCSV}>Export to CSV</button>
    </div>
  );
};

export default FileExporter;
