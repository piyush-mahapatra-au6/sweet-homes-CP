import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight,FaArrowAltCircleLeft } from "react-icons/fa";

const Pagination = ({ showPerPage,onPaginationChange }) => {
	const [counter, setCounter] = useState(1);
	useEffect(() => {
		console.log("counter chnaged");
		const value = showPerPage * counter;
	

        onPaginationChange(value - showPerPage,value)
        
    }, [counter]);
    
const onButtonClick =(type)=>{
    if(type==='prev') {
        if(counter ===1){
            setCounter(1)
        }else{
            setCounter(counter-1)
        }
    } else if( type==='next'){
        setCounter(counter +1)
    }
}


	return (
		<div className='d-flex justify-content-between'>
			<button className="btn btn-primary" onClick={() => onButtonClick('prev')}>
				<FaArrowAltCircleLeft/>Previous
			</button>
			<button className="btn btn-primary" onClick={() => onButtonClick('next')}>
				<FaArrowAltCircleRight/>Next
			</button>
		</div>
	);
};

export default Pagination;
