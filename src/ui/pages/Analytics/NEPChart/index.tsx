import React, {useEffect, useMemo, useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {useWallet} from "../../../../packages/provider";
import {RestAPI} from "../../../../packages/neo/api";
import {numberTrim} from "../../../../packages/neo/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  elements: {
    // line: {
    //   tension: 0.4,
    // },
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    y: {
      grid: {
        color: "white",
      },
	    ticks: {
		    callback: (value) => {
			    return '$' + numberTrim(value,4);
		    }
	    }
    },
    x: {
      grid: {
        color: "white",
      },
    },
  },
};
//
// const labels = ["January", "February", "March", "April", "May", "June", "July"];
//
// export const data = {
//   labels,
//   datasets: [
//     {
// 	    label: 'Liquidity',
//       // fill: true,
//       // label: undefined,
//       data: [1, 2, 3, 4, 5, 6, 7],
//       borderColor: "rgba(32, 226, 47, 1)",
//       backgroundColor: "rgba(32, 226, 47, 1)",
//     },
// 	  {
// 		  label: 'Price',
// 		  data: [11, 12, 63, 74, 55, 46, 37],
// 		  borderColor: "#b23bff",
// 		  backgroundColor: "#b23bff",
// 	  }
//   ],
// };

const NEPChart = () => {
	const { network } = useWallet();
	const [data, setData] = useState<any>();
	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		async function fetch() {
			try {
				setLoading(true);
				const res = await new RestAPI(network).getNEP("15");
				setData(res);
				setLoading(false);
			} catch (e: any) {
				setLoading(false);
				// setError(e.message);
			}
		}
		fetch();
	}, [network ]);

	const dataset = useMemo(() => {
		return {
			labels: data && data.labels ? data.labels : [],
			datasets: [
				// {
				// 	label: 'Liquidity',
				// 	// fill: true,
				// 	// label: undefined,
				// 	data: data && data.liquidity ? data.liquidity : [],
				// 	borderColor: "rgba(32, 226, 47, 1)",
				// 	backgroundColor: "rgba(32, 226, 47, 1)",
				// },
				{
					label: 'Price',
					data: data && data.prices ? data.prices : [],
					borderColor: "#b23bff",
					backgroundColor: "#b23bff",
				}
			],
		};
	}, [data]);
  return (
    <div>
      <Line options={options} data={dataset} />
    </div>
  );
};

export default NEPChart;
