import React from "react";
import "../../css/founder.css";
import piyush from "../../images/piyush.jpeg";
import yash from "../../images/yash.jpeg";
import illuminati from "../../images/illuminati.jpeg";
import Title from "./Title";

const Founder = () => {
	return (<>
	<div class='wrapper'>
			<Title title='Our Team'/>
			<div class='team'>
				<div class='team_member'>
					<div class='team_img'>
						<img src={piyush} style={{borderRadius:"50%"}} alt='Team_image' />
					</div>
					<h3>Piyush</h3>
					<p class='role'>Chai and Biscuit</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
				<div class='team_member'>
					<div class='team_img'>
						<img src={illuminati} style={{borderRadius:"50%"}} alt='Team_image' />
					</div>
					<h3>Binod</h3>
					<p class='role'>Illuminati</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
				<div class='team_member'>
					<div class='team_img'>
						<img src={yash} style={{borderRadius:"50%"}} alt='Team_image'/>
					</div>
					<h3>Yash Sinha</h3>
					<p class='role'>Daru and Sutta</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
			</div>
		</div>
		</>
		
	);
};

export default Founder;
