const express = require('express');
const MealModel = require('../Models/Meal');
const CityModel = require('../Models/City');
const LocationModel= require('../Models/Location');
const RestaurantModel= require('../Models/Restaurant');
const router = express.Router();

const Meal =[
    {
        name:'Breakfast',
        content:'Start your day with exclusive Breakfast options',
        meal_type:1,
        thumbs:'breakfast',
    },
    {
        name:'Lunch',
        content:'Enjoy your break with exclusive Lunch options',
        meal_type:2,
        thumbs:'lunch',
    },
    {
        name:'Snacks',
        content:'Have some starters with exclusive Snacks options',
        meal_type:3,
        thumbs:'snacks'
    },
    {
        name:'Dinner',
        content:'End your day with exclusive Dinner options',
        meal_type:4,
        thumbs:'dinner'
    },
    {
        name:'Drinks',
        content:'Refresh your day with exclusive Drinks options',
        meal_type:5,
        thumbs:'drinks'
    },
    {
        name:'Nightlife',
        content:'Enjoy your night with exclusive Nightlife options',
        meal_type:6,
        thumbs:'nightlife'
    }

];

router.post('/addMeals',(req,res)=>{
    MealModel.insertMany(Meal).then(result=>{
        res.send({message:'data inserted',result});
    }).catch(err=>{
        res.send({message:'error',err});
    });
})

router.post('/addCity',(req,res)=>{
    CityModel.insertMany(req.body.city).then(result=>{
        res.send({message:'data inserted',result});
    }).catch(err=>{
        res.send({message:'error',err});
    })
})

router.post('/addLocation',(req,res)=>{
    LocationModel.insertMany(req.body.location).then(result=>{
        res.send({message:'data inserted',result});
    }).catch(err=>{
        res.send({message:'error',err});
    })
})

router.post('/addRestaurant',(req,res)=>{
    RestaurantModel.insertMany(req.body.restaurants).then(result=>{
        res.send({message:'data inserted',result});
    }).catch(err=>{
        res.send({message:'error',err});
    })
})

module.exports=router;

