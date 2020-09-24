import React, { Component } from "react";
import { Bar, Line, Pie ,Doughnut,Radar,Bubble,Polar} from "react-chartjs-2";
// import Title from "../landing/Title";
import { connect } from "react-redux";
import "../../css/loader.css";
import "../../css/chart.css";

class Chart extends Component {
	constructor(prop) {
		super(prop);
	}

	render() {
	
	

		if(this.props.data){
            //destructure the data and then render 
            const {
                allHomes,
                // allHomesAverage,
                capacityHomes,
                highHomes,
                lowHomes,
                mediumHomes,
                ownerHomes,
                occupiedHomes,
                wifiMessHomes,
            } = this.props.data;
            return (<div >
           
            <div className="chart-owner">
            <Bar   
                data={{
                    labels: [
                        "Count of All Homes",
                        // "Average Price of Homes",
                        "ownerHomes(Count of Homes Owned)",
                        "2-6 Capacity Homes",
                        "highHomes(> 6000)",
                        "lowHomes(<2000)",
                        "mediumHomes(4000 to 6000)",
                        "Occupied Homes",
                        "wifiMessHomes",
                    ],
                    datasets: [
                        {
                            label: "OWNER HOMES ANALYSIS",
                            data: [
                                allHomes,
                                // allHomesAverage,
                                ownerHomes,
                                capacityHomes,
                                highHomes,
                                lowHomes,
                                mediumHomes,
                                occupiedHomes,
                                wifiMessHomes,
                            ],
                            backgroundColor: [
                                "rgba(255, 99, 132, 1)",
                                // "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                                "rgba(255, 159, 64, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(75, 192, 192, 1)",




                            ],
                        },
                    ],
                }}
                options={{
                   maintainAspectRatio:false,
                    title: {
                        display: true,
                        text: "DATA ANALYSIS OF YOUR HOMES",
                        fontSize: 25,
                    },
                    legend: {
                        display: true,
                        position: "bottom",
                    },
                }}
            />
            </div>
            
        </div>)
        }else{
            return <div className="loader"></div>
        }
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.getHomesByChart.payload,
	};
};

export default connect(mapStateToProps, null)(Chart);
