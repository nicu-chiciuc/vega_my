import { VehicleService } from "./../../services/vehicle.service"
import { Vehicle, KeyValuePair } from "./../../models/vehicle"
import { Component, OnInit } from "@angular/core"

@Component({
  selector: "vehicle-list",
  styleUrls: ["./vehicle-list.component.css"],
  templateUrl: "vehicle-list.component.html",
  providers: [VehicleService],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[]
  makes: KeyValuePair[]
  filter: any = {}

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(m => (this.makes = m))

    this.populateVehicles()
  }

  private populateVehicles() {
    this.vehicleService
      .getVehicles(this.filter)
      .subscribe(v => (this.vehicles = v))
  }

  onFilterChange() {
    this.populateVehicles()
  }

  resetFilter() {
    this.filter = {}
    this.onFilterChange()
  }
}
