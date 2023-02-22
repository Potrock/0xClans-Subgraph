import { Address, BigInt } from "@graphprotocol/graph-ts";
import { User } from "../generated/schema";

export const FACTORY_ADDRESS = "0x7372d48Fb9A1c52AA7E6D99c1C84Cc47D294196A";

export function createUser(
	address: Address,
	createdAtBlock: BigInt,
	createdAtTimestamp: BigInt
): User {
	let user = new User(address.toHexString());
	user.createdAtBlock = createdAtBlock;
	user.createdAtTimestamp = createdAtTimestamp;
	user.clanCount = 0;
	user.clans = [];
	user.save();

	return user;
}
