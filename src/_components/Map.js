import React, { Component } from 'react';
import ReactDOM from 'react-dom'


export default class Map extends Component {
    componentDidUpdate() {
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const mapConfig = Object.assign({}, {
                center: {lat: 7, lng: -70},
                zoom: 5,
                gestureHandling: "cooperative",
                mapTypeId: 'terrain'
            });

            this.map = new maps.Map(node, mapConfig);
            let heatmapData = [];

            for (let key in this.props.quakes) {
                if(this.props.quakes[key].hasOwnProperty('geometry')) {
                    console.log(this.props.quakes[key]);
                    heatmapData.push({
                        location: new google.maps.LatLng(this.props.quakes[key].geometry.location.lat,
                            this.props.quakes[key].geometry.location.lng),
                        weight: 5
                    });

                    const marker = new google.maps.Marker({
                        position: {
                            lat: this.props.quakes[key].geometry.location.lat,
                            lng: this.props.quakes[key].geometry.location.lng
                        },
                        map: this.map,
                        title: '',
                        icon: {
                            url: "https://cdn3.iconfinder.com/data/icons/earthquake/500/earthquake-24-32.png"
                        }
                    });

                    const infowindow = new google.maps.InfoWindow({
                        content: `<h6>${this.props.quakes[key].formatted_address}</h6>`
                    });

                    marker.addListener('click', function() {
                        infowindow.open(this.map, marker);
                    })
                }
            }

            const heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
                radius: 20
            });
            heatmap.setMap(this.map);
        }
    }

    render() {
        const style = {
            width: '60vw',
            height: '60vh'
        };

        return (
            <div ref="map" style={style}>
                loading map...
            </div>
        )
    }
}