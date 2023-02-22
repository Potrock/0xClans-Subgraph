import { ClanCreated as ClanCreatedEvent } from "../generated/ClanFactory/ClanFactory";
import { Clan as ClanTemplate } from "../generated/templates";
import { Clan, ClanFactory, User } from "../generated/schema";
import { createUser, FACTORY_ADDRESS } from "./helpers";

export function handleClanCreated(event: ClanCreatedEvent): void {
	// First, make sure that the ClanFactory entity exists
	let factory = ClanFactory.load(FACTORY_ADDRESS);
	if (factory == null) {
		factory = new ClanFactory(FACTORY_ADDRESS);
		factory.clanCount = 0;
		factory.createdAtBlock = event.block.number;
		factory.createdAtTimestamp = event.block.timestamp;
	}

	factory.clanCount += 1;
	factory.save();

	// Create or grab clan leader user entity
	let leader = User.load(event.params.leader.toHexString());
	if (leader == null) {
		leader = createUser(
			event.params.leader,
			event.block.number,
			event.block.timestamp
		);
	}

	// Create a new clan entity
	let clan = new Clan(event.params.clan.toHexString());

	// Set the clan's properties
	clan.name = event.params.name;
	clan.symbol = event.params.symbol;
	clan.leader = leader.id;
	clan.members = [leader.id];

	// Creation statistics
	clan.createdAtBlock = event.block.number;
	clan.createdAtTimestamp = event.block.timestamp;
	clan.transactionHash = event.transaction.hash.toHexString();

	clan.save();

	if (leader.clans.length == 0) {
		leader.clans = [clan.id];
		leader.clanCount = 1;
	} else {
		leader.clans.concat([clan.id]);
		leader.clanCount += 1;
	}

	leader.save();

	// Create a new template for the new clan
	ClanTemplate.create(event.params.clan);
}
