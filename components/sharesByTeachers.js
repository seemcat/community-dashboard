import React from 'react'
import { 
	VictoryChart, 
	VictoryBar, 
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
		domainPadding={25}
		>
		<VictoryBar
		categories={{
			x: anonymizedUsers
		}}
		data={sharers}
		/>
		</VictoryChart>
	)
}

export default SharesByTeachers 
