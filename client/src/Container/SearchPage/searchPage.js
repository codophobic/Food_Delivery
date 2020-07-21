import React, { Component } from 'react'
import queryString from 'query-string';
import './searchPage.css';
import Header from '../../ui/Header';
import Pagination from "react-js-pagination";
import Axios from 'axios';
import Meal from '../../data/meal';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
//require("bootstrap/less/bootstrap.less");

export default class searchPage extends Component {

    constructor(props){
       super(props);
       this.state={
           resList:[],
           locationList:[],
           location:null,
           city:'India',
           cuisine:null,
           cuisineArray:[],
           meal:null,
           cost:null,
           sort:1,
           page:1,
           cityName:'India',
           itemCount:0,
           mealName:'',
           selectedCity:'',
           selectedLocation:[]
       }
       this.myRef = React.createRef();
    }

    componentDidMount(){
        const values= queryString.parse(this.props.location.search);
        const location=values.location_id;
        let city=values.city_id;
        const cuisine= values.cuisine_type;
        const meal= values.meal_type;
        const cost= values.cost;
        const page=values.page;
        const sort=values.sort;

        Axios.get(`/api/filterRestaurants?city_id=${city}&location_id=${location}&meal_type=${meal}&cost=${cost}&cuisine_type=${cuisine}&sort=${sort}&page=${page}`).then(res=>{
                       console.log(res.data);
                       this.setState({
                           ...this.state,
                           resList:res.data.restaurant,
                           location,city,cuisine,meal,cost,page,sort,
                           itemCount:res.data.itemsCount
                       })
                   }).catch(err=>console.log(err));
        this.setState({
            ...this.state,
            cityName:window.sessionStorage.getItem('cityName'),
            mealName:Meal[parseInt(meal)-1].name
        })

        Axios.get('/api/getCities').then(res=>{
            this.setState({
                ...this.state,
               cityList:res.data.cityData
            });
            console.log(res.data);
        })
      
        
        console.log(values);
    }
    renderDropdownLocation=(option)=>{
        return <div>{option.name}</div>
    }
    handleCityChange = (selected) => {

        if(!selected[0])
        {
            this.setState({
                ...this.state,
                locationList:[]
            })
            return;
        }
      
        this.setState({ ...this.state,
            selectedCity: selected ,
        city:selected[0].city_id,
        location:null});
     
        selected[0]&&window.sessionStorage.setItem("city", selected[0].city_id);
        selected[0]&&window.sessionStorage.setItem("cityName",selected[0].name);
        selected[0]&&window.sessionStorage.setItem("area",null);
        selected[0]&&Axios.get(`/api/getLocations/${selected[0].city_id}`).then(res=>{
            this.setState({
            ...this.state,
              locationList:res.data.locationData,
              
            });
        })
     
        if(selected[0])
        {
            const {location,city,meal,cuisine,cost,sort,page}= this.state;
            Axios.get(`/api/filterRestaurants?city_id=${selected[0].city_id}&location_id=${null}&meal_type=${meal}&cost=${cost}&cuisine_type=${cuisine}&sort=${sort}&page=${page}`).then(res=>{
                console.log(res.data);
                this.setState({
                    ...this.state,
                    resList:res.data.restaurant,
                    itemCount:res.data.itemsCount,
                    cityName:window.sessionStorage.getItem('cityName'),
                    selectedLocation:[]
                })
                
            }).catch(err=>console.log(err));
            this.props.history.push(`/restaurantSearchPage?location_id=${null}&city_id=${selected[0].city_id}&cuisine_type=${cuisine}&meal_type=${meal}&cost=${cost}&page=${page}&sort=${sort}`);
        }

        

    }
   
    handleLocationChange=(selected)=>{
        if(!selected[0])
        {
            this.setState({
                ...this.state,
                selectedLocation:selected,
                location:null
            })
            return;
        }
        
        console.log(selected);
        this.setState({
            ...this.state,
            selectedLocation:selected,
            location:selected[0].location_id
        });
        selected[0]&&window.sessionStorage.setItem("area",selected[0].location_id);
        const {city,meal,cuisine,cost,sort,page}= this.state;
        Axios.get(`/api/filterRestaurants?city_id=${city}&location_id=${selected[0].location_id}&meal_type=${meal}&cost=${cost}&cuisine_type=${cuisine}&sort=${sort}&page=${page}`).then(res=>{
            console.log(res.data);
            this.setState({
                ...this.state,
                resList:res.data.restaurant,
                itemCount:res.data.itemsCount,
                cityName:window.sessionStorage.getItem('cityName'),
            })
        }).catch(err=>console.log(err));
        this.props.history.push(`/restaurantSearchPage?location_id=${selected[0].location_id}&city_id=${city}&cuisine_type=${cuisine}&meal_type=${meal}&cost=${cost}&page=${page}&sort=${sort}`);
    
    }
    CuisinechangeHandler=(event)=>{
        let id= event.target.value;
        const {cuisineArray}=this.state;
        let x=cuisineArray.indexOf(id);
        if(x===-1)
        cuisineArray.push(id);
        else
        {
          cuisineArray.splice(x,1);
        }
        let d;
        if(cuisineArray.length===0)
        {
            d=null;
            this.setState({
                ...this.state,
                cuisine:null,
                cuisineArray:cuisineArray
            });
        }
        else
        {
         d=0;
        let f=1;
        for(let i=0;i<cuisineArray.length;i++)
        {
          d= d+ cuisineArray[i]*(f);
          f=f*10;
        }

        
        this.setState({
            ...this.state,
            cuisine:d,
            cuisineArray:cuisineArray
        });

    }
        
        const {location,city,meal,cost,sort,page}= this.state;
        Axios.get(`/api/filterRestaurants?city_id=${city}&location_id=${location}&meal_type=${meal}&cost=${cost}&cuisine_type=${d}&sort=${sort}&page=${page}`).then(res=>{
            console.log(res.data);
            this.setState({
                ...this.state,
                resList:res.data.restaurant,
                location,city,cuisine:d,meal,cost,page,sort,
                itemCount:res.data.itemsCount
            })
        }).catch(err=>console.log(err));
        this.props.history.push(`/restaurantSearchPage?location_id=${location}&city_id=${city}&cuisine_type=${d}&meal_type=${meal}&cost=${cost}&page=${page}&sort=${sort}`);
      
    
    }

    CostChangeHandler=(event)=>{
        let id = event.target.value;
        const {location,city,meal,cuisine,sort,page}= this.state;
        this.setState({
            ...this.state,
            cost:id
        });
        Axios.get(`/api/filterRestaurants?city_id=${city}&location_id=${location}&meal_type=${meal}&cost=${id}&cuisine_type=${cuisine}&sort=${sort}&page=${page}`).then(res=>{
            console.log(res.data);
            this.setState({
                ...this.state,
                resList:res.data.restaurant,
                location,city,cuisine,meal,cost:id,page,sort,
                itemCount:res.data.itemsCount
            })
        }).catch(err=>console.log(err));
        this.props.history.push(`/restaurantSearchPage?location_id=${location}&city_id=${city}&cuisine_type=${cuisine}&meal_type=${meal}&cost=${id}&page=${page}&sort=${sort}`);
      
    }

    SortChangeHandler=(event)=>{
     let id=event.target.value;
     console.log(id);
     const {location,city,meal,cuisine,cost,page}= this.state;
        this.setState({
            ...this.state,
            sort:id
        });
        Axios.get(`/api/filterRestaurants?city_id=${city}&location_id=${location}&meal_type=${meal}&cost=${cost}&cuisine_type=${cuisine}&sort=${id}&page=${page}`).then(res=>{
            console.log(res.data);
            this.setState({
                ...this.state,
                resList:res.data.restaurant,
                location,city,cuisine,meal,cost,page,sort:id,
                itemCount:res.data.itemsCount
            })
        }).catch(err=>console.log(err));
        this.props.history.push(`/restaurantSearchPage?location_id=${location}&city_id=${city}&cuisine_type=${cuisine}&meal_type=${meal}&cost=${cost}&page=${page}&sort=${id}`);
     }
     handlePageChange=(page)=>{
         console.log(page);

         this.setState({
             ...this.state,
             page:page
         });
         const {location,city,meal,cuisine,cost,sort}= this.state;
         Axios.get(`/api/filterRestaurants?city_id=${city}&location_id=${location}&meal_type=${meal}&cost=${cost}&cuisine_type=${cuisine}&sort=${sort}&page=${page}`).then(res=>{
            console.log(res.data);
            this.setState({
                ...this.state,
                resList:res.data.restaurant,
                location,city,cuisine,meal,cost,page:page,sort,
                itemCount:res.data.itemsCount
            })
        }).catch(err=>console.log(err));
         this.props.history.push(`/restaurantSearchPage?location_id=${location}&city_id=${city}&cuisine_type=${cuisine}&meal_type=${meal}&cost=${cost}&page=${page}&sort=${sort}`);
         

     }
    filterclickhandler=(e)=>{
        if(document.getElementsByClassName('content')[0].style.display==='none')
       document.getElementsByClassName('content')[0].style.display='block';
       else
       document.getElementsByClassName('content')[0].style.display='none';

    }
   
     resclickhandler=(id)=>{
        this.props.history.push(`/restaurant/${id}`);
     }
    render() {
       
        const {resList,page}= this.state;
       
        return (
            <div>
                <Header/>
           
            <div className='container'>
                
                <div className='searchHeading'>{this.state.mealName} Places in {this.state.cityName}</div>
                <div className='row'>
                <div className='col-sm-3 col-md-3 col-lg-3 filterBox'>
                   <div >
                       <span className='Filters'>Filters</span>
                       <span onClick={this.filterclickhandler} className='mobileShow'>::</span>
                  </div>
                  <br/>
                  <div className='content'>
                    <Typeahead
                        {...this.state.selectedCity}
                        labelKey={(option) => `${option.name}`}
                        id="basic-example"
                        onChange={this.handleCityChange}
                        minLength={1}
                        options={this.state.cityList}
                        placeholder="Please select a City"
                        renderMenuItemChildren={(option, props, index) => {
                            return this.renderDropdownLocation(option);
                        }}
                    />
                    <br/>
                    <Typeahead
                        selected={this.state.selectedLocation}
                        labelKey="name"
                        id="basic-typeahead-single"
                        onChange={this.handleLocationChange}
                        options={this.state.locationList}
                        placeholder="Please select a Area"
                        renderMenuItemChildren={(option, props, index) => {
                            return this.renderDropdownLocation(option);
                        }}
                        ref={this.myRef}
                    />
                    <br/>
                    <div className='Cuisine'>Cuisine</div>
                    <input type='checkbox' onChange={this.CuisinechangeHandler} value={1}/><span className='CheckboxItem'>North Indian</span><br/>
                    <input type='checkbox' onChange={this.CuisinechangeHandler} value={2}/><span className='CheckboxItem'>South Indian</span><br/>
                    <input type='checkbox' onChange={this.CuisinechangeHandler} value={3}/><span className='CheckboxItem'>Chinese</span><br/>
                    <input type='checkbox' onChange={this.CuisinechangeHandler} value={4}/><span className='CheckboxItem'>Fast Food</span><br/>
                    <input type='checkbox' onChange={this.CuisinechangeHandler} value={5}/><span className='CheckboxItem'>Street Food</span><br/>

                    <div className='Cost-For-Two'>Cost for Two</div>
                    <input type='radio' name='cost' onChange={this.CostChangeHandler} value={0}/><span className='RadioItem'>Any</span><br/>
                    <input type='radio' name='cost' onChange={this.CostChangeHandler} value={1}/><span className='RadioItem'>Less than 500</span><br/>
                    <input type='radio' name='cost' onChange={this.CostChangeHandler} value={2}/><span className='RadioItem'>500 to 1000</span><br/>
                    <input type='radio' name='cost' onChange={this.CostChangeHandler} value={3}/><span className='RadioItem'>1000 to 1500</span><br/>
                    <input type='radio' name='cost' onChange={this.CostChangeHandler} value={4}/><span className='RadioItem'>1500 to 2000</span><br/>
                    <input type='radio' name='cost' onChange={this.CostChangeHandler} value={5}/><span className='RadioItem'>2000+</span><br/>

                    <div className='Sort'>Sort</div>
                    <input type='radio' name='sort' onChange={this.SortChangeHandler} value={1}/><span className='RadioCostItem'>Price low to high</span><br/>
                    <input type='radio' name='sort' onChange={this.SortChangeHandler} value={-1}/><span className='RadioCostItem'>Price high to low</span><br/>
                    </div>
                </div>
               
               <div className='col-sm-9 col-md-9 col-lg-9'>
               {
                   (this.state.itemCount===0)?<h3><div style={{marginLeft:'20px'}}>No items Found</div></h3>:
                    (this.state.itemCount+1)/2<page?<h3><div style={{marginLeft:'20px'}}>Go to page 1</div></h3>:
                        resList.map(el=>{
                          return(
                              <div onClick={()=>this.resclickhandler(el._id)} className='ResItem'>
                                  <div className='row row-height' style={{padding:'20px',paddingBottom:'10px'}}>
                                      <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
                                          <img className='imgClass' alt='not found' src={`/assets/images/${el.thumb[0]}.png`}/>
                                      </div>
                                      <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                                         <div className='ResHeading'>{el.name}</div>
                                         <div className='FORT'>{el.rating_text}</div>
                                         <div className='ResAddress'>{el.locality},{el.city}</div>
                                      </div>
                                     
                                </div>
                                <hr/>
                                <div className='row row-height' style={{padding:'10px',paddingBottom:'0px'}}>
                                    <div className='col-sm-3 col-xs-3 col-md-3 col-lg-3'>
                                       <div className='resSubheading'>
                                           CUISINES:
                                           <br/>
                                           COST FOR TWO:
                                       </div>
                                    </div>
                                    <div className='col-sm-9 col-xs-9 col-md-9 col-lg-9'>
                                        <div className='resDetails'>
                                            {el.cuisine.map(el=>{
                                                return el.name+', ';
                                            })}
                                            <br/>
                                            {el.min_price}
                                        </div>
                                    </div>
                                 </div>   

                            </div>
                          )
                      })
                   
               }
         <div style={{marginLeft: '45px'}}>
           <Pagination
          activePage={this.state.page}
          itemsCountPerPage={2}
          totalItemsCount={this.state.itemCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />  
        </div>    
               </div>
                  
        
                </div>
            </div>
            </div>
        )
        
    }
}
