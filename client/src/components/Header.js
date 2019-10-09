import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {

    renderContent(){
        switch (this.props.auth) {
          case null:
              return;
          case false:
              return (
                  <li><a href="/auth/google">Login to Google</a></li>
              );
          default:
          return (
              <li><a href="/api/logout">Logout</a></li>
          );
        }
    };

    render(){
        console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#logo" className="left brand-logo">Home</a>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}


function mapStateToProps(state){
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
