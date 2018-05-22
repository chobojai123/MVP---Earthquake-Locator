import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Maps extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google || prevProps.earthquakes !== this.props.earthquakes) {
      this.renderMap();
    }
  }
  renderMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = Object.assign({}, {
        // default to look at china by default
        center: {lat: 39.913818, lng: 116.363625},
        zoom: 4,
        gestureHandling: "cooperative",
        mapTypeId: 'terrain'
      })
      this.map = new maps.Map(node, mapConfig);
      var heatmap = [];

      this.props.earthquakes.map((earthquake) => {
        let mag
        if (earthquake.properties.mag < 5) { mag = 3 } else if (earthquake.properties.mag > 6) { mag = 10 } else { mag = 5 }
        heatmap.push({
          location: new google.maps.LatLng(earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]),
          weight: mag
        })

        const marker = new google.maps.Marker({
          position: { lat: earthquake.geometry.coordinates[1], lng: earthquake.geometry.coordinates[0] },
          map: this.map,
          title: earthquake.properties.title,
          icon: {
            url: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-32.png"
          }
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<h5>${earthquake.properties.title}</h5>
          <h5>${(new Date(earthquake.properties.time)).toDateString()}`
        });
        marker.addListener('click', function () {
          infowindow.open(this.map, marker);
        });
      })

      // sets up heat map visualization for App.jsx
      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmap,
        radius: 40
      });
      heatmap.setMap(this.map);
    }
  }

  render() {
    const style = {
      width: '80vw',
      height: '60vh'
    }
    return (
      <div className='map' ref="map" style={style}>
        Detecting earthquakes!!
      </div>
    )
  }
}

export default Maps;
