import * as jwt from 'jsonwebtoken';

const { 
  JWT_SECRET_KEY: secret,
} = process.env;

export interface IPayload {
  payload: {
    _id: string;
    profile: {
      username: string;
      thumbnail: string;
    };
  };
  subject?: string;
}

export const generateToken = ({ payload, subject }: IPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {
      issuer: 'hurem',
      expiresIn: '7d',
      subject,
    }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const decodedToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (
      (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      }
    ));
  });
};