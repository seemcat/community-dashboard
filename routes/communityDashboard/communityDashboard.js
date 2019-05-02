import React from 'react'
import './communityDashboard.css'
import TotalRecordings from '../../components/totalRecordings'
import RecordingsToRoles from '../../components/recordingsToRoles'
import FrequencyToRoles from '../../components/frequencyToRoles'

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

	/* MAP TOTAL # OF RECORDINGS TO EACH ROLE */
	for (let i = 0; i < recordings.length; i++) {
		let userId = recordings[i].userId;

		// Make sure user has made a recording
		if (arrOfUserIds.includes(userId)) {
			let userIdx = arrOfUserIds.indexOf(userId);

			// Check if role was properly entered
			if (usersToRoles[userId]) {
				let roleIdx;

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

	console.log('recordingsToRolesArray: ', recordingsToRolesArray);

	return (
		<div className="col-container">
		<div className="title">
		Community Dashboard
		</div>

		<div className="row-container">
		<div className="item">
		<TotalRecordings />
		</div>
		<div className="item">
		RECORDINGS SO FAR!
		</div>
		</div>

		<div className="gray-light">
		<div className="subtitle">
		👥 CONTRIBUTORS
		</div>

		<div className="row-container">
		<div className="item">
		<RecordingsToRoles recordingsToRolesArray={recordingsToRolesArray} />
		</div>
		<div className="item">
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
		(PIE CHART)
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
