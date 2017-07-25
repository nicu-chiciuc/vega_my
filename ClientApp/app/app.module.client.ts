import { AppErrorHandler } from "./app.error-handler";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { sharedConfig } from "./app.module.shared";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  bootstrap: sharedConfig.bootstrap,
  declarations: sharedConfig.declarations,
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ...sharedConfig.imports
  ],
  providers: [
    { provide: "ORIGIN_URL", useValue: location.origin },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ]
})
export class AppModule {}
