import { Request, Response } from "express";
import User from "../../models/user";
import {
  sign,
  verify,
  type VerifyErrors,
  type JwtPayload as BaseJwtPayload,
} from "jsonwebtoken";

interface UserJwtPayload extends BaseJwtPayload {
  UserData: {
    id: string;
    roles: string[];
  };
}

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.sendStatus(401);
    return;
  }

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken });

  verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: VerifyErrors | null, decoded: unknown) => {
      const decodedPayload = decoded as UserJwtPayload;
      if (
        err ||
        foundUser?._id.toHexString() !== decodedPayload?.UserData?.id
      ) {
        res.sendStatus(403);
        console.log(err?.message);
        return;
      }

      const roles = foundUser?.roles
        ? Object.values(foundUser.roles).filter(Boolean)
        : [];

      const token = sign(
        {
          UserData: {
            id: foundUser?._id,
            roles: roles,
          },
        },
        process.env.TOKEN_SECRET as string,
        { expiresIn: "15m" }
      );

      res.json({ roles, token });
    }
  );
};
