import { AdminAuthGuard } from "./services/admin-auth-guard.service";
import { AuthGuard } from "./services/auth-guard.service";
import { AdminComponent } from "./components/admin/admin.component";
import { AppModule } from "./app.module.server";
import { AuthService } from "./services/auth.service";
import { BrowserXhr } from "@angular/http";
import {
  BrowserXhrWithProgress,
  ProgressService
} from "./services/progress.service";
import { PhotoService } from "./services/photo.service";
import { AppErrorHandler } from "./app.error-handler";

import { PaginationComponent } from "./components/shared/pagination.component";
import { ViewVehicleComponent } from "./components/view-vehicle/view-vehicle";
import { VehicleListComponent } from "./components/vehicle-list/vehicle-list.component";
// import { AppErrorHandler } from "./app.error-handler";
import { FormsModule } from "@angular/forms";
import { NgModule, ErrorHandler } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { VehicleService } from "./services/vehicle.service";
import { VehicleFormComponent } from "./components/vehicle-form/vehicle-form.component";
import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";
import { FetchDataComponent } from "./components/fetchdata/fetchdata.component";
import { CounterComponent } from "./components/counter/counter.component";
import { AUTH_PROVIDERS } from "angular2-jwt";
import { ChartModule } from "angular2-chartjs";

export const sharedConfig: NgModule = {
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,
    HomeComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    AdminComponent
  ],
  imports: [
    FormsModule,
    ChartModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: "", redirectTo: "vehicles", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "counter", component: CounterComponent },
      {
        path: "admin",
        component: AdminComponent,
        canActivate: [AdminAuthGuard]
      },
      { path: "fetch-data", component: FetchDataComponent },
      {
        path: "vehicles/new",
        component: VehicleFormComponent,
        canActivate: [AuthGuard]
      },
      { path: "vehicles/:id", component: ViewVehicleComponent },
      {
        path: "vehicles/edit/:id",
        component: VehicleFormComponent,
        canActivate: [AuthGuard]
      },
      { path: "vehicles", component: VehicleListComponent },
      { path: "**", redirectTo: "home" }
    ])
  ],
  providers: [
    VehicleService,
    PhotoService,

    AuthService,
    AuthGuard,
    AdminAuthGuard,
    AUTH_PROVIDERS,

    { provide: ErrorHandler, useClass: AppErrorHandler }
  ]
};
