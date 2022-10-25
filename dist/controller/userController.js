"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginLogic = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const userRepo_1 = tslib_1.__importDefault(require("../repo/userRepo"));
const loginLogic = (email, password) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo_1.default.getUserByEmail(email);
    if (user == null) {
        throw new Error("User not found");
    }
    try {
        const compare = yield bcrypt_1.default.compare(password.trim(), user.password.trim());
        if (compare) {
            const tokenData = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                address: user.address,
            };
            const accessToken = yield jsonwebtoken_1.default.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "7d" });
            return { accessToken: accessToken };
        }
        else {
            return { accessToken: password + "//" + compare + "//" + user.password + "//" + email };
        }
    }
    catch (error) {
        return { accessToken: "error" };
    }
});
exports.loginLogic = loginLogic;
//# sourceMappingURL=userController.js.map