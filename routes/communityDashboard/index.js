import React from 'react'
import Loadable from 'react-loadable'
import Loading from '../../components/loading'

const LoadableComponent = Loadable({
	loader: () => import('./communityDashboard'),
	loading: Loading,
})

const LoadableCommunityDashboard = () => <LoadableComponent />
export default LoadableCommunityDashboard
