import { VehicleService } from "./../../services/vehicle.service";
import { Component } from "@angular/core";

@Component({
  selector: "vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"],
  providers: [VehicleService]
})
export class VehicleFormComponent {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: any = {};

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => (this.makes = makes));
    this.vehicleService
      .getFeatures()
      .subscribe(features => (this.features = features));
  }

  onMakeChange() {
    const selectedMake = this.makes.find(m => m.id == this.vehicle.make);

    this.models = selectedMake ? selectedMake.models : [];
  }
}
