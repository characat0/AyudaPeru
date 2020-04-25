import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { Contactable } from '../../common/interfaces/contactable.interface';


@Injectable()
export class JwtService {
  public static invalidDecodedPayloadError: Error = new Error("Decoded payload is not valid.");

  public sign(payload: Contactable): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(payload, JWT_SECRET, { expiresIn: 600 }, (err, encoded) => {
        if (err) return reject(err);
        return resolve(encoded);
      });
    });
  }

  public verify(jwt: string): Promise<Contactable> {
    return new Promise<Contactable>((resolve, reject) => {
      verify(jwt, JWT_SECRET, (err, decoded: Contactable) => {
        if (err) return reject(err);
        if (typeof decoded !== 'object') {
          return reject(JwtService.invalidDecodedPayloadError);
        }
        if ((!decoded.email || typeof decoded.email !== 'string') || (!decoded.state || typeof decoded.state !== 'string')) {
          return reject(JwtService.invalidDecodedPayloadError);
        }
        return resolve(decoded);
      });
    })
  }
}
