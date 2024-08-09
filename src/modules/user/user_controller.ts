import { Request, Response } from "express";
import { errorHandling } from "../../constant/services";
import { client } from "../../config/mongo";
import Message from "../../config/message";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  // registration of a company
  static registerCompany = async (req: Request, res: Response) => {
    try {
      const { name, email, type, locations, companyLogo, phone, password } =
        req.body;

      const isAdmin = await client
        .db("main")
        .collection("credential")
        .findOne({ $or: [{ email }, { phone }] });

      if (isAdmin) {
        if (email === isAdmin.email) {
          throw new Message(409, "User with this email already exist.");
        } else if (phone === isAdmin.phone) {
          throw new Message(409, "User with this phone number already exist.");
        }
      }

      const hashedPassword: string = await bcrypt.hash(password, 8);

      const locationsList = locations.split(", ");

      await client.db("main").collection("admin").insertOne({
        name,
        email,
        type,
        locations,
        phone,
        companyLogo,
      });

      await client.db("main").collection("credential").insertOne({
        email,
        phone,
        password: hashedPassword,
        type: "admin",
      });

      const message: Message = {
        statusCode: 200,
        message: "Company creation successful.",
      };

      res.json(message);
    } catch (e) {
      errorHandling(e, res);
    }
  };

  // registration of a candidate
  static registerCandidate = async (req: Request, res: Response) => {
    try {
      const {
        name,
        email,
        phone,
        locations,
        designation,
        skillSet,
        profileImage,
        password,
      } = req.body;

      const isCandidate = await client
        .db("main")
        .collection("credential")
        .findOne({ $or: [{ email }, { phone }] });

      if (isCandidate) {
        if (email === isCandidate.email) {
          throw new Message(409, "User with this email already exist.");
        } else if (phone === isCandidate.phone) {
          throw new Message(409, "User with this phone number already exist.");
        }
      }

      const hashedPassword: string = await bcrypt.hash(password, 8);

      const skillSetList = skillSet.split(", ");
      const locationsList = locations.split(", ");

      await client.db("main").collection("candidate").insertOne({
        name,
        email,
        phone,
        locations: locationsList,
        designation,
        skillSet: skillSetList,
        profileImage,
      });

      await client.db("main").collection("credential").insertOne({
        email,
        phone,
        password: hashedPassword,
        type: "candidate",
      });

      const message: Message = {
        statusCode: 200,
        message: "Candidate creation successful.",
      };

      res.json(message);
    } catch (e) {
      errorHandling(e, res);
    }
  };

  // login both candidate and company
  static loginUser = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await client
        .db("main")
        .collection("credential")
        .findOne({ $or: [{ email: username }, { phone: username }] });

      if (!user) {
        throw new Message(404, "User with this credentials not found.");
      }

      const isPasswordCorrect: boolean = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        throw new Message(401, "Incorrect password.");
      }

      const jwtAuthKey: string = process.env.JWT_AUTH_KEY || "passwordkey";

      const authToken: string = jwt.sign(
        {
          email: user.email,
          phone: user.phone,
          type: user.type,
        },
        jwtAuthKey
      );

      res.json({ authToken, type: user.type });
    } catch (e) {
      errorHandling(e, res);
    }
  };

  // forgot password for both user
  static forgotPassword = (req: Request, res: Response) => {
    try {
      const { email } = req.body;
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static getUserByToken = async (req: Request, res: Response) => {
    try {
      const authToken: string | undefined =
        req.headers.authorization?.split(" ")[1];

      const decodedToken: jwt.JwtPayload = jwt.decode(
        authToken!
      ) as jwt.JwtPayload;

      const user = await client
        .db("main")
        .collection(decodedToken.type)
        .findOne(
          {
            $and: [
              { email: decodedToken.email },
              { phone: decodedToken.phone },
            ],
          },
          { projection: { _id: 0 } }
        );

      res.json(user);
    } catch (e) {
      errorHandling(e, res);
    }
  };
}

export default UserController;
