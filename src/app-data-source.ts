import { User } from "./entity/user.entity"
import { DataSource } from "typeorm"
import { AuctionItem } from "./entity/auctionItem.entity"
import { Bid } from "./entity/bid.entity"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "db",
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [User, AuctionItem, Bid],
    logging: true,
    synchronize: true,
})