import { SaveVehicle, Vehicle } from "./../../models/vehicle";
import { VehicleService } from "./../../services/vehicle.service";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs/Observable";
import "rxjs/add/Observable/forkJoin";
import * as _ from "lodash";

@Component({
  selector: "vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"],
  providers: [VehicleService, ToastrService]
})
export class VehicleFormComponent {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: { name: "", email: "", phone: "" }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastrService: ToastrService
  ) {
    route.params.subscribe(p => {
      if (p["id"]) this.vehicle.id = +p["id"];
    });
  }

  isNewVehicle() {
    return !this.vehicle.id;
  }

  ngOnInit() {
    Observable.forkJoin(
      [
        this.vehicleService.getMakes(),
        this.vehicleService.getFeatures()
      ].concat(
        this.isNewVehicle()
          ? []
          : [this.vehicleService.getVehicle(this.vehicle.id)]
      )
    ).subscribe(
      data => {
        this.makes = data[0];
        this.features = data[1];

        if (!this.isNewVehicle()) {
          this.setVehicle(data[2]);
          this.populateModels();
        }
      },
      err => {
        if (err.status == 404) this.router.navigate(["/home"]);
      }
    );
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = v.features.map(f => f.id);
    console.log(v.features);
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    const selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) this.vehicle.features.push(featureId);
    else {
      var i = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(i, 1);
    }
  }

  delete() {
    if (confirm("Are you sure")) {
      this.vehicleService.delete(this.vehicle.id).subscribe(x => {
        this.router.navigate(["/home"]);
      });
    }
  }

  submit() {
    if (!this.isNewVehicle()) {
      this.vehicleService.update(this.vehicle).subscribe(x => {
        this.toastrService.success(
          "The vehicle was succesfully update",
          "Success"
        );
      });
    } else {
      this.vehicleService.create(this.vehicle).subscribe(x => {
        this.toastrService.success(
          "A new vehicle was added",
          "Success for you"
        );
      });
    }
  }
}
