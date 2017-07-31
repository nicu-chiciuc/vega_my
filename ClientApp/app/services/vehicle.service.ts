import { SaveVehicle } from "./../models/vehicle"
import { Injectable, Inject } from "@angular/core"
import { Http } from "@angular/http"
import * as _ from "lodash"
import "rxjs/add/operator/map"

@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint

  constructor(
    private http: Http,
    @Inject("ORIGIN_URL") private originUrl: string
  ) {
    this.vehiclesEndpoint = originUrl + "/api/vehicles/"
  }

  getMakes() {
    return this.http.get(this.originUrl + "/api/makes").map(res => res.json())
  }

  getFeatures() {
    return this.http
      .get(this.originUrl + "/api/features")
      .map(res => res.json())
  }

  create(vehicle) {
    return this.http.post(this.vehiclesEndpoint, vehicle).map(res => res.json())
  }

  delete(id) {
    return this.http.delete(this.vehiclesEndpoint + id).map(res => res.json())
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndpoint + id).map(res => res.json())
  }

  getVehicles(filter) {
    return this.http
      .get(this.vehiclesEndpoint + "?" + this.toQueryString(filter))
      .map(res => res.json())
  }

  toQueryString(obj) {
    var parts = []
    for (var key in obj) {
      var value = obj[key]
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(value))
    }

    return parts.join("&")
  }

  update(vehicle: SaveVehicle) {
    return this.http
      .put(this.vehiclesEndpoint + vehicle.id, vehicle)
      .map(res => res.json())
  }
}
