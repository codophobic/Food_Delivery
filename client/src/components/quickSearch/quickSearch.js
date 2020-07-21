import React, { Component } from 'react'
import img from '../../images/breakfast.png';
import {withRouter} from 'react-router-dom';
import './quickSearch.css';
class quickSearch extends Component {


  quicksearchClick=(id)=>{
     let meal = id;
     let city= window.sessionStorage.getItem('city');
     let area= window.sessionStorage.getItem('area');
     let page=1;
     let sort=1;
     if(city&&area)
     this.props.history.push(`/restaurantSearchPage?location_id=${area}&city_id=${city}&cuisine_type=null&meal_type=${meal}&cost=null&page=${page}&sort=${sort}`);
     else if(city)
     this.props.history.push(`/restaurantSearchPage?location_id=null&city_id=${city}&cuisine_type=null&meal_type=${meal}&cost=null&page=${page}&sort=${sort}`);
     else
     this.props.history.push(`/restaurantSearchPage?location_id=null&city_id=null&cuisine_type=null&meal_type=${meal}&cost=null&page=${page}&sort=${sort}`);
  }
    render() {
        const qsArray = this.props.quickSearchList;

        
const renderedTiles = qsArray.map(el=>{
                return(
      <div id={el.meal_type} 
      className="col-sm-12 col-xs-12 col-md-4 col-lg-4" key={el.meal_type} onClick={()=>this.quicksearchClick(el.meal_type)} >
       
            <div className="qs-block row" style={{marginTop: '33px'}}>
              <div className="col-sm-6 col-xs-6 col-md-6 col-lg-6">
                <img className="img" alt='jfnf' src={`/assets/images/${el.thumbs}.png`}/> 
              </div>
              <div className="col-sm-6 col-xs-6 col-md-6 col-lg-6">
                <div className="qs-heading">{el.name}</div>
                <div className="qs-subheading">{el.content}</div>
              </div>
          
        </div>
      </div>
                )
            })
        
        return (
            <div style={{marginBottom:'20px'}}>
                <div className='Quick-Searches'>Quick Searches</div>
                <div className='quick-subheader'>Discover restaurants by type of meal</div>
                <div className='row qsmleft' >
                  {renderedTiles}
                </div>
                
            </div>
        )
    }
}

export default withRouter(quickSearch);
