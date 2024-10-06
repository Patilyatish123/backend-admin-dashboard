const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const userController = require('../controllers/userController')
const User = require('../models/users')


// Route to display all data
router.get('/',(req,res)=>{
    res.redirect('/all-data')
})
router.get('/all-data', userController.allData);


// Route to display data by id
router.get('/:id', userController.searchData);



// // Route to add new data
router.post('/add', jsonParser, userController.addData);

router.get('/update/:id', userController.loadUpdateForm);

// Route to update data (using POST for simplicity)
router.post('/update/:id', jsonParser, userController.updateData);

// Route to delete data (using POST for simplicity)
router.post('/delete/:id', jsonParser, userController.deleteData);

module.exports = router;

