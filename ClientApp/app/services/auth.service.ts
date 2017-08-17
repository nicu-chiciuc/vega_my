import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelper } from "angular2-jwt";
import "rxjs/add/operator/filter";
import * as auth0 from "auth0-js";

console.log(auth0);

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: "Wg3E418AlvZSk6dyb2Lxb16sHQ944ao7",
    domain: "vegaprojn.auth0.com",
    responseType: "token id_token",
    audience: "https://vegaprojn.auth0.com/userinfo",
    redirectUri: "http://localhost:5000/vehicles",
    scope: "openid"
  });

  userProfile: any;
  private roles: string[] = [];

  constructor(public router: Router) {
    this.readUserFromLocalStorage();
  }

  public login(): void {
    this.auth0.authorize();
  }

  public isInRole(roleName) {
    return this.roles.indexOf(roleName) > -1;
  }

  public handleAuthentication(): void {
    console.log(auth0);

    this.auth0.parseHash((err, authResult) => {
      console.log("authResult", authResult);
      if (authResult && authResult.accessToken) {
        window.location.hash = "";
        this.setSession(authResult);

        this.getProfile();

        this.router.navigate(["/home"]);
      } else if (err) {
        this.router.navigate(["/home"]);
        console.log(err);
      }
    });
  }

  private readUserFromLocalStorage() {
    this.userProfile = JSON.parse(localStorage.getItem("profile"));

    const token = localStorage.getItem("token");
    if (token) {
      const jwtHelper = new JwtHelper();
      const decodedToken = jwtHelper.decodeToken(token);
      this.roles = decodedToken["https://vega.com/roles"];
    }
  }

  public getProfile(): void {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      throw new Error("Access token must exist to fetch profile");
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (err) throw err;

      localStorage.setItem("profile", JSON.stringify(profile));

      this.readUserFromLocalStorage();
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("token", authResult.accessToken);
    // localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem("token");
    // localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("profile");
    this.userProfile = null;
    this.roles = [];
    // Go back to the home route
    this.router.navigate(["/"]);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
