import { Component, ViewChild, } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { ServicePage } from '../pages/service/service';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';

declare var TimelineMax: any;
declare var Circ: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('svgOverlay') svgOverlay;
  @ViewChild('menuItem') menuItem;
  @ViewChild('close') close;
  tweenTimeLine: any;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public events: Events,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
    this.tweenTimeLine = new TimelineMax({ paused: true, reversed: true });
    this.menuCtrl.swipeEnable(false);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Service', component: HomePage },
      { title: 'Settings', component: HomePage },
      { title: 'About', component: HomePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleBlackTranslucent();
      Splashscreen.hide();
    });
  }

  ngAfterViewInit() {
    this.tweenTimeLine
      .to('.menu-inner', 0, {visibility:"visible", immediateRender:false}, .10, .10)
      .to(this.svgOverlay.nativeElement, 0, {attr:{fill: '#cd9800'}}, .05, .05)
      .to(this.svgOverlay.nativeElement, .4, {attr:{r: 450}, ease: Circ.easeInOut})
      .from(this.close._elementRef.nativeElement, .2, {autoAlpha: 0})
      .staggerFrom(this.menuItem.nativeElement.children, .3, { autoAlpha: 0, x: 300}, 0.02, 0.2);
  }

  menuClosed() {
    this.events.publish('menu:closed', '');
  }

  menuOpened() {
    this.events.publish('menu:opened', '');
    this.tweenTimeLine.play();
  }

  closeMenu() {
    this.tweenTimeLine.reversed() ? this.tweenTimeLine.play() : this.tweenTimeLine.reverse();

    setTimeout(() => {
      this.menuCtrl.close();
    }, 800)
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
