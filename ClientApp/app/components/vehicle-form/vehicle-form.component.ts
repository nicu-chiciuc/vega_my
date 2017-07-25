import { VehicleService } from "./../../services/vehicle.service";
import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";

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
  vehicle: any = {
    features: [],
    contact: {}
  };

  constructor(
    private vehicleService: VehicleService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => (this.makes = makes));
    this.vehicleService
      .getFeatures()
      .subscribe(features => (this.features = features));
  }

  onMakeChange() {
    const selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);

    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) this.vehicle.features.push(featureId);
    else {
      var i = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(i, 1);
    }
  }

  submit() {
    this.vehicleService.create(this.vehicle).subscribe(x => console.log(x));
    this.toastrService.info("An unexpected error occured.", "Error");
  }
}
