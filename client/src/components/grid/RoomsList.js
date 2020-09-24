import React, { Component, useState } from "react";
import Room from "../landing/Room";
import Title from "../landing/Title";
import Pagination from "./Pagination";
const RoomsList = (props) => {
	// const [posts,setPosts] = useState([])

	const [showPerPage, setShowPerPage] = useState(12);
	const [pagination, setPagination] = useState({
		start: 0,
		end: showPerPage,
	});
	const onPaginationChange = (start, end) => {
        // console.log(start, end);
        setPagination({start:start,end:end})
	};
	return props.room.length === 0 ? (
		<Title title='No Rooms Found ' />
	) : (
		<section className='roomslist'>
            <Pagination
				showPerPage={showPerPage}
				onPaginationChange={onPaginationChange}
			/>  
			<div className='roomslist-center'>
                
				{props.room
					.slice(pagination.start, pagination.end)
					.map((item, index) => {
						return <Room key={index} room={item} />;
					})}
			</div>
			
		</section>
	);
};

export default RoomsList;
