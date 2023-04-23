import { db } from '../db/models';
import { UserInstance } from '../db/models/types';

const { User } = db;

/**
 * Service class for the Users Table.
 */
class UserService {
  /**
   * Creates a new user.
   * @param {UserInstance} newUser - The user data to create.
   * @param {any} transaction - The transaction to execute the operation.
   * @returns {Promise<UserInstance | null>} The created user instance.
   */
  static async createOne(
    newUser: UserInstance,
    transaction: any = null
  ): Promise<UserInstance | null> {
    try {
      const user = await User.create(newUser, { transaction });
      return user ? user.toJSON() : user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a user by filter.
   * @param {any} filter - The filter to apply the search.
   * @param {boolean} withPassword - Indicates if the password attribute should be included.
   * @returns {Promise<UserInstance | null>} The retrieved user instance.
   */
  static async getOne(
    filter = {},
    withPassword = false
  ): Promise<UserInstance | null> {
    try {
      const user = await User.findOne({
        where: filter,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      return user ? user.toJSON(withPassword) : user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates a user by filter.
   * @param {any} filter - The filter to apply the update.
   * @param {UserInstance} updateUser - The data to update the user.
   * @param {any} transaction - The transaction to execute the operation.
   * @returns {Promise<[number, UserInstance[]]>} The updated user instance.
   */
  static async updateOne(
    filter = {},
    updateUser: UserInstance,
    transaction = null
  ): Promise<[number, UserInstance[]]> {
    try {
      return await User.update(
        updateUser,
        {
          where: filter,
        },
        { transaction }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
