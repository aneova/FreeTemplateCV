import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {QuillModule} from 'ngx-quill';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileUploadModule} from 'ng2-file-upload';
import {HttpModule} from '@angular/http';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { PreviewComponent } from './preview/preview.component';
import {MatExpansionModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    AboutComponent,
    HomeComponent,
    PreviewComponent,
  ],
    imports: [
        BsDatepickerModule.forRoot(),
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        QuillModule.forRoot({
            modules: {
                syntax: false,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                    [{'color': []}, {'background': []}],                                // dropdown with defaults from theme
                    [{'font': []}],
                    ['link']                                          // link
                ]
            }
        }),
        FileUploadModule,
        MatExpansionModule,
    ],
  exports: [QuillModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
