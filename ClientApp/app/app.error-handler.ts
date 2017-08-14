import { ToastrService } from "ngx-toastr";
import {
  ErrorHandler,
  Inject,
  Injector,
  Injectable,
  isDevMode
} from "@angular/core";
import * as Raven from "raven-js";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  toastrService: ToastrService;
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    this.toastrService = this.injector.get(ToastrService);

    console.log("the error");

    this.toastrService.error("An unexpected error occured.", "Error");

    if (!isDevMode()) Raven.captureException(error.originalError || error);
    else throw error;
  }
}
