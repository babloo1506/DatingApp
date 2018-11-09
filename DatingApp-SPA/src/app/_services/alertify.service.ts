import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
constructor() { }

  confirm(message: string, okCallBack: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        okCallBack();
      } else { }
    });
  }

  success(messsage: string) {
    alertify.success(messsage);
  }

  error(messsage: string) {
    alertify.error(messsage);
  }

  message(messsage: string) {
    alertify.message(messsage);
  }
  warning(messsage: string) {
    alertify.warning(messsage);
  }

}
