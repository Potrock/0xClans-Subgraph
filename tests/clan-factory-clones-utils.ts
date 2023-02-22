import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { ClanCreated } from "../generated/ClanFactoryClones/ClanFactoryClones"

export function createClanCreatedEvent(
  leader: Address,
  clan: Address
): ClanCreated {
  let clanCreatedEvent = changetype<ClanCreated>(newMockEvent())

  clanCreatedEvent.parameters = new Array()

  clanCreatedEvent.parameters.push(
    new ethereum.EventParam("leader", ethereum.Value.fromAddress(leader))
  )
  clanCreatedEvent.parameters.push(
    new ethereum.EventParam("clan", ethereum.Value.fromAddress(clan))
  )

  return clanCreatedEvent
}
