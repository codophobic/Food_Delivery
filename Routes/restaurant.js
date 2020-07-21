const express= require('express');
const router = express.Router();
const MealModel = require('../Models/Meal');
const CityModel = require('../Models/City');
const LocationModel= require('../Models/Location');
const RestaurantModel= require('../Models/Restaurant');

router.get('/getMeals',(req,res)=>{
    MealModel.find({}).then(result=>{
        res.send({message:'data fetched',mealData:result});
    })
    .catch(err=>{
        res.send(err);
    });
})

router.get('/getCities',(req,res)=>{
    CityModel.find({}).then(result=>{
        res.send({message:'data fetched',cityData:result});
    })
    .catch(err=>{
        res.send(err);
    });
})
router.get('/getRestaurantList',(req,res)=>{
    let findArgs={};
    if(req.query.city_id&&req.query.city_id!='null')
    {
        findArgs={
            ...findArgs,
            city_id:req.query.city_id
        }
    }
    if(req.query.location_id&&req.query.location_id!='null')
    {
        findArgs={
            ...findArgs,
            location_id:req.query.location_id
        }
    }
    RestaurantModel.find(findArgs).then(result=>{
        res.send({message:'data fetched',restaurantData:result});
    })
    .catch(err=>{
        res.send(err);
    });
})

router.get('/getLocations/:id',(req,res)=>{
    LocationModel.find({city_id:req.params.id}).then(result=>{
        res.send({message:'data fetched',locationData:result});
    })
    .catch(err=>{
        res.send(err);
    });
})

router.get('/getRestaurant/:id',(req,res)=>{
    RestaurantModel.find({_id:req.params.id}).then(result=>{
        res.send({message:'data fetched',restaurant:result});
    })
    .catch(err=>{
        res.send(err);
    });
})


router.get('/filterRestaurants',(req,res)=>{
    const query = req.query;
    console.log(query);
    let findArgs={};
    if(query.city_id!='null')
    findArgs.city_id=query.city_id;
    if(query.location_id!='null')
    findArgs.location_id=query.location_id;
 
    if(query.cost!='null'&&query.cost!='0')
    {
        let x= parseInt(query.cost);
    findArgs={
        ...findArgs,
        min_price:{
            $lte:x*500,
            $gte:(x-1)*500+1
        }
    }
}
let cArray=[1,2,3,4,5];
    if(query.cuisine_type!='null')
    {
        cArray=[];
        let x=parseInt(query.cuisine_type);
        while(x>=1)
        {
            let y=x%10;
            console.log(y);
            cArray.push(x%10);
            x=x/10;
            x=parseInt(x);
        }
        console.log(cArray);
       
    }
    //console.log(findArgs);
    start = Number(parseInt(query.page) * 2) - 2;
    end = Number(parseInt(query.page) * 2);
    RestaurantModel.find(
     {
         ...findArgs,
         "type.mealtype":parseInt(query.meal_type),
          "cuisine.type":{
                    $in:[...cArray]
                }
            }
     ).sort({min_price:parseInt(query.sort)}).then(result=>{
     let count = result.length;
     const resultValues = result.slice(start, end);
     res.send({message:'Ress fetched',restaurant:resultValues,itemsCount:count});
     //console.log(result);

 }).catch(err=>console.log(err));

})




module.exports=router;