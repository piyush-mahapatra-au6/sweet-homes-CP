import React, { Component } from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import { getRooms } from "../../redux/actions/homeAction";
import { connect } from "react-redux";
import "../../css/loader.css";
import "../../css/App.css";



class RoomsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		this.props.getRooms();
	}

	render() {
		let content = this.props.rooms;
		if (content) {
            // console.log(content)
			return (
				<div className="roomsContainer container-fluid pt-3" style={{}}>
					<RoomsFilter />
					<RoomsList room={content} />
				</div>
			);
		} else {
			return <div className='loader'></div>;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		rooms: state.getRooms.payload,
	};
};

export default connect(mapStateToProps, { getRooms })(RoomsContainer);

// return (
//     <div>
//         Hello from Rooms RoomsContainer
//         <RoomsFilter/>
//         <RoomsList/>
//     </div>
// )



//<RoomsFilter filter={content}/>
