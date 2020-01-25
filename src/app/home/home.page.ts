import { Component } from '@angular/core';
import { ELocalNotificationTriggerUnit, LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scheduled = [];
 
  constructor(private plt: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController) {
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
 
      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
    });
  }
 
  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Atención',
      text: 'Chadwick Notification',
      data: { mydata: 'Este mensaje de schudeleS' },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true // Show the notification while app is open
    });
 
    // Works as well!
    // this.localNotifications.schedule({
    //   id: 1,
    //   title: 'Attention',
    //   text: 'Simons Notification',
    //   data: { mydata: 'My hidden message this is' },
    //   trigger: { at: new Date(new Date().getTime() + 5 * 1000) }
    // });
  }
 
  recurringNotification() {
    this.localNotifications.schedule({
      id: 22,
      title: 'Recuerda',
      text: 'Caminar y confirmar tus citas!!',
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
    });
  }
 
  repeatingDaily() {
    this.localNotifications.schedule({
      id: 42,
      title: 'Recuerda',
      text: 'Caminar y confirmar tus citas!!',
      trigger: { every: { hour: 8, minute: 0 } }
    });
  }
 
  showAlert(header, sub, msg) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Si']
    }).then(alert => alert.present());
  }
 
  getAll() {
    this.localNotifications.getAll().then((res: ILocalNotification[]) => {
      this.scheduled = res;
    })
  }
}

