import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Map from './Map'
import { fetchQuakes } from '../_services/earthquakes'
import { searchQuakes } from '../_services/earthquakes'
import { GoogleApiWrapper } from 'google-maps-react';
import { ServicePage } from '../ServicePage'

class GoogleMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quakes: {
                addressOne: {},
                addressTwo: {}
            }
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onFilter = this.onFilter.bind(this);
    }

    componentDidMount() {
        this.setState({ quakes: {
            addressOne: {},
            addressTwo: {}
        } }, )
    }

    onFilter(event){
        const {quakes} = this.state;
        let type = '';
        searchQuakes(event)
            .then((res) => {
                type = res.type;
                return res.json()
            }).then(response => {
                if(response.status === 'OK') {
                    quakes[type] = response['results'][0];
                    this.setState({quakes: quakes});
                }
        });
    }


    render() {
        return (
            <div className="EarthquakesContainer">
                <div className="wrapper">
                    <ServicePage onFilter={this.onFilter}/>
                    <Route path="/" render={(props) => <Map google={this.props.google} quakes={this.state.quakes} {...props}/>}/>
                </div>
                <br/>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyChZPizXo_3sk70Cm4yveOd0YfQtuxc7As',
    libraries: ['visualization']
})(GoogleMap)
