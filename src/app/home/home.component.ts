import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BsDatepickerConfig, BsDatepickerViewMode} from 'ngx-bootstrap/datepicker';
import {setTheme} from 'ngx-bootstrap/utils';
import {FileUploader} from 'ng2-file-upload';
import {UploadService} from '../service/upload.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export interface Lang {
  language: string;
  level: string;
}

export interface Educ {
  city: string;
  start: Date;
  end: Date;
  degree: string;
  school: string;
  level: string;
  years: string;
  decrpt: string;
}

export interface Empl {
  job: string;
  start: Date;
  end: Date;
  empl: string;
  decrpt: string;
  city: string;
}

export interface Skill {
  skill: string;
  skillValue: number;
}

export interface ResumeForm {
  linkedIn: string;
  imagePreview: File;
  imagePath: string;
  firstName: string;
  secondName: string;
  country: string;
  city: string;
  postCode: string;
  citizenShip: string;
  email: string;
  phone: string;
  web: string;
  skype: string;
  gitHub: string;

  profile: string;
  edu: Educ[];
  lang: Lang[];
  empl: Empl[];
  skills: Skill[];
  cources: string;
}

class ImageSnippet {
  pending = false;
  status = 'init';
  constructor(public src: string, public file: File) {}
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;

  @ViewChild('htmlData') htmlData: ElementRef;

  public selectedFile: ImageSnippet;
  public colorHeader: string;
  public fontColor: string;
  public  skillsArray = new Array<Skill>();
  public  langArray = new Array<Lang>();
  public  eduArray = new Array<Educ>();
  public  emplArray = new Array<Empl>();
  public selectedLang: any;
  public selectedLangLevel: any;

  public uploader: FileUploader;
  public edit3: string;
  cource: string;
  fname: string;
  sname: string;
  country: string;
  city: string;
  citizenShip: string;
  postCode: string;
  email: string;
  phone: string;
  web: string;
  skype: string;
  gitHub: string;
  profile: string;
  linkedIn: string;


  constructor(private uploadService: UploadService) {
    setTheme('bs4');
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }


  ngOnInit(): void {
  this.colorHeader = '#000000';
  this.fontColor = '#FFFFFF';

  this.bsConfig = Object.assign({}, {
          minMode : this.minMode},
        {dateInputFormat: 'MMM, YYYY'},
        {isAnimated: true}
        );
    }


  setColorHeader($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.colorHeader = target.value;
    const headerDIV  =  document.getElementsByClassName('headerSquare') as HTMLCollectionOf<HTMLElement>;
    headerDIV[0].style.background = this.colorHeader;
  }

  getStyles() {
    const styles = {
          'background-color': this.colorHeader,
          'font-color': this.fontColor
    };
    return styles;
  }

  setColorFont($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.fontColor = target.value;
  }

  addNewSkill() {
    const newSKill: Skill = {skillValue: 7, skill: 'Skill'};
    this.skillsArray.push(newSKill);
  }

  addLanguage() {
    const l: Lang = { language: this.selectedLang, level: this.selectedLangLevel};
    this.langArray.push(l);
  }

  addEducation() {
    const e: Educ = {years: ' ', decrpt: ' ', level: ' ', school: ' ', degree: ' ', start: new Date(), end: new Date(), city: ' '};
    this.eduArray.push(e);

  }

  addEmpl() {
    const e: Empl = {decrpt: ' ', job: ' ', start: new Date(), end: new Date(), city: ' ', empl: ' '  };
    this.emplArray.push(e);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.uploadService.upload(this.selectedFile.file).subscribe(
        (res) => {

        },
        (err) => {

        });
    });

    reader.readAsDataURL(file);
  }

  /*
  *   imagePreview: File;
  imagePath: string;
  firstName: string;
  secondName: string;
  country: string;
  city: string;
  postCode: string;
  citizenShip: string;
  email: string;
  phone: string;
  web: string;
  skype: string;
  gitHub: string;

  profile: string;
  edu: Educ[];
  lang: Lang[];
  empl: Empl[];
  skills: SkillsList;
  cources: string;
  * */

  previewPDF() {
    const res: ResumeForm = {imagePreview: this.selectedFile.file, imagePath: this.selectedFile.src,
                            firstName: this.fname, secondName: this.sname,
                            country: this.country, city: this.city, citizenShip: this.citizenShip,
                            postCode: this.postCode, phone: this.phone, email: this.email, web: this.web,
                            skype: this.skype, gitHub: this.gitHub, linkedIn: this.linkedIn, profile: this.profile, edu: this.eduArray,
                            lang: this.langArray, empl: this.emplArray, skills: this.skillsArray, cources: this.cource};
    localStorage.setItem('resume', JSON.stringify(res));
    window.open('/preview');
  }


  public openPDF(): void {
    const elem = document.getElementById('AddNewBtn');
    const edet1Eln = document.getElementById('edit1');
    const edet2Eln = document.getElementById('edit2');
    const edet3Eln = document.getElementById('edit3');

    const data = document.getElementById('htmlData');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png', 1);
      const pdf = new jsPDF();
      pdf.addImage(contentDataURL, 'PNG', 5, 5, 200, 165);
      pdf.save('CV.pdf');
    });
  }

}
