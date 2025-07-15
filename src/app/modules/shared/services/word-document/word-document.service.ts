import { Injectable } from '@angular/core';
import { saveAs } from "file-saver";
import { asBlob } from 'html-docx-js-typescript';
import * as moment from 'moment';
import { GetReportIssueDataResponse } from 'src/app/models/get-report-issue-data-response.model';
import { text } from './doc';

@Injectable({
  providedIn: 'root'
})
export class WordDocumentService {

  constructor() { }

  public async generateWordDocument(issueData: GetReportIssueDataResponse.Requests[]) {
    const downloadName = `Report issue requests as at ${moment(new Date()).format('DD-MM-yyyy - HH:mm')}.docx`;

    const rowsData = new Array<any>();

    let rowsToInsert = new Array<any>();

    issueData.forEach(issueItem => {
      rowsToInsert.push(issueItem);

      if (rowsToInsert?.length === 2) {
        rowsData.push(rowsToInsert);
        rowsToInsert = new Array<any>();
      }
    });

    let dataToInsert = '';
    rowsData.forEach(row => {
      dataToInsert += '<tr>';

      row.forEach(cell => {
      dataToInsert += '<td>';

      dataToInsert += `<b>Issue #: </b>${cell.id} ${cell.numOfRemainingDaysToETC > 1 ? '[' + cell.numOfRemainingDaysToETC + ' days]' : ''}<br>`;
      dataToInsert += `<b>Whom: </b>${cell.personResponsible} [${cell.priority}]<br>`;
      dataToInsert += `<b>Issue Description: </b>${cell.issueDescription}`;

      dataToInsert += '</td>';
      });

      dataToInsert += '</tr>';
    });

    const updatedText = text.replace('table_content_variable', dataToInsert);

    var converted = await asBlob(updatedText, {
      orientation: 'portrait',
      margins: {
        top: 800,
        bottom: 800,
    }
    });
    saveAs(converted, downloadName);
  }

}
