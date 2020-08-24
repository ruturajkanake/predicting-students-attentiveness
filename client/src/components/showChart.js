import './css/showChart.css';
var React = require('react');
const { Line } = require('react-chartjs-2');
var Component = React.Component;

let options = {
    responsive: true,
    maintainAspectRatio: false,
	animation: {
		duration: 500
    },
    legend: {
        position: 'top',
    },
    scales: {
        xAxes: [{
            display: true,
            gridLines: {
                display: false,
                color: "black"
            },
            offset: true,
            scaleLabel: {
                display: true,
                labelString: 'Time in seconds',
                fontColor: "red"
            }
        }],
        yAxes: [{
            gridLines: {
                color: "black",
                borderDash: [2, 5],
            },
            display: true,
            ticks: {
                beginAtZero: true,
                max: 5
            },
            scaleLabel: {
                display: true,
                labelString: 'Variation in Gaze',
                fontColor: "green"
            }
        }]
    }
}

class ViewChart extends Component {
	constructor(props) {
		super(props);
		this.chartReference = null;
		this.state =  {
            x : props.x,
            y : props.y,
			data : {
				labels: props.x,
				datasets: [{
					label: 'Variation',
					data: props.y,
					borderColor: 'purple',
                    backgroundColor: 'transparent',
                    pointBorderColor: 'purple',
                    pointBackgroundColor: 'rgba(153, 76, 212,0.5)',
                    pointRadius: 4,
                    pointHoverRadius: 7,
                    pointHitRadius: 30,
                    pointBorderWidth: 1,
                    pointStyle: 'circle'
				}]
			}
		};
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.x !== this.state.x){
            let datas = this.state.data;
            datas.labels = nextProps.x;
            datas.datasets[0].data = nextProps.y;
            this.setState({
                data : datas
            });

        }
    }

	render() {
        let live = this.props.live;
        let chartClass = "chart-live";
        chartClass = live === true ? "chart-live" : "chart-static";
		return (
            // {live ? chartClass}
			<div className={chartClass}>
				<Line 
					ref={(reference) => this.chartReference = reference }
					data = {this.state.data}
					options = {options}
					redraw
				/>
			</div>
		);
	}
	
}
export default ViewChart;
