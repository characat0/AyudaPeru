import { Injectable } from '@nestjs/common';
import { RefreshToken } from '../../database/schema/RefreshToken.model';
import { v1 } from 'uuid';

@Injectable()
export class RefreshtokenService {
  static readonly notAffectedRowsError: Error = new Error("0 RefreshToken rows affected.");
  static readonly notFoundError: Error = new Error("Refresh Token not found.");

  async changeState(id: string, expires?: Date): Promise<string> {
    expires = expires || undefined;
    const uuid = v1();
    const [ number ] = await RefreshToken.update({ state: uuid, expires }, { where: { id }});
    if (number === 0) {
      throw RefreshtokenService.notAffectedRowsError;
    }
    await RefreshToken.increment({ uses: 1 }, { where: { id }});
    return uuid;
  }

  createToken(credencialId: string, expires?: Date): Promise<RefreshToken> {
    return RefreshToken.create({ credencialId, expires });
  }

  getById(id: string) {
    return RefreshToken.findByPk(id, { rejectOnEmpty: RefreshtokenService.notFoundError });
  }

}
