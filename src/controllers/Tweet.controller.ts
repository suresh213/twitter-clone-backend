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
    const Tweets = await TweetService.getAll();

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
    const { user }: any = req;
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
      const newTweet = await TweetService.addOne({
        content,
        authorId: user.id,
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
}

export default TweetController;
