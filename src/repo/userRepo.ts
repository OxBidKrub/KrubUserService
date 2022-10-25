import { myDataSource } from "../app-data-source";
import { User } from "../entity/user.entity";
import bcrypt from "bcrypt";
const getAllUsers = async () => await myDataSource.getRepository(User).find();

const getUserById = async (id: string) =>
  await myDataSource.getRepository(User).findOneBy({
    id: id,
  });

const topup = async (id: string, amount) => {
  try {
    const topup = await myDataSource.transaction(
      "SERIALIZABLE",
      async (transactionalEntityManager) => {
        const user = await transactionalEntityManager
          .getRepository(User)
          .findOneBy({ id });
        const userMoney = parseInt(user.money);
        amount = parseInt(amount);
        user.money = (amount + userMoney).toString();
        await transactionalEntityManager.getRepository(User).save(user);
        return { message: "Topup successfull" };
      }
    );
    return { message: "Topup successfull" };
  } catch (error) {
    console.log(error);
    return { error: "Topup failed" };
  }
};

const pay = async (payerId: string, payeeId: string, amount) => {
  try {
    var payable = false;
    const pay = await myDataSource.transaction(
      "SERIALIZABLE",
      async (transactionalEntityManager) => {
        const payer = await transactionalEntityManager
          .getRepository(User)
          .findOneBy({ id: payerId });
        const payee = await transactionalEntityManager
          .getRepository(User)
          .findOneBy({ id: payeeId });
        var payerMoney = parseInt(payer.money);
        var payeeMoney = parseInt(payee.money);
        amount = parseInt(amount);
        payable = payerMoney >= amount;
        if (payable) {
          payerMoney -= amount;
          payeeMoney += amount;
          payer.money = payerMoney.toString();
          payee.money = payeeMoney.toString();
          await transactionalEntityManager
            .getRepository(User)
            .save([payer, payee]);
          if (payable) {
            return { message: "Payment successful" };
          } else {
            return { error: "payment failed" };
          }
        } else {
          return { message: "not enough money" };
        }
      }
    );
    if (payable) {
      return { message: "Payment successful" };
    } else {
      return { error: "payment failed" };
    }
  } catch (error) {
    return { error: "payment failed" };
  }
};

const getUserByEmail = async (email: string) =>
  await myDataSource.getRepository(User).findOneBy({
    email: email,
  });

const createUser = async (user) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(user.password, salt);

  const tempUser = { ...user, password: hashedPassword };

  const createdUser = myDataSource.getRepository(User).create(tempUser);
  return await myDataSource.getRepository(User).save(createdUser);
};

const updateUser = async (id: string, mergeData: object) => {
  const user = await myDataSource.getRepository(User).findOneBy({
    id,
  });
  myDataSource.getRepository(User).merge(user, mergeData);
  return await myDataSource.getRepository(User).save(user);
};

const deleteUser = async (id: string) => {
  return await myDataSource.getRepository(User).delete(id);
};

export default {
  getAllUsers,
  getUserByEmail,
  getUserById,
  topup,
  pay,
  createUser,
  updateUser,
  deleteUser,
};
