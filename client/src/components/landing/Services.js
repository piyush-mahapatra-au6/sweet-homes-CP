import React, { Component } from "react";
import Title from "./Title";

import { FaChargingStation, FaTaxi, FaGrin, FaRocket } from "react-icons/fa";
export default class Services extends Component {
	state = {
		services: [
			{
				icon: <FaChargingStation />,
				title: "24/7 Electricty with all Safety Standards ",
				info:
					"ipsum dolor sit amet consectetur adipisicing elit",
			},
			{
				icon: <FaTaxi />,
				title: "All Homes are within city Limits ",
				info:
					"ipsum dolor sit amet consectetur adipisicing elit",
			},
			{
				icon: <FaGrin />,
				title: "Friendly Neighbourhood ",
				info:
					"ipsum dolor sit amet consectetur adipisicing elit",
			},
			{
				icon: <FaRocket />,
				title: " Easy Moving in and Out",
				info:
					"ipsum dolor sit amet consectetur adipisicing elit",
			},
		],
	};
	render() {
		return (
			<section className='services p-4'>
				<Title title='Services' />
				<div className='services-center'>
					{this.state.services.map((item, index) => {
						return (
							<article key={index} className='service'>
								<span>{item.icon}</span>
								<h6>{item.title}</h6>
								<p>{item.info}</p>
							</article>
						);
					})}
				</div>
			</section>
		);
	}
}
