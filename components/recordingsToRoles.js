import React from 'react'
import { 
	VictoryChart, 
	VictoryTheme, 
	VictoryBar,
} from 'victory';
const recordings = require('../data/recordings.json')
const users = require('../data/users.json')

const RecordingsToRoles = () => {

	const arrOfUsers = users.map((user, i) => user.userId);

	let uniqueRoles = [];
	let arrOfRoleObjs = [];

	// Create an array of objects with key/value pairs 
	// for role & the # of recordings made by that role.
	for (let i = 0; i < recordings.length; i++) {
		// Map recording's userId to users
		if (arrOfUsers.includes(recordings[i].userId)) {
			let userIdx = arrOfUsers.indexOf(recordings[i].userId);
			// Check if role was properly entered
			if (users[userIdx].role) {
				let roleIdx;
				// Ensure role is not repeated
				if (uniqueRoles.includes(users[userIdx].role)) {
					// Grab index of existing role
					roleIdx = uniqueRoles.indexOf(users[userIdx].role);
					// Increment the recordings count
					arrOfRoleObjs[roleIdx].recordings = arrOfRoleObjs[roleIdx].recordings + 1;
				} else {
					let newLength = uniqueRoles.push(users[userIdx].role);
					roleIdx = newLength - 1;
					arrOfRoleObjs.push({ role: users[userIdx].role, recordings: 1 });
				}
			}
		}
	}

	// TODO: Add an event that allows user to click on each bar to see the exact value.
	return (
		<VictoryChart
		theme={VictoryTheme.grayscale}
		domainPadding={15}
		>
		<VictoryBar
		data={arrOfRoleObjs}
		x="role"
		y="recordings"
		/>
		</VictoryChart>
	)
}

export default RecordingsToRoles
