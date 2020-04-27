import { Injectable } from '@nestjs/common';
import { Credencial } from '../../database/schema/Credencial.model';
import { v1 } from 'uuid';

@Injectable()
export class CredencialService {
  static readonly invalidCredentialError: Error = new Error("Credencial invalida.")
  static readonly notFoundError: Error = new Error("Credencial not found.");
  static readonly notVerifiedError: Error = new Error("Credencial not verified.");
  static readonly alreadyVerifiedError: Error = new Error("Credencial already verified.");
  static readonly notAffectedRowsError: Error = new Error("0 Credential rows affected.");

  async validate(credencial: { email: string, password: string }): Promise<boolean> {
    const { email, password } = credencial;
    const credencial1 = await Credencial.findOne({ where: { email }, rejectOnEmpty: CredencialService.notFoundError });
    if (!credencial1.get('verified')) {
      throw CredencialService.notVerifiedError;
    }
    return credencial1.checkPassword(password);
  }

  async create(credencial: { email: string, password: string }): Promise<string> {
    const { email, password } = credencial;
    const credencial1 = await Credencial.create({ email, password });
    return credencial1.get('id');
  }

  async verifyEmail(email: string) {
    const credencial = await Credencial.findOne({ where: { email }, rejectOnEmpty: CredencialService.notFoundError });
    if (credencial.get('verified')) {
      throw CredencialService.alreadyVerifiedError;
    }
    await credencial.update({ verified: true });
  }

  async changeState(email: string): Promise<string> {
    const uuid = v1();
    const [ number ] = await Credencial.update({ state: uuid }, { where: { email }, fields: [ 'state' ] });
    if (number === 0) {
      throw CredencialService.notAffectedRowsError;
    }
    return uuid;
  }

  async getState(email: string): Promise<{ state: string, id: string }> {
    const credencial = await Credencial.findOne({ where: { email }, attributes: ['state', 'id'], rejectOnEmpty: CredencialService.notFoundError });
    return {
      state: "",
      id: credencial.get('id')
    };
  }

  getFromId(id: string): Promise<Credencial> {
    return Credencial.findByPk(id, { rejectOnEmpty: CredencialService.notFoundError });
  }
}
