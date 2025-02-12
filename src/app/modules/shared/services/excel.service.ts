import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public generateExcel(fileName: string, headers: Array<any>, data: Array<any>) {

    // Format the download name
    const downloadName = `${fileName} as at ${moment(new Date()).format('DD-MM-yyyy - HH:mm')}`;

    // create the Workbook
    let workbook = new Workbook();

    // Create the first sheet
    let worksheet = workbook.addWorksheet('Sheet 1');

    // // Add the provided headings header
    let headerRow = worksheet.addRow(headers);

    // Format the headers row
    headerRow.eachCell((cell, number) => {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thick' }, right: { style: 'thin' } },
        cell.font = {
          size: 12,
          bold: true
        },
        cell.alignment = {
          wrapText: false,
          shrinkToFit: false
        }
    });

    // Add the provided data to the excel sheet
    data.forEach(row => {
      let addedRow = worksheet.addRow(row);
      // Add styling for each row
      addedRow.eachCell(cell => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
          cell.font = {
            size: 11,
            bold: false
          },
          cell.alignment = {
            wrapText: true,
            shrinkToFit: false
          }
      })
    });

    // Set the width of the columns
    worksheet.columns.forEach(function (column, i) {
      let maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? (cell.value.toString().length * 1.2) : 10;
          if (columnLength > maxLength ) {
              maxLength = columnLength;
          }
      });
      column.width = maxLength < 10 ? 10 : (maxLength > 120 ? 120 : maxLength);
  });



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `${downloadName}.xlsx`);
    });
  }
}
