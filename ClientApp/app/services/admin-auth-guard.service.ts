import { AuthGuard } from "./auth-guard.service";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router/router";

@Injectable()
export class AdminAuthGuard extends AuthGuard {
  constructor(auth: AuthService) {
    super(auth);
  }

  canActivate() {
    const isAuthenticated = super.canActivate();

    return isAuthenticated ? this.auth.isInRole("Admin") : false;
  }
}
