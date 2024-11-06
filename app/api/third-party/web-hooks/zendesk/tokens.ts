import { sign } from 'jsonwebtoken';

type Param = {
  secret_key: string;
  key_id: string;
};

export function getZendeskAccessToken({ secret_key, key_id }: Param) {
  const jwtPayload = {
    scope: 'app'
  };

  const options: any = {
    algorithm: 'HS256',
    expiresIn: '1h',
    header: {
      kid: key_id
    }
  };

  const token = sign(jwtPayload, secret_key, options);

  return {
    token,
    headers: {
      Authorization: "Bearer " + token
    },
  }
}
