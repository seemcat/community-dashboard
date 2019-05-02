import React from 'react'
import { 
	VictoryChart, 
	VictoryTheme, 
	VictoryBar,
} from 'victory';

const RecordingsToRoles = ({ recordingsToRolesArray }) => {

	return (
		<VictoryChart
		theme={VictoryTheme.grayscale}
		domainPadding={15}
		>
		<VictoryBar
		data={recordingsToRolesArray}
		labels={(d) => d.recordings}
		x="role"
		y="recordings"
		/>
		</VictoryChart>
	)
}

export default RecordingsToRoles
