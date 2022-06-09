import React from 'react';
import {u} from "@cityofzion/neon-core";
import {IProposal} from "../../../../../../../packages/neo/contracts/ftw/dao/interfaces";
interface IVotingProgressProps{
	data: IProposal
}
const VotingProgress = ({data}: IVotingProgressProps) => {
	return (
		<div>
			{data.proposal.options.map((op, i) => {
				const percent =
					(data.proposal[`option${i}`] / data.proposal.totalVotes) *
					100;

				const voteAmount = u.BigInteger.fromNumber(
					data.proposal[`option${i}`]
				).toDecimal(data.channel.decimals);

				return (
					<div key={`option-${i}`} className="mb-3">
						<div className="level is-marginless">
							<div className="level-left">
								<div className="level-item">{op}</div>
							</div>
							<div className="level-right">
								<div className="level-item">
									{parseFloat(voteAmount)} {data.channel.symbol}
								</div>
							</div>
						</div>
						<progress
							className="progress is-info"
							value={percent}
							max="100"
						>
							{percent}%
						</progress>
					</div>
				);
			})}
		</div>
	);

};

export default VotingProgress;
