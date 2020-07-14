import { Component, OnInit } from '@angular/core';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  fbIcon = faFacebookSquare;
  pinIcon = faPinterest;
  tweetIcon = faTwitterSquare;

  constructor() { }

  ngOnInit(): void {
  }


}
