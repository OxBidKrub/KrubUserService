import { Base } from "./base/Base.entity";
import { AuctionItem } from "./auctionItem.entity";
import { Bid } from "./bid.entity";
export declare class User extends Base {
    firstName: string;
    lastName: string;
    age: number;
    test: number;
    auctionItems: AuctionItem[];
    bids: Bid[];
}
