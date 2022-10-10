import { myDataSource } from "./app-data-source"
import express from "express"
import { Request, Response } from "express"
import { User } from "./entity/user.entity";
import { AuctionItem } from "./entity/auctionItem.entity";

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });
// create and setup express app
const app = express()
app.use(express.json())

// register routes

// register routes
app.get("/users", async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(User).find()
    res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).findOneBy({
        id: req.params.id,
    })
    return res.send(results)
})

app.post("/users", async function (req: Request, res: Response) {
    console.log(req.body);
    const user = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: req.params.id,
    })
    myDataSource.getRepository(User).merge(user, req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
})

// register routes
app.get("/auction-items", async function (req: Request, res: Response) {
    const auctionItems = await myDataSource.getRepository(AuctionItem).find()
    res.json(auctionItems)
})

app.get("/auction-items/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(AuctionItem).findOneBy({
        id: req.params.id,
    })
    return res.send(results)
})

app.post("/auction-items", async function (req: Request, res: Response) {
    const auctionItem = await myDataSource.getRepository(AuctionItem).create(req.body)
    const results = await myDataSource.getRepository(AuctionItem).save(auctionItem)
    return res.send(results)
})

app.put("/auction-items/:id", async function (req: Request, res: Response) {
    const auctionItem = await myDataSource.getRepository(AuctionItem).findOneBy({
        id: req.params.id,
    })
    myDataSource.getRepository(AuctionItem).merge(auctionItem, req.body)
    const results = await myDataSource.getRepository(AuctionItem).save(auctionItem)
    return res.send(results)
})

app.delete("/auction-items/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(AuctionItem).delete(req.params.id)
    return res.send(results)
})

app.get("/users/:id/auction-items", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: req.params.id,
    })
    myDataSource.getRepository(User).merge(user, req.body)
    const results = await (await myDataSource.getRepository(User).save(user)).auctionItems
    return res.send(results)
})


// start express server
app.listen(3000)
 