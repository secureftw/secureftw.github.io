import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {
	DAO_PAGE_ROUTE,
	LOCKER_CONTRACT_PATH,
	LOCKER_CREATE_PATH,
	LOCKER_PATH,
	LOCKER_SEARCH_PATH,
	LOCKER_USER_PATH
} from "../../../consts";
import LockerMain from "./Main";
import Create from "./Create";
import PageLayout from "../../components/PageLayout";
import LockersByContract from "./LockersByContract";
import LockersByAccount from "./LockersByAccount";
import LockerSearch from "./Search";
import {useWallet} from "../../../packages/provider";
import ProductNotSupportedInNetwork from "../../components/ProductNotSupportedInNetwork";

const Locker = () => {
	useEffect(() => {
		document.title = "FTW | Locker";
	}, []);

	const { network } = useWallet();
	if (!DAO_PAGE_ROUTE.network.includes(network)) {
		return (
			<ProductNotSupportedInNetwork title={"Locker"} network={network} />
		);
	}
	return (
		<PageLayout>
			<Route exact={true} path={LOCKER_PATH} component={LockerMain} />
			<Route path={`${LOCKER_CONTRACT_PATH}/:contractHash`} component={LockersByContract} />
			<Route path={`${LOCKER_USER_PATH}/:address`} component={LockersByAccount} />
			<Route path={`${LOCKER_SEARCH_PATH}`} component={LockerSearch} />
			<Route
				path={LOCKER_CREATE_PATH}
				component={Create}
			/>
		</PageLayout>
	);
};

export default Locker;
