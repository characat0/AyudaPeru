import { Injectable } from '@nestjs/common';
import { CredencialService } from './credencial/credencial.service';
import { JwtService } from './jwt/jwt.service';
import { Contactable } from '../common/interfaces/contactable.interface';

@Injectable()
export class AuthService {
  public static notMatchingStatesError: Error = new Error("Payload state does not match with credential state.");

  constructor(private credencialService: CredencialService, private jwtService: JwtService) {}

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
}
