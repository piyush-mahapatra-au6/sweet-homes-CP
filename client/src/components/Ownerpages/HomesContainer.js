import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Homecard from "./Homecard";
import { getOwnerHomes } from "../../redux/actions/homeAction";
import Layout from "../core/Layout";
import "../../css/loader.css";
class HomesContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const owner = JSON.parse(localStorage.getItem("user"));
		this.props.getOwnerHomes(owner._id);
		// console.log(owner._id);
	}

	render() {
		// console.log(this.props.ownerHomes)
		let content = this.props.ownerHomes ? (
			this.props.ownerHomes.map((home, index) => (
				<Homecard key={index} home={home} />
			))
		) : (
			<div className='loader'> </div>
		);
		return (
			<Layout>
				<button
					onClick={() => {
						window.location.reload(false);
					}}
					className='btn btn-primary'>
					CHECK FOR UPDATES
				</button>
				<section className='roomslist'>
					<div className='roomslist-center'>{content}</div>
				</section>
			</Layout>
		);
	}
}

const mapStatetoProps = (state) => {
	// console.log(state)
	return {
		ownerHomes: state.ownerHomes.payload,
	};
};

export default connect(mapStatetoProps, { getOwnerHomes })(HomesContainer);

// this.props.ownerHomes ? (
// 	this.props.ownerHomes.map((home, index) => <Homecard key={index} home={home} />)
// ) : (
// 	<h1> you don't have any Homes,Please Create One </h1>
// );

// const HomesContainer = (props) => {

//     const owner = JSON.parse(localStorage.getItem("user"));
//     console.log(props.ownerHomes)
// 	const { ownerHomes } = props;
// 	const content = ownerHomes ? (
// 		ownerHomes.map((home, index) => <Homecard key={index} home={home} />)
// 	) : (
// 		<h1> you don't have any Homes,Please Create One </h1>
// 	);

// 	const handleclick = (e) => {
// 		e.preventDefault();
//         props.getOwnerHomes(owner._id);
//         console.log(owner._id)
// 	};

// 	return (
// 		<Fragment>
// 			<h1> Hello, Welcome to your Personal Dashboard</h1>
// 			<input type="submit" value="Get My Homes"onClick={handleclick}></input>
// 			<div className='row'>{content}</div>
// 		</Fragment>
// 	);
// };

// const mapStatetoProps = (state) => {
// 	// console.log(state)
// 	return {
// 		ownerHomes: state.ownerHomes.payload,
// 	};
// };

{
	/* <Fragment>
<h1> Hello, Welcome to your Personal Dashboard</h1>
<input type="submit" value="Get My Homes"onClick={handleclick}></input>
<div className='row'>{content}</div>
</Fragment> */
}

/**
 *         const {movies} = this.props
        let content = '';

        content =
        movies.Response === 'True'
          ? movies.Search.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))
          : null;
 */
