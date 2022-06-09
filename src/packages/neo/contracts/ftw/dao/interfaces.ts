export interface IChannel {
	owner: string
	contractHash: string
	symbol: string
	minTokens: number
	manifest: string
	createdAt: string
	decimals: number
}

export interface IProposal {
	proposal: {
		no: string,
		contractHash: string,
		title: string,
		description: string,
		options: string[],
		start: string,
		end: string,
		deposit: number,
		totalVotes: number,
		creator: string,
		createdAt: string,
		hasWithdrew: boolean,
	}
	channel: IChannel
	balance: number
}

