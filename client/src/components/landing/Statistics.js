import React, { Component } from "react";
import Title from "./Title";
import  "../../css/loader.css";
import { connect } from "react-redux";
import { getStatistics } from "../../redux/actions/homeAction";
import { FaHeart } from "react-icons/fa";

class Statistics extends Component {

	componentDidMount() {
		this.props.getStatistics();
	}

	render() {
        // console.log(this.props.statistics)
		let content = this.props.statistics ? (
			<section className='statistic pt-3'>
				<Title title='Live Statistics' />
				<div className='services-center'>
					{this.props.statistics.map((item, index) => {
						return (
							<article key={index} className='service'>
								<span>{FaHeart()}</span>
								<h6>{item.title}</h6>
								<p>{item.info}</p>
							</article>
						);
					})}
				</div>
			</section>
		) : (
			<div className='loader'></div>
		);
    return <>{content}</>;
	}
}
const mapStateToProps = (state) => {
	return {
		statistics: state.getStatistics.payload,
	};
};

export default connect(mapStateToProps, { getStatistics })(Statistics);
