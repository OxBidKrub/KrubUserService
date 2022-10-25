"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_data_source_1 = require("../app-data-source");
const user_entity_1 = require("../entity/user.entity");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const getAllUsers = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).find(); });
const getUserById = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({
        id: id,
    });
});
const topup = (id, amount) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const topup = yield app_data_source_1.myDataSource.transaction("SERIALIZABLE", (transactionalEntityManager) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const user = yield transactionalEntityManager
                .getRepository(user_entity_1.User)
                .findOneBy({ id });
            const userMoney = parseInt(user.money);
            amount = parseInt(amount);
            user.money = (amount + userMoney).toString();
            yield transactionalEntityManager.getRepository(user_entity_1.User).save(user);
            return { message: "Topup successfull" };
        }));
        return { message: "Topup successfull" };
    }
    catch (error) {
        console.log(error);
        return { error: "Topup failed" };
    }
});
const pay = (payerId, payeeId, amount) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        var payable = false;
        const pay = yield app_data_source_1.myDataSource.transaction("SERIALIZABLE", (transactionalEntityManager) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const payer = yield transactionalEntityManager
                .getRepository(user_entity_1.User)
                .findOneBy({ id: payerId });
            const payee = yield transactionalEntityManager
                .getRepository(user_entity_1.User)
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
                yield transactionalEntityManager
                    .getRepository(user_entity_1.User)
                    .save([payer, payee]);
                if (payable) {
                    return { message: "Payment successful" };
                }
                else {
                    return { error: "payment failed" };
                }
            }
            else {
                return { message: "not enough money" };
            }
        }));
        if (payable) {
            return { message: "Payment successful" };
        }
        else {
            return { error: "payment failed" };
        }
    }
    catch (error) {
        return { error: "payment failed" };
    }
});
const getUserByEmail = (email) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({
        email: email,
    });
});
const createUser = (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt();
    const hashedPassword = yield bcrypt_1.default.hash(user.password, salt);
    const tempUser = Object.assign(Object.assign({}, user), { password: hashedPassword });
    const createdUser = app_data_source_1.myDataSource.getRepository(user_entity_1.User).create(tempUser);
    return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(createdUser);
});
const updateUser = (id, mergeData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({
        id,
    });
    app_data_source_1.myDataSource.getRepository(user_entity_1.User).merge(user, mergeData);
    return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(user);
});
const deleteUser = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).delete(id);
});
exports.default = {
    getAllUsers,
    getUserByEmail,
    getUserById,
    topup,
    pay,
    createUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=userRepo.js.map