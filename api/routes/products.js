const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Product
        .find()
        .select('name, price, _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs
            }
            res.status(200).json(docs);
        })
        .catch(err => {
            console.info(err);
            res.status(500).json({
                error:err
            });
        })
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.info(result);
            res.status(201).json({
                message: '/products - POST request handler',
                createdProduct: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
            console.info(err);
        });
});

router.get('/:prodID', (req, res, next) => {
    const id = req.params.prodID;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.info(doc);
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({
                    meesage: 'No valid entry found for this ID'
                })
            }
        })
        .catch(err => {
            console.info(err);
            res.status(500).json({
                error: err
            });
        })
});

router.patch('/:prodID', (req, res, next) => {
    const id = req.params.prodID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product
        .update({_id: id},{$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:prodID', (req, res, next) => {
    const id = req.params.prodID
    Product
        .remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});



module.exports = router;
