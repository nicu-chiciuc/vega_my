import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected auth: AuthService) {}

  canActivate() {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    window.location.href =
      "https://vegaprojn.auth0.com/login?client=Wg3E418AlvZSk6dyb2Lxb16sHQ944ao7";

    return false;
  }
}
