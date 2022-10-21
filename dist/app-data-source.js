"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const user_entity_1 = require("./entity/user.entity");
const typeorm_1 = require("typeorm");
const auctionItem_entity_1 = require("./entity/auctionItem.entity");
const bid_entity_1 = require("./entity/bid.entity");
exports.myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "db",
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [user_entity_1.User, auctionItem_entity_1.AuctionItem, bid_entity_1.Bid],
    logging: true,
    synchronize: true,
});
//# sourceMappingURL=app-data-source.js.map