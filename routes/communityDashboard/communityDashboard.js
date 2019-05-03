import React from 'react'
import './communityDashboard.css'
import RecordingsToRoles from '../../components/recordingsToRoles'
import FrequencyToRoles from '../../components/frequencyToRoles'
import SharesByTeachers from '../../components/SharesByTeachers'

const recordings = require('../../data/recordings.json')
const users = require('../../data/users.json')

const CommunityDashboard = () => {

	/* SORT RECORDINGS BY DATES: EARLIEST - LATEST */
	recordings.sort((a, b) => (a.startDateTime < b.startDateTime) ? -1 : ((a.startDateTime > b.startDateTime) ? 1 : 0));

	/* MATCH USERS TO ROLES */
	const usersToRoles = users.reduce((acc, user) => {
		acc[user.userId] = user.role;
		return acc;
	}, {});
	const arrOfUserIds = Object.keys(usersToRoles);

	let uniqueRoles = [];
	let recordingsToRolesArray = [];
	let recordingsByTeachers = [];

	/* MAP TOTAL # OF RECORDINGS TO EACH ROLE */
	for (let i = 0; i < recordings.length; i++) {
		let userId = recordings[i].userId;

		// Make sure user has made a recording
		if (arrOfUserIds.includes(userId)) {
			let userIdx = arrOfUserIds.indexOf(userId);

			// Check if role was properly entered
			if (usersToRoles[userId]) {
				let roleIdx;

				// Keep track of recordings made by teachers
				if (usersToRoles[userId] === 'Teacher')
					recordingsByTeachers.push(recordings[i]);

				// Check if role has been seen before
				if (uniqueRoles.includes(usersToRoles[userId])) {

					// If so, grab index of existing role
					roleIdx = uniqueRoles.indexOf(usersToRoles[userId]);

					// Use that index to increment the existing recording's count
					recordingsToRolesArray[roleIdx].recordings = recordingsToRolesArray[roleIdx].recordings + 1;
				} else {
					let newLength = uniqueRoles.push(usersToRoles[userId]);
					roleIdx = newLength - 1;
					recordingsToRolesArray.push({ role: usersToRoles[userId], recordings: 1 });
				}
			}
		}
	}

	return (
		<div className="col-container">
		<div className="title">
		Community Dashboard
		</div>

		<div className="gray-light">
		<div className="subtitle">
		👥 CONTRIBUTORS
		</div>

		<div className="row-container">
		<div className="col-container">
		<div className="graph-title"># of Recordings/Role</div>
		<RecordingsToRoles recordingsToRolesArray={recordingsToRolesArray} />
		</div>
		<div className="col-container">
		<div className="graph-title">Weekly Frequency of Recordings/Role</div>
		<FrequencyToRoles uniqueRoles={uniqueRoles} recordings={recordings} usersToRoles={usersToRoles} />
		</div>
		</div>

		<div className="row-container">
		(TEACHFX INSIGHT)
		</div>
		</div>

		<div className="subtitle">
		🤝 SHARES
		</div>

		<div className="row-container">
		<SharesByTeachers recordings={recordings} recordingsByTeachers={recordingsByTeachers} />
		</div>

		<div className="row-container">
		(TEACHFX INSIGHT)
		</div>

		<div className="gray-light">
		<div className="subtitle">
		🗣 TEACHER VS. STUDENT
		</div>

		<div className="row-container">
		(LINE CHART)
		</div>

		<div className="row-container">
		(TEACHFX INSIGHT)
		</div>
		</div>

		</div>
	)
}

export default CommunityDashboard
