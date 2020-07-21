import React, { Component } from 'react'
import Searchbar from '../components/searchbar/searchbar';
import QuickSearch from '../components/quickSearch/quickSearch';
const axios =require('axios');
export default class Home extends Component {

    constructor(){
        super();
        this.state={
            cityList:[],
            quickSearchList:[],
            restaurantList:[]
        }
    }

    onTypeAhead = (selected) => {
        axios("/api/getRestaurantList")
            .then(res => this.setState({ ...this.state,restaurantList: res.data.restaurantData }))
            .catch(err => console.log(err))
    }
    componentDidMount(){
        window.sessionStorage.setItem('city',null);
        window.sessionStorage.setItem('area',null);
        window.sessionStorage.setItem('cityName','India');

        //apis to get loc list and qs list.
        axios.get('/api/getMeals').then(res=>{
            console.log(res);
            this.setState({
                ...this.state,
                quickSearchList:res.data.mealData
            });
        });

        axios.get('/api/getCities').then(res=>{
            this.setState({
                ...this.state,
               cityList:res.data.cityData
            });
            console.log(res.data);
        })
       
    }
    render() {
        const{cityList,restaurantList,quickSearchList} = this.state;
        return (
            <div style={{margin:'0em',padding:'0em',overflow:'hidden'}} className='container-fluid'>
               <Searchbar restaurantList={restaurantList} onTypeAhead={this.onTypeAhead} cityList={cityList}/>
               <QuickSearch quickSearchList={quickSearchList}/>
            </div>
        )
    }
}
