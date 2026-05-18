const express = require("express");

const Transaction = require("../models/Transaction");

const router = express.Router();


// ADD TRANSACTION
router.post("/add", async (req, res) => {

    try {

        console.log(req.body);

        const transaction = await Transaction.create(
            req.body
        );

        res.status(201).json({
            message: "Transaction Added",
            transaction,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
});


// GET TRANSACTIONS
router.get("/:userId", async (req, res) => {

    try {

        const transactions = await Transaction.find({
            userId: req.params.userId,
        });

        res.status(200).json(transactions);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
});


// DELETE TRANSACTION
router.delete("/:id", async (req, res) => {

    try {

        await Transaction.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Transaction Deleted",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;