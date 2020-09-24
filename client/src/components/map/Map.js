import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";

import React, { Component } from "react";
import { connect } from "react-redux";

class MapContainer extends Component {
	render() {
		console.log(this.props.roomInfo, "render mappppp");

		const MapWithAMarker = withScriptjs(
			withGoogleMap((props) => (
				<GoogleMap
					defaultZoom={12}
					defaultCenter={{
						lat: this.props.roomInfo.location.coordinates[1],
						lng: this.props.roomInfo.location.coordinates[0],
					}}>
					<Marker
						position={{
							lat: this.props.roomInfo.location.coordinates[1],
							lng: this.props.roomInfo.location.coordinates[0],
						}}
					/>
				</GoogleMap>
			))
		);
		return (
			<MapWithAMarker
				googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCyQSGjh2kXcAbgwLOrLdc3L39ueQ2jnTk&v=3.exp&libraries=geometry,drawing,places'
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `35rem`,width:'50rem' }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		roomInfo: state.getRoomDetails,
	};
};

export default connect(mapStateToProps)(MapContainer);

// apiKey: ("AIzaSyCyQSGjh2kXcAbgwLOrLdc3L39ueQ2jnTk")

// 20.5937° N, 20.5937° E
