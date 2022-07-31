export interface ILockerContract{
	contractHash: string
	symbol: string
	decimals: number
	lockedAmount: number
}

export interface ILockerContracts {
	totalItems: number;
	totalPages: number;
	items: ILockerContract[];
}

export interface ILockersByToken {
	totalItems: number;
	totalPages: number;
	items: ILocker[];
}

export interface ILocker{
	lockerNo: number
	contractHash: string
	owner: string
	receiver: string
	amount: number
	releaseAt: number
	createdAt: string
	title: string
	description: string
	releasedAt: number
}

export interface ILockerKeyToken{
	owner: string
	name: string
	symbol: string
	decimals: number
	lockerNo: number
	contractHash: string
	amount: number
	releaseAt: number
	createdAt: string
}
