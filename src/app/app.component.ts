import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  //public apiLocal: string;
  // public apiProduccion: string;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private push: Push
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    //  this.splashscreen.hide();

if (platform.is('android')) {
      this.push.hasPermission()
        .then((res: any) => {
          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }
        });
      // Create a channel (Android O and above340). You'll need to provide the id, description and importance properties.
      this.push.createChannel({
        id: "testchannel1",
        description: "My first test channel",
        // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
        importance: 3
      }).then(() => console.log('Channel created'));
      // Delete a channel (Android O and above)
      this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
      // Return a list of currently configured channels
      this.push.listChannels().then((channels) => console.log('List of channels', channels))
      this.pushSetup();
    }

      //this.apiLocal="http://mega.com/api/";
      //this.apiProduccion="http://mega.com/api/";
    });
  }

  pushSetup() {
    const options: PushOptions = {
      "android": {
        "senderID": "471059358723",
         "icon":'mega',
         "iconColor":'#5083af',
      },
      "ios": {
      }
    }

    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }




}
