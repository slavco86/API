const express = require('express');
const router = express.Router();

router.get('/',(req,res, next) => {
    res.status(200).json({
        message: "orders were fetched"
    })
});

router.post('/',(req,res, next) => {
    res.status(201).json({
        message: "order was created"
    })
});

router.get('/:ordID',(req,res, next) => {
    res.status(200).json({
        message: "order was created",
        ordID: req.params.ordID
    })
});

router.delete('/:ordID',(req,res, next) => {
    res.status(200).json({
        message: "order deleted",
        ordID: req.params.ordID
    })
});



module.exports = router;