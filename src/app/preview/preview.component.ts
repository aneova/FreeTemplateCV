import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Educ, Empl, Lang, ResumeForm, Skill} from '../home/home.component';
import {UploadService} from '../service/upload.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  resume: ResumeForm;

  public  skillsArray = new Array<Skill>();
  public  langArray = new Array<Lang>();
  public  eduArray = new Array<Educ>();
  public  emplArray = new Array<Empl>();
  private res: ResumeForm;

  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private uploadService: UploadService ) { }

  strip(html) {
    const tmp = document.implementation.createHTMLDocument('New').body;
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  ngOnInit(): void {
    this.resume = JSON.parse(localStorage.getItem('resume'));
    this.resume.edu.map(e => e.decrpt = this.strip(e.decrpt));
    this.resume.empl.map(e => e.decrpt = this.strip(e.decrpt));

    document.getElementById('quill').innerHTML =  this.resume.profile;
    //document.getElementById('cource').innerHTML = this.resume.cources;

    // const e: Educ = { start: new Date(), end: new Date(), degree: 'MS', school: 'Smolensk state university',
    //                   decrpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy' +
    //                     ' text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ' +
    //                     'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,' +
    //                     ' and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', city: 'Smolensl', level: ' ', years: ' '};
    // this.eduArray.push(e);
    // const empl: Empl = { start: new Date(), end: new Date(), job: 'Junior Full-Stack devdloper', empl: 'IT HUB',
    //   decrpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard ' +
    //     'dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ' +
    //     ' It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop ' +
    //     'publishing software like Aldus PageMaker including versions of Lorem Ipsum.', city: 'Smolensk'};
    // this.emplArray.push(empl);
    // const l1: Lang = {language: 'German', level: 'Beginner'};
    // const l2: Lang = {language: 'English', level: 'Beginner'};
    // this.langArray.push(l1);
    // this.langArray.push(l2);
    //
    // const skill1: Skill = {skillValue: 8, skill: 'C++'};
    // const skill2: Skill = {skillValue: 6, skill: 'Java'};
    // const skill3: Skill = {skillValue: 3, skill: 'Python'};
    // const skill4: Skill = {skillValue: 9, skill: 'HTML/CSS'};
    // const skill5: Skill = {skillValue: 7, skill: 'Angular'};
    // const skill6: Skill = {skillValue: 5, skill: 'Spring'};
    // this.skillsArray.push(skill4);
    // this.skillsArray.push(skill1);
    // this.skillsArray.push(skill5);
    // this.skillsArray.push(skill2);
    // this.skillsArray.push(skill3);
    //
    // this.skillsArray.push(skill6);

    // this.resume = {imagePreview: null, imagePath: this.res.imagePath,
    //   firstName: 'Eva', secondName: 'Koroleva',
    //   country: 'Europe', city: 'Sofia Mladost', citizenShip: 'World',
    //   postCode: 'Street bl.53 2000', phone: '+123456789', email: 'myLovalyMail@mail.com', web: 'www.web',
    //   skype: 'my_skype', gitHub: 'gitHub/account', profile: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
    //     'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type ' +
    //     'and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,' +
    //     ' remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, ' +
    //     'and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    //
    //   edu: this.eduArray,
    //   lang: this.langArray, empl: this.emplArray, skills: this.skillsArray, cources: 'Lorem Ipsum is simply dummy text of the printing and ' +
    //     'typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley' +
    //     ' of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, ' +
    //     'remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently' +
    //     ' with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'};
   // localStorage.removeItem('resume');
  }

  public openPDF(): void {
    // const onePageCanvas = document.createElement('canvas');
    // onePageCanvas.setAttribute('width', String(900));
    // onePageCanvas.setAttribute('height', String(980));
    //
    const data = document.getElementById('htmlData');
    // html2canvas(data).then(canvas => {
    //   const contentDataURL = canvas.toDataURL('image/png', 1);
    //   const pdf = new jsPDF('p', 'mm', 'a3');
    //   const width = pdf.internal.pageSize.getWidth();
    //   const divHeight = this.htmlData.nativeElement.offsetHeight;
    //   const divWidth = this.htmlData.nativeElement.offsetWidth;
    //   const ratio = divHeight / divWidth;
    //   const height = ratio * width;
    //   //pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
    //   pdf.addImage(contentDataURL, 'PNG', 5, 5, 200, 200);
    //   pdf.save('CV.pdf');
    // });
    html2canvas(data).then(canvas => {
          let width = canvas.width;
          let height = canvas.height;

          const  imgData = canvas.toDataURL('image/jpeg');
          const  doc = new jsPDF('p', 'mm', 'a4', true);
          width = doc.internal.pageSize.width;
          height = doc.internal.pageSize.height;
          const img = new Image(),
          ctx = canvas.getContext('2d');

          const divHeight = this.htmlData.nativeElement.offsetHeight;
          const divWidth = this.htmlData.nativeElement.offsetWidth;
          const ratio = divHeight / divWidth;
          // doc.addPage();
           doc.addImage(imgData, 'JPEG', -1, -80, width, 370, undefined,'FAST');
          //doc.addImage(imgData, 'JPEG', 2, 0, width-5, ratio * width, 'a', 'MEDIUM');
            //doc.addImage(imgData, 'JPEG', 0, -50, width, height, undefined, 'FAST');
          // //doc.addImage(imgData, 'JPEG', 0, 0);
          doc.save('WebSiteScreen.pdf');

  });
 }

}
