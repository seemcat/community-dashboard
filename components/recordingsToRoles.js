import React from 'react'
import { 
	VictoryChart, 
	VictoryTheme, 
	VictoryPie,
} from 'victory';

const RecordingsToRoles = ({ recordingsToRolesArray }) => {

	return (
		<VictoryPie
		colorScale="warm"
		data={recordingsToRolesArray}
		labels={(d) => d.recordings}
		x="role"
		y="recordings"
		/>
	)
}

export default RecordingsToRoles
