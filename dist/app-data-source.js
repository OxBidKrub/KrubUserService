"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const user_entity_1 = require("./entity/user.entity");
const typeorm_1 = require("typeorm");
const auctionItem_entity_1 = require("./entity/auctionItem.entity");
const bid_entity_1 = require("./entity/bid.entity");
exports.myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Watcha49265",
    database: "oxbidKrub",
    entities: [user_entity_1.User, auctionItem_entity_1.AuctionItem, bid_entity_1.Bid],
    logging: true,
    synchronize: true,
});
//# sourceMappingURL=app-data-source.js.map