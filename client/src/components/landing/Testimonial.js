import React from "react";
import Title from "./Title";
import "../../css/testimonial.css";
import p1 from "../../images/person_2.jpg";
import p2 from "../../images/person_3.jpg";
import p3 from "../../images/person_4.jpg";

const Testimonial = () => {
	return (
		<>
			
			<div class='wrapper1'>
			<Title title='Testimonials' />
				<div class='inner'>
					<div class='row'>
						<div class='col'>
							<div>
								<span className='img-container'>
									<img className='img-snap' src={p1} alt='' />
								</span>
							</div>
							<div class='testimonial'>
								<div class='name'>Salim Johnson</div>
								<div class='stars'>
									<i class='fas fa-star'></i>
									<i class='fas fa-star'></i>
									<i class='fas fa-star'></i>
									<i class='fas fa-star'></i>
									<i class='fas fa-star'></i>
								</div>

								<p>
									Sab banne banane ka khel hai,bass kisse banna hai ye dekhlo?sweethome sahi hai
								</p>
							</div>
						</div>

						<div class='col'>
							<div>
								<span className='img-container'>
									<img className='img-snap' src={p2} alt='' />
								</span>
							</div>
							<div class='testimonial'>
								<div class='name'> Rehman Shrivastav</div>
								<div class='stars'>
									<i class='fas fa-star'></i>
									<i class='fas fa-star'></i>
									<i class='fas fa-star'></i>
									<i class='far fa-star'></i>
									<i class='far fa-star'></i>
								</div>

								<p>
									Corona to theek hai,Mehangayi se kaise bachoge, janaab?sweethomes se ghar lena
								</p>
							</div>
						</div>

						<div class='col'>
							<div>
								<span className='img-container'>
									<img className='img-snap' src={p3} alt='' />
								</span>
							</div>
							<div class='testimonial'>
								<div class='name'>Suraj Khilji </div>
								<div class='stars'>
									<i class='fas fa-star'></i>
									<i class='fas fa-star'></i>
									<i class='fas fa-star'></i>
									<i class='fas fa-star'></i>
									<i class='far fa-star'></i>
								</div>

								<p>
									Siachen mai Jawan lad rahe hai,aur ham yaha ghar ke liye,sweethome valon ne bohat help kia yaar
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Testimonial;
