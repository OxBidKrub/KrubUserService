import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Base } from "./base/Base.entity";
import { AuctionItem } from "./auctionItem.entity";
import { Bid } from "./bid.entity";
@Entity('user')
export class User extends Base{

    @Column()
    @IsString()
    @IsNotEmpty()
    firstName: string

    @Column()
    @IsString()
    @IsNotEmpty()
    lastName: string

    @Column()
    @IsNumber()
    @IsNotEmpty()
    age: number

    @Column()
    @IsNumber()
    @IsNotEmpty()
    test: number

    @OneToMany(() => AuctionItem, (auctionItem) => auctionItem.user)
    auctionItems: AuctionItem[]

    @OneToMany(() => Bid, (bid) => bid.user)
    bids: Bid[]
}


