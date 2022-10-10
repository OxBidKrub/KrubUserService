import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { IsNotEmpty, IsString, IsNumber, IsDate, IsUUID, UUIDVersion } from 'class-validator';
import { Base } from "./base/Base.entity";
import { User } from "./user.entity";
import { AuctionItem } from "./auctionItem.entity";
@Entity('bid')
export class Bid extends Base{

    @Column()
    @IsNumber()
    @IsNotEmpty()
    Price: number

    @Column()
    @IsDate()
    @IsNotEmpty()
    time: Date

    @ManyToOne(() => User, (user) => user.bids)
    user: User

    @ManyToOne(() => AuctionItem, (auctionItem) => auctionItem.bids)
    auctionItem: AuctionItem
}


