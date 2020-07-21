import React, { Component } from 'react';
import './searchbar.css';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { withRouter } from "react-router-dom";
import Axios from 'axios';

class SearchBar extends Component {
    state = {
        selected: [],
        isLoading: false,
        options: [],
        locationList:[]
    };

    onRestaurantSelect = (selected) => {
        this.setState({ ...this.state,
            selectedRestaurant: selected });
        this.props.history.push(`/restaurant/${selected[0]._id}`);
    }

    onRestaurantSelect2 = (selected) => {
        this.setState({ ...this.state,
            selectedRestaurant2: selected });
        this.props.history.push(`/restaurant/${selected[0]._id}`);
    }

    handleCityChange = (selected) => {

        if(selected.length===0)
        {
            window.sessionStorage.setItem("city",null);
            console.log('b');
            this.setState({
                ...this.state,
                selectedRestaurant2:[]
            })
            return;
        }
        this.setState({ ...this.state,
            selectedCity: selected ,
        });
        console.log(selected);
        //window.sessionStorage.setItem("area", selected[0].location_id);
        selected[0]&&window.sessionStorage.setItem("city", selected[0].city_id);
        selected[0]&&window.sessionStorage.setItem("cityName",selected[0].name);
        selected[0]&&window.sessionStorage.setItem("area",null);
    
        selected[0]&&Axios.get(`/api/getLocations/${selected[0].city_id}`).then(res=>{
            this.setState({
            ...this.state,
              locationList:res.data.locationData,
              selectedLocation:[],
              selectedRestaurant2:[]
            });
            console.log(this.state.selectedRestaurant2);
        })


        if(!selected[0])
        {
            this.setState({
                ...this.state,
                locationList:[]
            })
        }
        console.log(this.state.selectedRestaurant2);
    }

    handleLocationChange=(selected)=>{
        console.log(selected);
        if(selected.length===0)
        {
           window.sessionStorage.setItem("area",null);
           this.setState({
            ...this.state,
            selectedLocation:selected,
            selectedRestaurant2:[]
        });
            return ;
        }
        
       
    
        this.setState({
            ...this.state,
            selectedLocation:selected,
            selectedRestaurant2:[]
        });
        selected[0]&&window.sessionStorage.setItem("area",selected[0].location_id);
    }

    onTypeAhead = (selected) => {
        const city_id= window.sessionStorage.getItem("city");
        const location_id=window.sessionStorage.getItem("area");
        console.log(city_id);
        Axios.get(`/api/getRestaurantList?city_id=${city_id}&location_id=${location_id}`)
            .then(res => this.setState({ ...this.state,restaurantList: res.data.restaurantData }))
            .catch(err => console.log(err))
    }

    renderDropdownChildren = (option) => {
        return( <div className=" logo-container row">
            <div className="logo-container col-sm-1">
                <img className='restaurant-logo'  src={`/assets/images/${option.thumb[0]}.png`} alt='jeoe' />
            </div>
            <div className="address-container col-sm-11">
                <div className="row restaurant-name">{option.name}</div>
                <div className="row">{option.locality},{option.city}</div>
            </div>
        </div>
        )
    }
    renderDropdownLocation=(option)=>{
        return <div>{option.name}</div>
    }
    
    render() {
        return (<div className='search-container container-fluid'>
            <div className='row'>
                <div className='col-sm-4 col-md-4 col-lg-4'></div>
                <div className='col-sm-5 col-md-5 col-lg-5'></div>
                <div className='col-sm-3 col-md-3 col-lg-3'>
                <div className='search-heading1'>Search for all Restaurants</div>
                <AsyncTypeahead
                        {...this.state.selectedRestaurant}
                        labelKey="name"
                        id="basic-example"
                        onChange={this.onRestaurantSelect}
                        minLength={1}
                        onSearch={this.props.onTypeAhead}
                        options={this.props.restaurantList}
                        placeholder="Search for all restaurants in India"
                        renderMenuItemChildren={(option, props, index) => {
                            return this.renderDropdownChildren(option);
                        }}
                    />
                    </div>
                    

            </div>
            <div className='logo row'>A!</div>
            <div className='search-heading row'>Find the best restaurants, cafe's and bars</div>
            
            
            <div className='search-controller row'>
                <div className='search-location col-sm search-location1' >
                    <Typeahead
                        {...this.state.selectedCity}
                        labelKey={(option) => `${option.name}`}
                        id="basic-example"
                        onChange={this.handleCityChange}
                        minLength={1}
                        options={this.props.cityList}
                        placeholder="Please select a City"
                        renderMenuItemChildren={(option, props, index) => {
                            return this.renderDropdownLocation(option);
                        }}
                    />
                </div>
                <div className='search-location col-sm'>
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
                       
                    />
                </div>
                <div className='search-restaurant col-sm' id='rstt'>
                    <AsyncTypeahead
                        selected={this.state.selectedRestaurant2}
                        labelKey="name"
                        onChange={this.onRestaurantSelect2}
                        id='basic-example'
                        minLength={1}
                        onSearch={this.onTypeAhead}
                        options={this.state.restaurantList}
                        placeholder="Search as per your location"
                        renderMenuItemChildren={(option, props, index) => {
                            return this.renderDropdownChildren(option);
                        }}
                    />
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(SearchBar);