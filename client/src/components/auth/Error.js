import React from "react";
import error from "../../images/svg/error.svg";
import chester from "../../images/chester.png";

import Title from "../landing/Title";
import { FaHeart } from "react-icons/fa";

const Error = () => {
	const arr = [
		"https://youtu.be/vjVkXlxsO8Q",
		"https://www.youtube.com/watch?v=LYU-8IFcDPw",
		"https://www.youtube.com/watch?v=ScNNfyq3d_w",
		"https://www.youtube.com/watch?v=i8q8fFs3kTM",
		"https://www.youtube.com/watch?v=ScNNfyq3d_w",
	];
	return (
		<div className='container'>
			<Title title="PAGE doesn't Exist but Linkin Park Does (T_T)" />
			<strong>
				Try This from our Playlist
				<a href={arr[Math.floor(Math.random() * 4) + 1]}>
					{" "}
					<br></br>Linkin Park
				</a>{" "}
				<FaHeart />
				<FaHeart />
				<FaHeart />
				<FaHeart />
				<FaHeart />{" "}
			</strong>
			<img src={chester} />

			<span>Hybrid Theory turns 20 years </span>
		</div>
	);
};

export default Error;
