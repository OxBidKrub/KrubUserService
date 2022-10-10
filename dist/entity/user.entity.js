"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Base_entity_1 = require("./base/Base.entity");
const auctionItem_entity_1 = require("./auctionItem.entity");
const bid_entity_1 = require("./bid.entity");
let User = class User extends Base_entity_1.Base {
};
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "age", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "test", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => auctionItem_entity_1.AuctionItem, (auctionItem) => auctionItem.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "auctionItems", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => bid_entity_1.Bid, (bid) => bid.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "bids", void 0);
User = tslib_1.__decorate([
    (0, typeorm_1.Entity)('user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map