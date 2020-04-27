import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

@Injectable()
export class JwtService {
  public static invalidDecodedPayloadError: Error = new Error("Decoded payload is not an object.");
  public static tokenExpiredError: Error = new Error("Token expired.");
  private readonly expiration = 600;
  public sign(payload: string | object | Buffer, expiration?: number): Promise<string> {
    expiration = expiration || this.expiration;
    return new Promise((resolve, reject) => {
      sign(payload, JWT_SECRET, { expiresIn: expiration }, (err, encoded) => {
        if (err) return reject(err);
        return resolve(encoded);
      });
    });
  }

  public verify<T>(jwt: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      verify(jwt, JWT_SECRET, (err, decoded: any) => {
        if (err) {
          if (err.name === "TokenExpiredError") return reject(JwtService.tokenExpiredError);
          return reject(err);
        }
        if (typeof decoded !== 'object') {
          return reject(JwtService.invalidDecodedPayloadError);
        }
        return resolve(decoded);
      });
    })
  }
}
