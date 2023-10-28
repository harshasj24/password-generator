const usersSchema = require("../models/index");
const { addDays } = require("../constants/constants");
class User {
  async create(user) {
    try {
      await usersSchema.insertMany([user]);
      return true;
    } catch (error) {
      return null;
    }
  }

  async find(querry) {
    try {
      return await usersSchema.findOne(querry);
    } catch (error) {
      return null;
    }
  }
  async updateOne(selection, querry) {
    try {
      return await usersSchema.updateOne(selection, querry);
    } catch (error) {
      return null;
    }
  }

  async blockUser(querry) {
    let authentication = {
      invalidCount: 0,
      isBlocked: true,
      blockedTill: addDays(1),
    };
    try {
      await this.updateOne(querry, {
        $set: {
          authentication,
        },
      });
      return authentication;
    } catch (error) {}
  }

  async incrementInvalidCount(querry) {
    try {
      const user = await this.find(querry);
      console.log(user);
      let invalidCount = user.authentication.invalidCount;
      invalidCount++;

      return await this.updateOne(querry, {
        $set: {
          authentication: {
            ...user.authentication,
            invalidCount: invalidCount,
          },
        },
      });
    } catch (error) {
      console.log("error");
      return null;
    }
  }

  async resetAuthentication(querry, ...authenticationKeys) {
    try {
      const user = await this.find(querry);
      console.log(user, "reset called");
      let userAuthentication = user.authentication;
      const initialValues = {
        invalidCount: 0,
        isBlocked: false,
        blockedTill: null,
      };
      authenticationKeys.map((key) => {
        if (key === "all") {
          userAuthentication = {
            ...userAuthentication,
            invalidCount: 0,
            isBlocked: false,
            blockedTill: null,
          };
        }
        if (
          key === "invalidCount" ||
          key === "isBlocked" ||
          key === "blockedTill"
        ) {
          userAuthentication = {
            ...userAuthentication,
            [key]: initialValues[key],
          };
        }
      });
      this.updateOne(
        { querry },
        {
          $set: {
            authentication: userAuthentication,
          },
        }
      );
    } catch (error) {
      console.log("error");
      return null;
    }
  }
}

module.exports = new User();
