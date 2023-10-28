const vaultSchema = require("../models/vault/index");

class Vault {
  async create(vault) {
    try {
      return await vaultSchema.insertMany([vault]);
    } catch (error) {
      return null;
    }
  }

  async findOne(querry) {
    try {
      return await vaultSchema.findOne(querry);
    } catch (error) {
      return null;
    }
  }
  async findAll(querry) {
    try {
      return await vaultSchema.find(querry).lean();
    } catch (error) {
      return null;
    }
  }

  async updateOne(querry, updatedVault) {
    try {
      return await vaultSchema.updateOne(querry, updatedVault);
    } catch (error) {
      return null;
    }
  }

  async deleteOne(querry) {
    try {
      return await vaultSchema.deleteOne(querry);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new Vault();
