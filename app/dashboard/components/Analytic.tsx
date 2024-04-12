"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function Analytic({
	data,
}: {
	data: {
		[key: string]: number;
	};
}) {
	return (
		<>
			<div className="w-full h-64">
				<Bar
					options={{
						maintainAspectRatio: false,
						responsive: true,

						scales: {
							x: {
								border: { display: false },
								grid: {
									display: false,
									drawTicks: false,
								},
								beginAtZero: true,
								ticks: {
									maxTicksLimit: 6,
									minRotation: 360,
								},
							},
							y: {
								border: { display: false, dash: [5] },
								grid: {
									display: true,
									color: (context) => {
										if (
											context.tick.value === 50 ||
											context.tick.value === 110
										) {
											return "rgb(0,0,0)";
										}
									},
									drawTicks: false,
								},
								ticks: {
									stepSize: 50,
									color: (ctx, options) => {
										if (ctx.tick.value === 50) {
											return "rgb(0,0,0)";
										} else {
											return "rgb(107,114,128)";
										}
									},
								},
								position: "right",
								beginAtZero: true,
							},
						},
						plugins: {
							legend: {
								display: false,
							},
						},
					}}
					data={{
						labels: Object.keys(data).map((dateString) => {
							const date = new Date(dateString);
							const formattedDate = date.toLocaleDateString(
								"en-US",
								{ month: "short", day: "2-digit" }
							);
							return formattedDate;
						}),
						datasets: [
							{
								data: Object.keys(data).map((key) => data[key]),
								borderWidth: 1,
								borderRadius: 9,
								backgroundColor: (ctx, options) => {
									if (ctx.raw === 0) {
										return "rgb(191,219,254)";
									} else {
										return "#22c55e";
									}
								},
								minBarLength: 5,
							},
						],
					}}
				/>
			</div>
		</>
	);
}
