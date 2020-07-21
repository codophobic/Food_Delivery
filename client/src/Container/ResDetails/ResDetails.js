import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './ResDetails.css';
import Axios from 'axios';
import Header from '../../ui/Header';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

class Details extends Component {

    constructor(){
        super();
        this.state={
            resDetails:{

            },
            images:[]
        };
    }
    componentDidMount(){
        
         const id= this.props.match.params.id;
         console.log(id);
    
         const images=[];
         Axios.get(`/api/getRestaurant/${id}`).then(res=>{
             this.setState({
                 ...this.state,
                 resDetails:res.data.restaurant[0]
             });
             res.data.restaurant[0].thumb.map(el=>{
                 images.push(
                        {
                          original: `/assets/images/${el}.png`,
                          thumbnail: `/assets/images/${el}.png`,
                        })
             });
             this.setState({
                 ...this.state,
                 images:images
             });
             console.log(res.data);
         }).catch(err=>console.log(err));

          
      
    }
    render() {
        const {resDetails} = this.state;
        console.log(resDetails)
        if(resDetails)
        {
        return (
            <div>
                <Header/>
            
            <div style={{padding:'0px'}} className='container-fluid'>
            <div className='row'>
            <div  className='imgclass'>
            <ImageGallery items={this.state.images}/>
            </div>
            </div>
            <div className='row'>
           <div className='col-xs-1 col-sm-1 col-md-1 col-lg-1'>

           </div>
            <div className='col-xs-11 col-sm-11 col-md-11 col-lg-11'>
        
            <div className='res-name'>
                {resDetails.name}
            </div>
            <Tabs >
                <TabList>
                    <Tab><span className='Overview'>Overview</span></Tab>
                    <Tab><span className='Contact'>Contact</span></Tab>
                </TabList>
                <TabPanel>
                    <div>
                    <div className='About-this-place'>About This Place</div>
                    <br/>
                    <div className='Cuisine'>Cuisine</div>
                    {resDetails.cuisine&&resDetails.cuisine.map(el=>{
                      return <span className='res-details'>{el.name},</span>
                    })}
                    
                    <br/>
                    <br/>
                    <div className='Average-Cost'>Average Cost</div>
                    <div className='-for-two-people-approx'>{resDetails.min_price}</div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div>
                        <div className='Phone-Number'>Phone Number</div>
                        <div className='pndigit'>{resDetails.contact_number}</div>
                        <br/>
                        <div className='resheader'>{resDetails.name}</div>
                        <div className='address'>{resDetails.locality},{resDetails.city}</div>
                    </div>

                </TabPanel>
            </Tabs>
           </div>
  
        </div>
          <br/>
         </div>
         </div>
        )
                }
                else{
                    return(
                        <div>Res not Found</div>
                    )
                }
    }
}

export default Details;