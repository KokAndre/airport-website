import { Injectable } from '@angular/core';
import { Endpoints } from 'src/app/enums/app.enums';
import { ReportIssueRequest } from 'src/app/models/report-issue-request.model';
import { SubmitGreeningTedderfieldRequest } from 'src/app/models/submit-greening-tedderfield-request.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor() { }

  public submitReportIssue(reportIssueData: ReportIssueRequest.RootObject) {
    return fetch(Endpoints.BaseURL + Endpoints.ReportIssue, {
      method: 'post',
      body: JSON.stringify({ requestData: reportIssueData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  public submitGreeningTedderfield(reportIssueData: SubmitGreeningTedderfieldRequest.RootObject) {
    return fetch(Endpoints.BaseURL + Endpoints.SubmitGreeninTedderfield, {
      method: 'post',
      body: JSON.stringify({ requestData: reportIssueData })
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

}
