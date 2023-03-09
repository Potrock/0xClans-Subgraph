import { Account, User } from "../generated/schema";
import {
	AccountLinked as AccountLinkedEvent,
	AccountUnlinked as AccountUnlinkedEvent,
} from "../generated/AccountLinker/AccountLinker";
import { createUser, increaseAccountCount } from "./helpers";
import { store } from "@graphprotocol/graph-ts";

export function handleAccountLinked(event: AccountLinkedEvent): void {
	// Get the user entity
	let user = User.load(event.params.player.toHexString());
	// If the user doesn't exist, create it
	if (user == null) {
		user = createUser(
			event.params.player,
			event.block.number,
			event.block.timestamp
		);
	}

	// Check if the user already has an account for this platform.
	// If so, update the userId.
	for (let i = 0; i < user.accounts.length; i++) {
		let account = Account.load(user.accounts[i]);
		if (account) {
			if (account.platform == event.params.platform) {
				account.uuid = event.params.uuid;
				account.save();
				user.save();
				return;
			}
		}
	}

	// If the user doesn't have an account for this platform, create one.

	// Define the Account schema
	let account = new Account(
		event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
	);
	increaseAccountCount();
	// Set the account's properties
	account.platform = event.params.platform;
	account.uuid = event.params.uuid;
	account.address = event.params.player.toHexString();
	account.save();

	// Add the new account to the user's accounts
	if (user.accounts.length == 0) {
		user.accounts = [account.id];
	} else {
		user.accounts.concat([account.id]);
	}

	// Save the user and account
	account.save();
	user.save();
}

export function handleAccountUnlinked(event: AccountUnlinkedEvent): void {
	// Get the user entity
	let user = User.load(event.params.player.toHexString());
	// If the user doesn't exist, create it
	if (user == null) {
		user = createUser(
			event.params.player,
			event.block.number,
			event.block.timestamp
		);
	}

	// Check if the user already has an account for this platform.
	// If so, update the userId.
	for (let i = 0; i < user.accounts.length; i++) {
		let account = Account.load(user.accounts[i]);
		if (account) {
			if (
				account.platform == event.params.platform &&
				account.uuid == event.params.uuid
			) {
				store.remove("Account", account.id);
				user.accounts.splice(i, 1);
				user.save();
				return;
			}
		}
	}
}
