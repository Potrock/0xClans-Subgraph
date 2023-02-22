import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  Initialized,
  MemberAdded,
  MemberRemoved,
  NameChanged,
  SymbolChanged
} from "../generated/SimpleClanTemplate/SimpleClanTemplate"

export function createInitializedEvent(leader: Address): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam("leader", ethereum.Value.fromAddress(leader))
  )

  return initializedEvent
}

export function createMemberAddedEvent(member: Address): MemberAdded {
  let memberAddedEvent = changetype<MemberAdded>(newMockEvent())

  memberAddedEvent.parameters = new Array()

  memberAddedEvent.parameters.push(
    new ethereum.EventParam("member", ethereum.Value.fromAddress(member))
  )

  return memberAddedEvent
}

export function createMemberRemovedEvent(member: Address): MemberRemoved {
  let memberRemovedEvent = changetype<MemberRemoved>(newMockEvent())

  memberRemovedEvent.parameters = new Array()

  memberRemovedEvent.parameters.push(
    new ethereum.EventParam("member", ethereum.Value.fromAddress(member))
  )

  return memberRemovedEvent
}

export function createNameChangedEvent(name: string): NameChanged {
  let nameChangedEvent = changetype<NameChanged>(newMockEvent())

  nameChangedEvent.parameters = new Array()

  nameChangedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return nameChangedEvent
}

export function createSymbolChangedEvent(symbol: string): SymbolChanged {
  let symbolChangedEvent = changetype<SymbolChanged>(newMockEvent())

  symbolChangedEvent.parameters = new Array()

  symbolChangedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )

  return symbolChangedEvent
}
