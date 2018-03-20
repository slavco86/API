const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: '/products - GET request handler'
    })
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: '/products - POST request handler'
    })
});

router.get('/:prodID', (req, res, next) => {
    const id = req.params.prodID;
    if (id === 'special') {
        res.status(200).json({
            message: 'SPECIAL PRODUCT!!!',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'you passed an ID'
        })
    }
});

router.patch('/:prodID', (req, res, next) => {
    res.status(200).json({
        message: "Updated product"
    })
});

router.delete('/:prodID', (req, res, next) => {
    res.status(200).json({
        message: "Deleted product"
    })
});



module.exports = router;