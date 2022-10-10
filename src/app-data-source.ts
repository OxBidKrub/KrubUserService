import { User } from "./entity/user.entity"
import { DataSource } from "typeorm"
import { AuctionItem } from "./entity/auctionItem.entity"
import { Bid } from "./entity/bid.entity"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Watcha49265",
    database: "oxbidKrub",
    entities: [User, AuctionItem, Bid],
    logging: true,
    synchronize: false,
})