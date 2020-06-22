import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }


  public openPDF(): void {
    const data = document.getElementById('htmlData');
    html2canvas(data).then(canvas => {
      let width = canvas.width;
      let height = canvas.height;

      const  imgData = canvas.toDataURL('image/jpeg');
      const  doc = new jsPDF('p', 'mm', 'a4', true);
      width = doc.internal.pageSize.width;
      height = doc.internal.pageSize.height;
      const img = new Image(),
        ctx = canvas.getContext('2d');

      console.log(doc);

      const divHeight = this.htmlData.nativeElement.offsetHeight;
      const divWidth = this.htmlData.nativeElement.offsetWidth;
      const ratio = divHeight / divWidth;
      // doc.addPage();
       //doc.addImage(imgData, 'JPEG', 0, 0);//, 485, 270, undefined,'FAST');
      doc.addImage(imgData, 'JPEG', 0, -30, width, ratio*height, undefined, 'FAST');
      // //doc.addImage(imgData, 'JPEG', 0, 0);
      doc.save('WebSiteScreen.pdf');

    });
  }

}
