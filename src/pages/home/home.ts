import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, Events } from 'ionic-angular';

declare var TimelineMax: any;
declare var Back: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('box1') box1;
  @ViewChild('box2') box2;
  @ViewChild('box3') box3;
  @ViewChild('box4') box4;
  @ViewChild('box5') box5;
  @ViewChild('box6') box6;

  tl: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public events: Events
  ) {

    this.tl = new TimelineMax({delay: 1});

    events.subscribe('menu:opened', () => {
      console.log('menu open');
    });

    events.subscribe('menu:closed', () => {

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    this.tl
      .from(this.box1.nativeElement, .2, {autoAlpha: 0, ease: Back.easeOut.config(4), scale: 0.5}, "-=.15")
      .from(this.box2.nativeElement, .2, {autoAlpha: 0, ease: Back.easeOut.config(4), scale: 0.5}, "-=.14")
      .from(this.box3.nativeElement, .2, {autoAlpha: 0, ease: Back.easeOut.config(4), scale: 0.5}, "-=.13")
      .from(this.box4.nativeElement, .2, {autoAlpha: 0, ease: Back.easeOut.config(4), scale: 0.5}, "-=.12")
      .from(this.box5.nativeElement, .2, {autoAlpha: 0, ease: Back.easeOut.config(4), scale: 0.5}, "-=.11")
      .from(this.box6.nativeElement, .2, {autoAlpha: 0, ease: Back.easeOut.config(4), scale: 0.5}, "-=.10");
  }
}
