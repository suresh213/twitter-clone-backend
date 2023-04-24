import { db } from '../db/models';
import { TweetInstance } from '../db/types';

const { Tweet, User } = db;

/**
 * Service class for the Tweet Table.
 */
class TweetService {
  /**
   * Gets tweets for recruiter.
   * @param {Object} filter - filter for the Tweet table.
   * @returns {Promise<TweetInstance[]>} - Array of all the Tweet.
   */
  static async getAll(filter = {}): Promise<TweetInstance[]> {
    try {
      return await Tweet.findAll({
        where: filter,
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['name', 'username', 'avatar'],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Adds a new Tweet.
   * @param {TweetInstance} newTweet - new Tweet object.
   * @returns {Promise<TweetInstance>} - created Tweet.
   */
  static async addOne(newTweet: TweetInstance): Promise<TweetInstance> {
    try {
      return await Tweet.create(newTweet);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates a Tweet.
   * @param {number} id - Tweet Id.
   * @param {TweetInstance} updateTweet - update Tweet object.
   * @returns {Promise<TweetInstance | null>} - updated Tweet, or null if Tweet was not found.
   */
  static async updateOne(
    id: number,
    updateTweet: TweetInstance
  ): Promise<TweetInstance | null> {
    try {
      const tweet = await Tweet.findOne({
        where: { id: Number(id) },
      });
      if (tweet) {
        return await tweet.update(updateTweet);
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a Tweet.
   * @param {number} id - Tweet Id.
   * @returns {Promise<number | null>} - number of deleted Tweets, or null if Tweet was not found.
   */
  static async deleteOne(id: number): Promise<number | null> {
    try {
      const tweet = await Tweet.findOne({
        where: { id: Number(id) },
      });

      if (tweet) {
        return await Tweet.destroy({
          where: { id: Number(id) },
        });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default TweetService;
