import { Address, BigInt } from "@graphprotocol/graph-ts";
import { User, UserFactory } from "../generated/schema";

export const FACTORY_ADDRESS = "0x7372d48Fb9A1c52AA7E6D99c1C84Cc47D294196A";

export function createUser(
	address: Address,
	createdAtBlock: BigInt,
	createdAtTimestamp: BigInt
): User {
	let userFactory = UserFactory.load("1");
	if (userFactory == null) {
		userFactory = new UserFactory("1");
		userFactory.userCount = 0;
		userFactory.accountCount = 0;
	}

	let user = new User(address.toHexString());
	user.createdAtBlock = createdAtBlock;
	user.createdAtTimestamp = createdAtTimestamp;
	user.clanCount = 0;
	user.clans = [];
	user.accounts = [];
	userFactory.userCount += 1;
	userFactory.save();
	user.save();

	return user;
}

export function increaseAccountCount(): void {
	let userFactory = UserFactory.load("1");
	if (userFactory == null) {
		userFactory = new UserFactory("1");
		userFactory.userCount = 0;
		userFactory.accountCount = 0;
	}

	userFactory.accountCount += 1;
	userFactory.save();
}
