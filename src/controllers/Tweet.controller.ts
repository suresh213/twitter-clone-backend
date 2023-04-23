import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RequestParamsHandler from '../handlers/RequestParamsHandler';
import ResponseHandler from '../handlers/ResponseHandler';
import TweetService from '../services/Tweet.service';

const responseHandler = new ResponseHandler();
const requestParamsHandler = new RequestParamsHandler();

/**
 * Controller for the Tweet table.
 * @class TweetController
 */
class TweetController {
  /**
   * Gets Tweets.
   * @param {express.Request} req  req - Request object.
   * @param {express.Response} res - Response Object.
   * @return {JSON} - JSON Response.
   */
  static async getTweets(req: Request, res: Response) {
    const { user }: any = req;

    const Tweets = await TweetService.getAll({
      authorId: user.id,
    });

    return responseHandler.setSuccess(
      StatusCodes.OK,
      'Tweets retrieved',
      Tweets,
      res
    );
  }

  /**
   * Create new Tweet.
   * @param {express.Request<{},{},{title:String,summary:String,link:String},{}>} req  - Request object.
   * @param {express.Response} res - Response Object.
   * @return {JSON} - JSON Response.
   */
  static async createTweet(req: Request, res: Response) {
    /**
     * @type {{title:String,summary:String,link:String}} - body from request
     */
    const { content } = req.body;

    const validationResult = requestParamsHandler.checkParams(
      ['content'],
      req.body
    );

    if (validationResult.error) {
      return responseHandler.setError(
        StatusCodes.BAD_REQUEST,
        validationResult.errorMessage,
        res
      );
    }

    try {
      /**
       * @type {Object} - Tweet
       */
      const newTweet = await TweetService.addOne({
        content,
        authorId: 4,
      });

      return responseHandler.setSuccess(
        StatusCodes.OK,
        'Tweet added',
        newTweet,
        res
      );
    } catch (err) {
      return responseHandler.setError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Error in Tweet Creation',
        res
      );
    }
  }

  /**
   * Update an Tweet.
   * @param {express.Request<{},{},{},{TweetId:Number}>} req  req - Request object.
   * @param {express.Response} res - Response Object.
   * @return {JSON} - JSON Response.
   */
  static async updateTweet(req: Request, res: Response) {
    const alteredTweet = req.body;
    const { TweetId } = req.query;

    const validationResult = requestParamsHandler.checkParams(
      ['TweetId'],
      req.query
    );

    if (validationResult.error) {
      return responseHandler.setError(
        StatusCodes.BAD_REQUEST,
        validationResult.errorMessage,
        res
      );
    }

    try {
      const updatedTweet = await TweetService.updateOne(
        Number(TweetId),
        alteredTweet
      );

      if (updatedTweet) {
        return responseHandler.setSuccess(
          StatusCodes.OK,
          'Tweet updated',
          updatedTweet,
          res
        );
      }

      return responseHandler.setError(
        StatusCodes.BAD_REQUEST,
        `Tweet with the TweetId ${TweetId} cannot be found`,
        res
      );
    } catch (err) {
      return responseHandler.setError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Error in updating tweet`,
        res
      );
    }
  }

  /**
   * Delete an Tweet.
   * @param {express.Request<{},{},{},{TweetId:Number}>} req  req - Request object.
   * @param {express.Response} res - Response Object.
   * @return {JSON} - JSON Response.
   */
  static async deleteTweet(req: Request, res: Response) {
    const { TweetId } = req.query;

    const validationResult = requestParamsHandler.checkParams(
      ['TweetId'],
      req.query
    );

    if (validationResult.error) {
      return responseHandler.setError(
        StatusCodes.BAD_REQUEST,
        validationResult.errorMessage,
        res
      );
    }

    try {
      const Tweet = await TweetService.deleteOne(Number(TweetId));

      if (Tweet) {
        return responseHandler.setSuccess(
          StatusCodes.OK,
          'Tweet deleted',
          Tweet,
          res
        );
      }
      return responseHandler.setError(
        StatusCodes.BAD_REQUEST,
        `Tweet with the TweetId ${TweetId} cannot be found`,
        res
      );
    } catch (err) {
      return responseHandler.setError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `Error in deleting tweet`,
        res
      );
    }
  }
}

export default TweetController;
