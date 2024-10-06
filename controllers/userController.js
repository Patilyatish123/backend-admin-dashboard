const userModel = require('../models/users_Schema')
const bodyParser = require('body-parser')
const express = require('express')
const jsonParser = bodyParser.json()
const mongoose = require('mongoose')

//logic for search data
const searchData = (req, res) => {
    userModel.findById(req.query._id)
    .then((data) => {
        if (data) {
            res.render('dashboard', { data: [data],totalRecords: 1, startRecord:1,endRecord: 1, skip: 0 });
        } else {
            res.render('dashboard', { data: [],totalRecords: 0,startRecord: 0,endRecord: 0,skip: 0 });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Failed to retrieve data');
    });
};

//logic for view all data
const allData = (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = 8;
    Promise.all([
   userModel.find().limit(limit).skip(skip),
   userModel.countDocuments()
])
        .then(([data, totalRecords]) => {
            const startRecord = skip+1;
            const endRecord = Math.min(skip + limit, totalRecords) 
            res.render('dashboard', { data: data,totalRecords: totalRecords,startRecord: startRecord,endRecord: endRecord, skip:skip });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to retrieve data');
        });
};

//logic to Add new data
const addData = (req, res) => {
    console.log("Add Data:", req.body);
    const { name, age, location, department } = req.body;
    const newUser = new userModel({
        _id: new mongoose.Types.ObjectId(),
        name,
        age,
        location,
        department
    });
    newUser.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to add data');
        });
};

//
const loadUpdateForm = (req, res) => {
    const id = req.params.id;
    userModel.findById(id)
        .then(data => {
            res.render('update-data', { user: data });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to load update form');
        });
};

//logic to update data
const updateData = (req, res) => {
    console.log("Update Data:", req.body); 
    const { name, age, location, department } = req.body;
    userModel.findByIdAndUpdate(
        req.params.id,
        { name, age, location, department },
        { new: true }
    )
    .then(() => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Failed to update data');
    });
};

//logic to delete data
const deleteData = (req, res) => {
    userModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Failed to delete data');
        });
};


module.exports = { allData, deleteData, addData, updateData, searchData,loadUpdateForm }



