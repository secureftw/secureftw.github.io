import React from 'react';
import PageLayout from "../../../../components/PageLayout";
import {NavLink, Route} from "react-router-dom";
import Create from "./Create";
import ProposalList from './List';

const DAOChannel = (props) => {

	return (
		<PageLayout>
			<div className="columns">
				<div className="column is-6 is-offset-3">
					<div className="columns">
						<div className="column is-9">
							<div className="box is-shadowless">
								{/*<Route exact={true} path={DAO_PATH} component={ProposalList} />*/}
								{/*<Route path={PROPOSALS_CREATE_PATH} component={Create} />*/}
							</div>
						</div>
						<div className="column is-4">
							<div className="box  is-shadowless">
								<aside className="menu">
									<ul className="menu-list">
										{/*<li className="is-active">*/}
										{/*	<NavLink*/}
										{/*		exact={true}*/}
										{/*		activeClassName={"is-active"}*/}
										{/*		to={PROPOSALS_PATH}*/}
										{/*	>*/}
										{/*		Proposals*/}
										{/*	</NavLink>*/}
										{/*</li>*/}
										{/*<li>*/}
										{/*	<NavLink*/}
										{/*		activeClassName={"is-active"}*/}
										{/*		to={PROPOSALS_CREATE_PATH}*/}
										{/*	>*/}
										{/*		New proposal*/}
										{/*	</NavLink>*/}
										{/*</li>*/}
										{/*<li>*/}
										{/*	<NavLink*/}
										{/*		activeClassName={"is-active"}*/}
										{/*		to={PROPOSALS_ABOUT_PATH}*/}
										{/*	>*/}
										{/*		About*/}
										{/*	</NavLink>*/}
										{/*</li>*/}
									</ul>
								</aside>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);

};

export default DAOChannel;
