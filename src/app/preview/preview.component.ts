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

  ngOnInit(): void {
    this.res = JSON.parse(localStorage.getItem('resume'));
    const e: Educ = { start: new Date(), end: new Date(), degree: 'MS', school: 'Smolensk state university',
                      decrpt: 'I am an energetic, ambitious person who has developed a mature and responsible approach to any task that I undertake, or situation that I am presented with.', city: 'Smolensl', level: ' ', years: ' '};
    this.eduArray.push(e);
    const empl: Empl = { start: new Date(), end: new Date(), job: 'Junior Full-Stack devdloper', empl: 'IT HUB Kaufland',
      decrpt: 'I am a mature, positive and hardworking individual, who always strives to achieve the highest standard ' +
        'possible, at any given task. In my previous role as a Sales Representative, I demonstrated the ability to work under ' +
        'intense pressure, sell products and services to customers from all backgrounds, handle customer complaints and solve ' +
        'problematic situations as and when they arose. I was promoted twice for exceeding my sales targets.', city: 'Smolensk'};
    this.emplArray.push(empl);
    const l1: Lang = {language: 'German', level: 'Beginner'};
    const l2: Lang = {language: 'English', level: 'Beginner'};
    this.langArray.push(l1);
    this.langArray.push(l2);

    const skill1: Skill = {skillValue: 8, skill: 'C++'};
    const skill2: Skill = {skillValue: 6, skill: 'Java'};
    this.skillsArray.push(skill1);
    this.skillsArray.push(skill2);
    this.skillsArray.push(skill2);
    this.skillsArray.push(skill2);
    this.skillsArray.push(skill2);
    this.skillsArray.push(skill2);
    this.skillsArray.push(skill2);
    this.skillsArray.push(skill2);
    this.skillsArray.push(skill2);

    this.resume = {imagePreview: null, imagePath: 'this.res.imagePath',
      firstName: 'Anna', secondName: 'Korotkova',
      country: 'Bulgaria', city: 'Sofia Mladost 1a', citizenShip: 'Russia',
      postCode: 'AnnaAhmatoba bl.532 1720', phone: '+359123456', email: 'anna@bg.bg', web: 'www.web',
      skype: 'my_skype', gitHub: '/aneova', profile: 'I have a clear, logical mind with a practical approach to ' +
        'problem-solving and a drive to see things through to completion. I have more than 2 years of experience in ' +
        'managing and leading teams across multiple sectors. I am eager to learn, I enjoy overcoming challenges, and I ' +
        'have a genuine interest in Business Management and making organisations successful.',
      edu: this.eduArray,
      lang: this.langArray, empl: this.emplArray, skills: this.skillsArray, cources: 'Problem-solving and a drive to see things through to completion. ' +
        'I have more than 2 years of experience in ' +
        'managing and leading teams across multiple sectors. I am eager to learn, I enjoy overcoming challenges, and I '};
    localStorage.removeItem('resume');
  }

  public openPDF(): void {
    // const onePageCanvas = document.createElement('canvas');
    // onePageCanvas.setAttribute('width', String(900));
    // onePageCanvas.setAttribute('height', String(980));
    //
    const data = document.getElementById('htmlData');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png', 1);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const divHeight = this.htmlData.nativeElement.offsetHeight;
      const divWidth = this.htmlData.nativeElement.offsetWidth;
      const ratio = divHeight / divWidth;
      const height = ratio * width;
      pdf.addImage(contentDataURL, 'PNG', 10, 5, width - 20, height -5);
      pdf.save('CV.pdf');
    });

    // html2canvas(data).then(canvas => {
    //   const doc = new jsPDF('p', 'px', 'a4');
    //   const contentDataURL = canvas.toDataURL('image/png', 1);
    //   const pageHeight = doc.internal.pageSize.getHeight();
    //   const pageWidth = doc.internal.pageSize.getWidth();
    //
    //   const imgheight = this.htmlData.nativeElement.offsetHeight;  // px to mm
    //   const pagecount = Math.ceil(imgheight / pageHeight);
    //   console.log(imgheight, pageHeight);
    //   /* add initial page */
    //   doc.addPage('p', 'px', 'a4');
    //   doc.addImage(contentDataURL, 'PNG', 20, 10, pageWidth, 0);
    //
    //   /* add extra pages if the div size is larger than a a4 size */
    //   if (pagecount > 0) {
    //     let j = 1;
    //     while (j !== pagecount) {
    //       doc.addPage('p', 'mm', 'a4');
    //       doc.addImage(contentDataURL, 'PNG', 20, 10, -(j * pageHeight), pageWidth - 4, 0);
    //       j++;
    //     }
    //   }
    //     doc.save('CV.pdf');
    // });
  }

}
