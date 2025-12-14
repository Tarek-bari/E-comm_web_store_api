import { Request, Response } from "express";
import User from "../../models/user";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "please provide email and password" });
    return;
  }

  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    res
      .status(401)
      .json({ message: "there is no user with the email you provided" });
    return;
  }

  const match = await compare(password, foundUser.password);
  if (match) {
    const roles = foundUser.roles
      ? Object.values(foundUser.roles).filter(Boolean)
      : [];

    const payload = {
      UserData: {
        id: foundUser._id,
        roles: roles,
      },
    };

    const token = sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: "15m",
    });

    const refreshToken = sign(
      { id: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = [refreshToken];

    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.json({ roles, token });
    return;
  } else {
    res.status(401).json({ message: "incorrect password" });
    return;
  }
};
