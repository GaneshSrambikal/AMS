import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { format } from 'date-fns';

//  Generate PDF Report
export const generatePDFReport = (attendanceData) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Attendance Report', 14, 20);

  const tableData = attendanceData.map((record, index) => [
    index + 1,
    record.user.name,
    format(record.date, 'yyy-MM-dd'),
    format(record.checkInTime, 'hh:mm a'),
    record.checkOutTime
      ? format(record.checkOutTime, 'hh:mm a')
      : 'Not Checked-out',
    record.workHours,
  ]);

  autoTable(doc, {
    startY: 30,
    head: [['#', 'Name', 'Date', 'Check-in', 'Check-out', 'Work Hours']],
    body: tableData,
  });

  doc.save(`attendance-report-${Date.now()}.pdf`);
};

//  Generate CSV Report
export const generateCSVReport = (attendanceData) => {
  const csvData = attendanceData.map((record) => ({
    Name: record.user.name,
    Date: new Date(record.date).toLocaleDateString(),
    'Check-in': format(record.checkInTime, 'hh:mm a'),
    'Check-out': record.checkOutTime
      ? format(record.checkOutTime, 'hh:mm a')
      : 'Not Checked-out',
    'Work Hours': record.workHours,
  }));

  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `attendance-report-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
