import { Injectable } from '@nestjs/common';
import { CredencialService } from './credencial/credencial.service';
import { JwtService } from './jwt/jwt.service';
import { Contactable } from '../common/interfaces/contactable.interface';
import { RefreshtokenService } from './refreshtoken/refreshtoken.service';

@Injectable()
export class AuthService {
  public static notMatchingStatesError: Error = new Error("States do not match.");
  private static refreshTokenExpiration: number = 60*60*24;
  private static accessTokenExpiration: number = 60*10;

  constructor(private credencialService: CredencialService, private jwtService: JwtService, private refreshtokenService: RefreshtokenService) {}

  validateCredentials(credentials: { email: string, password: string }): Promise<boolean> {
    return this.credencialService.validate(credentials);
  }

  verifyEmail(email: string) {
    return this.credencialService.verifyEmail(email);
  }

  async getJwt(email: string) {
    const { state, id } = await this.credencialService.getState(email);
    return this.jwtService.sign({ email, state, id });
  }

  async getNewToken(credential: Contactable): Promise<string> {
    const { email, state } = credential;
    const { state: trueState, id } = await this.credencialService.getState(email);
    if (trueState !== state) {
      throw AuthService.notMatchingStatesError;
    }
    const newState = await this.credencialService.changeState(email);
    return this.jwtService.sign({ email, state: newState, id })
  }

  verifyJwt(jwt: string): Promise<object> {
    return this.jwtService.verify<object>(jwt);
  }

  async verifyState(credential: Contactable) {
    const { email, state } = credential;
    const { state: trueState } = await this.credencialService.getState(email);
    return trueState === state;
  }

  async verifyFromId(id: string) {
    const credencial = await this.credencialService.getFromId(id);
    const email = credencial.get('email');
    return this.verifyEmail(email);
  }

  async verifyRefreshToken(jwt: string) {
    const token: { id: string, state: string, credencialId: string } = await this.jwtService.verify(jwt);
    const trueToken = await this.refreshtokenService.getById(token.id);
    return trueToken.get('state') === token.state;
  }

  async getNewRefreshToken(token: { id: string, state: string, credencialId: string }) {
    const { id, credencialId } = token;
/*    const trueToken = await this.refreshtokenService.getById(id);
    const trueState = trueToken.get('state');
    if (trueState !== state) {
      throw AuthService.notMatchingStatesError;
    }*/
    // Unnecesary comprobations
    const expires = new Date(Date.now() + (AuthService.refreshTokenExpiration * 1000));
    const newState = await this.refreshtokenService.changeState(id, expires);
    return this.jwtService.sign({ id, credencialId, state: newState }, AuthService.refreshTokenExpiration);
  }

  async getNewAccessToken(token: { id: string, state: string, credencialId: string }) {
    const { id } = token;
    return await this.jwtService.sign({ id }, AuthService.accessTokenExpiration);
  }
}



