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
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileUploadModule} from 'ng2-file-upload';
import {HttpClientModule} from '@angular/common/http';
import { PreviewComponent } from './preview/preview.component';
import {MatExpansionModule} from '@angular/material';
import { HomePageComponent } from './home-page/home-page.component';
import {ShareButtonModule} from 'ngx-sharebuttons/button';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    AboutComponent,
    HomeComponent,
    PreviewComponent,
    HomePageComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ShareButtonModule,
    ShareIconsModule,
    QuillModule.forRoot({
      modules: {
        syntax: false,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          [{size: ['small', false, 'large', 'huge']}],  // custom dropdown
          [{color: []}, {background: []}],                                // dropdown with defaults from theme
          [{font: []}],
          ['link']                                          // link
        ]
      }
    }),
    FileUploadModule,
    MatExpansionModule,
    ShareButtonsModule
  ],
  exports: [QuillModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
