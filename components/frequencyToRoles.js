import React from 'react'
import { 
	VictoryChart, 
	VictoryGroup, 
	VictoryLine,
	VictoryLegend,
} from 'victory';

const FrequencyToRoles = ({ uniqueRoles, recordings, usersToRoles }) => {
	// TODO: Add labels to x and y axis

	/* BUILD RESULT'S VICTORY-ORIENTED SKELETON OFF OF KNOWN DATA */
	var frequencyToRolesObj = {}; // x = week, y = number of recordings for that week
	for (let i = 0; i < uniqueRoles.length; i++) {
		frequencyToRolesObj[uniqueRoles[i]] = [];
	}

	/* VARIABLES TO HELP ME ITERATE THROUGH RECORDINGS */
	let schoolWeek = {}; // key: value => Mon: Jun 28 1993
	let i = 0;
	let week = 0;

	/* MAP FREQUENCY OF RECORDINGS PER WEEK TO ROLES */
	while (i < recordings.length) {
		// Convert ISO to day
		let dateObj = new Date(recordings[i].startDateTime);
		let day = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(dateObj);
		let userId = recordings[i].userId;

		// Separate the recordings by school week
		if (!schoolWeek[day]) schoolWeek[day] = dateObj.toDateString();
		if (schoolWeek[day] && (schoolWeek[day] !== dateObj.toDateString())) {
			week += 1;
			schoolWeek = {};
		}

		// Frequency of recordings of specified role
		// Ex: teachers: [ {x: 0, y: 3}, {x: 1, y: 1}, ... ]
		let arrOfFrequencies = frequencyToRolesObj[usersToRoles[userId]];

		// If role exists...
		if (usersToRoles[userId]) {
			// Create the week if needed, and update the count
			if (!arrOfFrequencies[week]) arrOfFrequencies.push({ x: week, y: 1});
			else arrOfFrequencies[week].y += 1;
		}
		i += 1;
	}

	let legendData = uniqueRoles.reduce((roleLabels, role) => {
		roleLabels.push({ name: role });
		return roleLabels;
	}, []);

	return (
		<VictoryChart>
		<VictoryLegend 
		orientation="horizontal"
		colorScale="warm"
		itemsPerRow={2}
		x={70} y={-25}
		style={{ border: { stroke: "black" } }}
		data={legendData}
		/>
		<VictoryGroup 
		>
		{
			uniqueRoles.map((role, i) =>
				<VictoryLine
				colorScale="warm"
				key={i}
				data={frequencyToRolesObj[role]}
				/>
			)
		}
		</VictoryGroup>
		</VictoryChart>
	)
}

export default FrequencyToRoles
