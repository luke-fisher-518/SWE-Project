const express = require('express');
const { db } = require("../connect.js");
const { validatePasswordHash } = require("../../auth");
const router = express.Router();

router.post("/login", async (req, res) => {
    let user = await db.collection("users").findOne(req.body.username);
    if (!user) res.status(401).send("User Not Found");

    if (!validatePasswordHash(user.body.password, req.body.password)) {
        return res.status(401).send("Incorrect Password");
    }

})

router.get("/users", async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
})

router.get("/users/:name", async (req, res) => {
    let collection = await db.collection("users");
    let query = { username: req.params.name };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
})

router.post("/users", async (req, res) => {
    try {
        let newDocument = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            inventory: req.body.inventory,
        };
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
})

router.patch("/users/:name", async (req, res) => {
    try {
        const query = { username: req.body.username };
        const updates = {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.level,
                inventory: req.body.inventory,
            },
        };

        let collection = await db.collection("users");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating USER");
    }
})

router.get("/item/:name", async (req, res) => {
    let collection = await db.collection("items");
    let query = { marketname: req.params.name };
    let result = await collection.findOne(query);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
})

router.get("/users/:name/inventory", async (req, res) => {
    let collection = await db.collection("users");
    let query = { username: req.params.name };
    let results = await collection.findOne(query, {projection:{inventory:1, _id:0}})
    res.send(results).status(200);
})

router.patch("users/:name/inventory", async (req, res) => {
    let collection = await db.collection("users");
    let query = { username: req.params.name };
    try {
        const query = { username: req.body.username };
        const updates = {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.level,
                inventory: req.body.inventory,
            },
        };

        let collection = await db.collection("users");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating USER");
    }
})

router.patch("/users", async (req, res) => {
    try {
        let newDocument = {
            username: req.body.username,
            itemName: req.body.itemName,
            float: req.body.float,
            price: req.body.price,
            itemGroup: req.body.itemGroup,
            rarity: req.body.rarity,
            image: req.body.image,
        };
        let collection = await db.collection("users");
        let newResult = await collection.insertOne(newDocument);
        res.send(newResult).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
})

module.exports = router;