import { PaginationComponent } from "./components/shared/pagination.component";
import { ViewVehicleComponent } from "./components/view-vehicle/view-vehicle";
import { VehicleListComponent } from "./components/vehicle-list/vehicle-list.component";
// import { AppErrorHandler } from "./app.error-handler";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { VehicleService } from "./services/vehicle.service";
import { VehicleFormComponent } from "./components/vehicle-form/vehicle-form.component";
import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";
import { FetchDataComponent } from "./components/fetchdata/fetchdata.component";
import { CounterComponent } from "./components/counter/counter.component";

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
    ViewVehicleComponent
  ],
  imports: [
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: "", redirectTo: "vehicles", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent },
      { path: "vehicles/new", component: VehicleFormComponent },
      { path: "vehicles/:id", component: ViewVehicleComponent },
      { path: "vehicles/edit/:id", component: VehicleFormComponent },
      { path: "vehicles", component: VehicleListComponent },
      { path: "**", redirectTo: "home" }
    ])
  ],
  providers: [VehicleService]
};
