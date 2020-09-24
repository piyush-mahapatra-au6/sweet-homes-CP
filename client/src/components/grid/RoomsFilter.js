import React, { Component } from "react";
import FilterCity from "./FilterCity";
import FilterPrice from "./FilterPrice";
import FilterCapacity from "./FilterCapacity";
import FilterSearch from "./FilterSearch";
import FilterNeed from "./FilterNeed";
import FilterZipcodeAndRadius from "./FilterZipcodeAndRadius";
import '../../css/roomsFilter.css'



import '../../css/roomsFilter.css'
export default class RoomsFilter extends Component {
	render() {
		return (
			<div className="filterparent">
				<div className='filterbox'>
					<FilterCity />
				</div >
				<div className='filterbox'>
					<FilterPrice />
				</div >
				<div className='filterbox'>
					<FilterCapacity />
				</div>
				<div className='filterbox'>
					<FilterSearch />
				</div>
				<div className='filterbox'>
					<FilterNeed/>
				</div>
				
				<div className='filterbox'>
					<FilterZipcodeAndRadius />
				</div>
			</div>
		);
	}
}
