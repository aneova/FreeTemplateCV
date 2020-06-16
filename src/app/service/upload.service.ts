import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResumeForm} from '../home/home.component';

@Injectable({
  providedIn: 'root'
})

export class UploadService {
    isPreviewData$ = new EventEmitter();
    // resume: ResumeForm = {
    //   imagePath: '',
    //   imagePreview: null,
    //   field1: ''
    // };

    SERVER_URL = 'https://http://localhost:4200/uploads/';
    constructor(private httpClient: HttpClient) { }


    public upload(formData) {
        return this.httpClient.post<any>(this.SERVER_URL, formData, {
            reportProgress: true,
            observe: 'events'
    });
  }

  public passData(res: ResumeForm) {
    this.isPreviewData$.emit(res);
  }

}




