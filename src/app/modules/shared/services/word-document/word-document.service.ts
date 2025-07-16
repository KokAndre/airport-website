import { Injectable } from '@angular/core';
import { saveAs } from "file-saver";
import { asBlob } from 'html-docx-js-typescript';
import * as moment from 'moment';
import { GetReportIssueDataResponse } from 'src/app/models/get-report-issue-data-response.model';
import { text } from './doc';
import PizZipUtils from 'pizzip/utils/index.js';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import expressionParser from 'docxtemplater/expressions.js'
import { AppModalService } from 'src/app/services/app-modal/app-modal.service';
import { ModalTypes } from 'src/app/enums/app.enums';
import { WordDocumentTemplate } from './word-document-data.model';

@Injectable({
  providedIn: 'root'
})
export class WordDocumentService {

  constructor(public appModalService: AppModalService) { }

  // public async generateWordDocument(issueData: GetReportIssueDataResponse.Requests[]) {
  //   const downloadName = `Report issue requests as at ${moment(new Date()).format('DD-MM-yyyy - HH:mm')}.docx`;

  //   const rowsData = new Array<any>();

  //   let rowsToInsert = new Array<any>();

  //   issueData.forEach(issueItem => {
  //     rowsToInsert.push(issueItem);

  //     if (rowsToInsert?.length === 2) {
  //       rowsData.push(rowsToInsert);
  //       rowsToInsert = new Array<any>();
  //     }
  //   });

  //   let dataToInsert = '';
  //   rowsData.forEach(row => {
  //     dataToInsert += '<tr>';

  //     row.forEach(cell => {
  //       dataToInsert += '<td>';

  //       dataToInsert += `<b>Issue #: </b>${cell.id} ${cell.numOfRemainingDaysToETC > 1 ? '[' + cell.numOfRemainingDaysToETC + ' days]' : ''}<br>`;
  //       dataToInsert += `<b>Whom: </b>${cell.personResponsible} [${cell.priority}]<br>`;
  //       dataToInsert += `<b>Issue Description: </b>${cell.issueDescription}`;

  //       dataToInsert += '</td>';
  //     });

  //     dataToInsert += '</tr>';
  //   });

  //   const updatedText = text.replace('table_content_variable', dataToInsert);

  //   var converted = await asBlob(updatedText, {
  //     orientation: 'portrait',
  //     margins: {
  //       top: 800,
  //       bottom: 800,
  //     }
  //   });
  //   saveAs(converted, downloadName);
  // }

  public testEditingFileMethod(issueData: GetReportIssueDataResponse.Requests[]) {
    const templatePath = 'assets/20250609 - Template for Work Items.docx';
    const downloadName = `Report issue requests as at ${moment(new Date()).format('DD-MM-yyyy - HH:mm')}.docx`;
    PizZipUtils.getBinaryContent(templatePath, (error: any, content: any) => {
      if (error) {
        this.appModalService.ShowConfirmationModal(ModalTypes.InformationModal, 'Load Template', 'There was an issue loading the template.', '');
        return;
      }

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true, // Optional: for handling paragraph loops
        linebreaks: true, // Optional: for handling line breaks
        parser: expressionParser, // The parser is for the document to render nested objects
      });

      // Format the issue data:
      const tableData = new Array<WordDocumentTemplate.TableData>();

      let dataToPushToTable = new WordDocumentTemplate.TableData();

      issueData.forEach((item, index) => {
        if (!dataToPushToTable.issue1) {
          dataToPushToTable.issue1 = new WordDocumentTemplate.CellData();
          dataToPushToTable.issue1.name = `${item.id} ${item.numOfRemainingDaysToETC > 1 ? '[' + item.numOfRemainingDaysToETC + ' days]' : ''}`;
          dataToPushToTable.issue1.personResponsible = `${item.personResponsible} [${item.priority}]`;
          dataToPushToTable.issue1.description = item.issueDescription;
        } else if (!dataToPushToTable.issue2) {
          dataToPushToTable.issue2 = new WordDocumentTemplate.CellData();
          dataToPushToTable.issue2.name = `${item.id} ${item.numOfRemainingDaysToETC > 1 ? '[' + item.numOfRemainingDaysToETC + ' days]' : ''}`;
          dataToPushToTable.issue2.personResponsible = `${item.personResponsible} [${item.priority}]`;
          dataToPushToTable.issue2.description = item.issueDescription;
        } else if (!dataToPushToTable.issue3) {
          dataToPushToTable.issue3 = new WordDocumentTemplate.CellData();
          dataToPushToTable.issue3.name = `${item.id} ${item.numOfRemainingDaysToETC > 1 ? '[' + item.numOfRemainingDaysToETC + ' days]' : ''}`;
          dataToPushToTable.issue3.personResponsible = `${item.personResponsible} [${item.priority}]`;
          dataToPushToTable.issue3.description = item.issueDescription;
        } else if (!dataToPushToTable.issue4) {
          dataToPushToTable.issue4 = new WordDocumentTemplate.CellData();
          dataToPushToTable.issue4.name = `${item.id} ${item.numOfRemainingDaysToETC > 1 ? '[' + item.numOfRemainingDaysToETC + ' days]' : ''}`;
          dataToPushToTable.issue4.personResponsible = `${item.personResponsible} [${item.priority}]`;
          dataToPushToTable.issue4.description = item.issueDescription;
        } else if (!dataToPushToTable.issue5) {
          dataToPushToTable.issue5 = new WordDocumentTemplate.CellData();
          dataToPushToTable.issue5.name = `${item.id} ${item.numOfRemainingDaysToETC > 1 ? '[' + item.numOfRemainingDaysToETC + ' days]' : ''}`;
          dataToPushToTable.issue5.personResponsible = `${item.personResponsible} [${item.priority}]`;
          dataToPushToTable.issue5.description = item.issueDescription;
        } else if (!dataToPushToTable.issue6) {
          dataToPushToTable.issue6 = new WordDocumentTemplate.CellData();
          dataToPushToTable.issue6.name = `${item.id} ${item.numOfRemainingDaysToETC > 1 ? '[' + item.numOfRemainingDaysToETC + ' days]' : ''}`;
          dataToPushToTable.issue6.personResponsible = `${item.personResponsible} [${item.priority}]`;
          dataToPushToTable.issue6.description = item.issueDescription;

          if (index !== issueData.length - 1) {
            tableData.push(dataToPushToTable);
            dataToPushToTable = new WordDocumentTemplate.TableData();
          }
        }

        if (index === issueData.length - 1) {
          if (!dataToPushToTable.issue1) {
            dataToPushToTable.issue1 = new WordDocumentTemplate.CellData();
            dataToPushToTable.issue1.name = ' ';
            dataToPushToTable.issue1.personResponsible = ' ';
            dataToPushToTable.issue1.description = ' ';
          }

          if (!dataToPushToTable.issue2) {
            dataToPushToTable.issue2 = new WordDocumentTemplate.CellData();
            dataToPushToTable.issue2.name = ' ';
            dataToPushToTable.issue2.personResponsible = ' ';
            dataToPushToTable.issue2.description = ' ';
          }

          if (!dataToPushToTable.issue3) {
            dataToPushToTable.issue3 = new WordDocumentTemplate.CellData();
            dataToPushToTable.issue3.name = ' ';
            dataToPushToTable.issue3.personResponsible = ' ';
            dataToPushToTable.issue3.description = ' ';
          }

          if (!dataToPushToTable.issue4) {
            dataToPushToTable.issue4 = new WordDocumentTemplate.CellData();
            dataToPushToTable.issue4.name = ' ';
            dataToPushToTable.issue4.personResponsible = ' ';
            dataToPushToTable.issue4.description = ' ';
          }

          if (!dataToPushToTable.issue5) {
            dataToPushToTable.issue5 = new WordDocumentTemplate.CellData();
            dataToPushToTable.issue5.name = ' ';
            dataToPushToTable.issue5.personResponsible = ' ';
            dataToPushToTable.issue5.description = ' ';
          }

          if (!dataToPushToTable.issue6) {
            dataToPushToTable.issue6 = new WordDocumentTemplate.CellData();
            dataToPushToTable.issue6.name = ' ';
            dataToPushToTable.issue6.personResponsible = ' ';
            dataToPushToTable.issue6.description = ' ';

            if (index !== issueData.length - 1) {
              tableData.push(dataToPushToTable);
              dataToPushToTable = new WordDocumentTemplate.TableData();
            }
          }

          tableData.push(dataToPushToTable);
          dataToPushToTable = new WordDocumentTemplate.TableData();
        }
      });

      doc.render({ tables: tableData });

      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        compression: 'DEFLATE',
      });

      saveAs(out, downloadName);
    });
  }

}
