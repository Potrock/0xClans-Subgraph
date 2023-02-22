import { Clan, User } from "../generated/schema";
import {
	Initialized as InitializedEvent,
	MemberAdded as MemberAddedEvent,
	MemberRemoved as MemberRemovedEvent,
	NameChanged as NameChangedEvent,
	SymbolChanged as SymbolChangedEvent,
} from "../generated/templates/Clan/Clan";
import { createUser } from "./helpers";

/**         eventHandlers:
              - event: MemberAdded(indexed address,indexed address)
                handler: handleMemberAdded
              - event: MemberRemoved(indexed address,indexed address)
                handler: handleMemberRemoved
              - event: NameChanged(string,indexed address)
                handler: handleNameChanged
              - event: SymbolChanged(string,indexed address)
                handler: handleSymbolChanged
 */

export function handleMemberAdded(event: MemberAddedEvent): void {
	// Add user to clan
	let clan = Clan.load(event.address.toHexString());
	if (clan == null) {
		return;
	} else {
		clan.members.push(event.params.member.toHexString());
	}
	clan.save();

	// Add clan to user
	let user = User.load(event.params.member.toHexString());
	if (user == null) {
		user = createUser(
			event.params.member,
			event.block.number,
			event.block.timestamp
		);
	}

	user.clans.push(clan.id);
	user.clanCount += 1;
	user.save();
}

export function handleMemberRemoved(event: MemberRemovedEvent): void {
	// Remove user from clan
	let clan = Clan.load(event.address.toHexString());
	if (clan == null) {
		return;
	} else {
		let index = clan.members.indexOf(event.params.member.toHexString());
		if (index > -1) {
			clan.members.splice(index, 1);
		}
	}
	clan.save();

	// Remove clan from user
	let user = User.load(event.params.member.toHexString());
	if (user == null) {
		return;
	} else {
		if (user.clans) {
			let index = user.clans.indexOf(clan.id);
			if (index > -1) {
				user.clans.splice(index, 1);
				user.clanCount -= 1;
			}
		}
	}
	user.save();
}

export function handleNameChanged(event: NameChangedEvent): void {
	let clan = Clan.load(event.address.toHexString());
	if (clan == null) {
		return;
	} else {
		clan.name = event.params.name;
	}
	clan.save();
}

export function handleSymbolChanged(event: SymbolChangedEvent): void {
	let clan = Clan.load(event.address.toHexString());
	if (clan == null) {
		return;
	} else {
		clan.symbol = event.params.symbol;
	}
	clan.save();
}
