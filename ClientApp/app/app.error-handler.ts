import { ToastrService } from "ngx-toastr";
import { ErrorHandler, Inject } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
  constructor(@Inject(ToastrService) private toastrService: ToastrService) {}

  handleError(erro: any): void {
    console.log("fuck");

    this.toastrService.error("An unexpected error occured.", "Error");
  }
}
