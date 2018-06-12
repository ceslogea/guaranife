// import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

// @Injectable()
// export class ToastrServices {

//   constructor(private toastr: ToastrService) { }

//   public showSuccess(msg: string) {
//     this.toastr.success(msg);
//   }

//   public showError(msg: string) {
//     this.toastr.error(msg);
//   }

//   public showErrors(msgs: Array<string>) {
//     msgs.forEach(element => {
//       this.toastr.error(element);
//     });
//   }

//   public checkErrorsAjax(obj: any){
//     if(obj.error != null){
//       this.showErrors(obj.error);
//       return false;
//      }
//      return true;
//   }
// }
