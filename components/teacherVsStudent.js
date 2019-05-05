import React from 'react'
import { 
	VictoryChart, 
	VictoryGroup, 
	VictoryLine,
	VictoryLegend,
	VictoryAxis,
} from 'victory';

const TeacherVsStudent = ({ recordings }) => {
	let teacherTalkArr = [];
	let studentTalkArr = [];

	for (let i = 0; i < recordings.length; i++) {
		const date = new Date(recordings[i].startDateTime);
		const teacherTalk = recordings[i].teacherTalk;
		const studentTalk = recordings[i].studentTalk;

		teacherTalkArr.push({ x: date, y: teacherTalk });
		studentTalkArr.push({ x: date, y: studentTalk });
	}

	return (
		<div className="legend-container">
		<div className="item-svg">
		<svg viewBox="-12 0 200 200">
		<VictoryLegend 
		standalone={false}
		orientation="horizontal"
		colorScale={["tomato", "gold"]}
		itemsPerRow={2}
		data={[{name: "Teachers"}, {name: "Students"}]}
		style={{ border: { stroke: "black" } }}
		/>
		</svg>
		</div>
		<div className="graph-title"># of Student & Teacher Talk/Recording</div>
		<VictoryChart
		width={800}
		scale={{ x: 'time' }}
		>
		<VictoryAxis
		tickFormat={(x) => {
			const dateObj = new Date(x);
			const year = dateObj.getFullYear().toString().substr(-2);
			const month = dateObj.toLocaleString('en-us', { month: 'short' });
			return `${month}/${year}`;
		}}
		label="Recording Date"
		style={{axisLabel: {fontSize: 10, padding: 40} }}
		/>
		<VictoryAxis
		dependentAxis
		label="Talk Count"
		style={{axisLabel: {fontSize: 10, padding: 40 } }} 
		/>
		<VictoryGroup 
		colorScale={["tomato", "gold"]}
		>
		<VictoryLine
		data={teacherTalkArr}
		/>
		<VictoryLine
		data={studentTalkArr}
		/>
		</VictoryGroup>
		</VictoryChart>
		</div>
	)
};

export default TeacherVsStudent

