import React, { Component } from 'react';
import './Header.css';
import {withRouter } from 'react-router-dom';

class Header extends Component {
    gohomehandler=()=>{
        this.props.history.push('/home');
    }
    render() {
        return (
            <div style={{padding:'0px'}} className='container-fluid'>
            <div className='row upbar'>
                <div className='col-sm-1 col-md-2 col-lg-2 col-xs-1'></div>
                <div className='col-sm-2 col-md-2 col-lg-2 col-xs-2'>
                <div onClick={this.gohomehandler} className='e-ellipse'>
                <div className='e'>A!</div>
                </div>
                </div>
                
                 <div className='col-sm-3 col-md-3 col-lg-3 col-xs-2'></div>
                <div className='col-sm-1 col-md-1 col-lg-1 col-xs-2'>
                <div className='Login'>Login</div>
                </div>
                 <div className='col-sm-2 col-md-2 col-lg-2 col-xs-3'>
                 <div className='create-box'>
                    <div className='Create-an-account'>Create an account</div>
                </div>
                 </div>
                
            </div>
                 </div>
                
            
        )
    }
}

export default withRouter(Header);