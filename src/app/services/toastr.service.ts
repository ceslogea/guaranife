import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastrServices {

  constructor(private toastr: ToastrService) { }

  public showSuccess(msg: string) {
    this.toastr.success(msg);
  }

  public showError(msg: string, title: string) {
    this.toastr.error(msg, title);
  }

  public showErrors(msgs: Array<string>) {
    msgs.forEach(element => {
      this.toastr.error(element);
    });
  }

  public checkErrorsAjax(obj: any, additionInfo?: string) {
    console.log(obj)
    if(obj.error != null && obj.error instanceof Array){
      this.showErrors(obj.error);
      return false;
    } else if (obj.message != null && obj.message instanceof Array) {
      this.showErrors(obj.message);
      return false;
    } else if (obj.message != null) {
      if (obj.status === 500)
        this.showError(additionInfo || '', 'Não foi póssível executar a requisição');
      else
        this.showError(obj.message, '');
        return false;
    }
    return true;
  }
}
