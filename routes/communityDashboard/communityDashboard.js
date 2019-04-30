import React from 'react'
import './communityDashboard.css';

const CommunityDashboard = () => (
	<div className="col-container">
	<div className="title">
	Community Dashboard
	</div>

	<div className="row-container">
	<div className="item">
	(#)
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
	(BAR GRAPH)
	</div>
	<div className="item">
	(AVG RECORDINGS PER WEEK)
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

export default CommunityDashboard
