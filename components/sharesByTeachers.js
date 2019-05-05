import React from 'react'
import { 
	VictoryChart, 
	VictoryBar, 
	VictoryLabel, 
	VictoryAxis,
} from 'victory';

const SharesByTeachers = ({ recordings, recordingsByTeachers  }) => {

	let uniqueSharers = {};
	for (let i = 0; i < recordingsByTeachers.length; i++) {
		if (recordingsByTeachers[i].sharedWith.length >= 1) {
			uniqueSharers[recordingsByTeachers[i].userId] = 
				uniqueSharers[recordingsByTeachers[i].userId] + 1 || 1;
		}
	}

	// Anonymize uniqueSharers
	const sharers = Object.entries(uniqueSharers).map(([sharer, numOfShares], i) => {
		const x = i + 1;
		const sharerObj = { x, y: numOfShares };
		return sharerObj;
	});

	// Create Victory categories
	let anonymizedUsers = [];
	for (let i = 1; i <= Object.keys(uniqueSharers).length; i++) {
		const label = `teacher${i}`;
		anonymizedUsers.push(label);
	}

	return (	
		<VictoryChart
		width={500}
		height={400}
		style={{
			parent: {
				width: "50%",
				height: "50%",
			}
		}}
		domainPadding={25}
		>
		<VictoryAxis
		label="Anonymized User"
		style={{axisLabel: {fontSize: 10, padding: 40} }}
		/>
		<VictoryAxis
		dependentAxis
		label="Share Count"
		style={{axisLabel: {fontSize: 10, padding: 35 } }} 
		/>
		<VictoryBar
		categories={{
			x: anonymizedUsers
		}}
		data={sharers}
		labels={(d) => d.y}
		style={{ labels: { fill: "white" } }}
		labelComponent={<VictoryLabel dy={30}/>}
		/>
		</VictoryChart>
	)
}

export default SharesByTeachers 
