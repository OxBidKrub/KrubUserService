"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_data_source_1 = require("./app-data-source");
const express_1 = tslib_1.__importDefault(require("express"));
const user_entity_1 = require("./entity/user.entity");
const auctionItem_entity_1 = require("./entity/auctionItem.entity");
app_data_source_1.myDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
// create and setup express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
// register routes
// register routes
app.get("/users", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const users = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).find();
        res.json(users);
    });
});
app.get("/users/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({
            id: req.params.id,
        });
        return res.send(results);
    });
});
app.post("/users", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const user = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).create(req.body);
        const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(user);
        return res.send(results);
    });
});
app.put("/users/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({
            id: req.params.id,
        });
        app_data_source_1.myDataSource.getRepository(user_entity_1.User).merge(user, req.body);
        const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(user);
        return res.send(results);
    });
});
app.delete("/users/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).delete(req.params.id);
        return res.send(results);
    });
});
// register routes
app.get("/auction-items", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const auctionItems = yield app_data_source_1.myDataSource.getRepository(auctionItem_entity_1.AuctionItem).find();
        res.json(auctionItems);
    });
});
app.get("/auction-items/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const results = yield app_data_source_1.myDataSource.getRepository(auctionItem_entity_1.AuctionItem).findOneBy({
            id: req.params.id,
        });
        return res.send(results);
    });
});
app.post("/auction-items", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const auctionItem = yield app_data_source_1.myDataSource.getRepository(auctionItem_entity_1.AuctionItem).create(req.body);
        const results = yield app_data_source_1.myDataSource.getRepository(auctionItem_entity_1.AuctionItem).save(auctionItem);
        return res.send(results);
    });
});
app.put("/auction-items/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const auctionItem = yield app_data_source_1.myDataSource.getRepository(auctionItem_entity_1.AuctionItem).findOneBy({
            id: req.params.id,
        });
        app_data_source_1.myDataSource.getRepository(auctionItem_entity_1.AuctionItem).merge(auctionItem, req.body);
        const results = yield app_data_source_1.myDataSource.getRepository(auctionItem_entity_1.AuctionItem).save(auctionItem);
        return res.send(results);
    });
});
app.delete("/auction-items/:id", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const results = yield app_data_source_1.myDataSource.getRepository(auctionItem_entity_1.AuctionItem).delete(req.params.id);
        return res.send(results);
    });
});
app.get("/users/:id/auction-items", function (req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const user = yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).findOneBy({
            id: req.params.id,
        });
        app_data_source_1.myDataSource.getRepository(user_entity_1.User).merge(user, req.body);
        const results = yield (yield app_data_source_1.myDataSource.getRepository(user_entity_1.User).save(user)).auctionItems;
        return res.send(results);
    });
});
// start express server
app.listen(3000);
//# sourceMappingURL=app.js.map