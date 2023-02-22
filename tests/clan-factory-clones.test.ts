import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ClanCreated } from "../generated/schema"
import { ClanCreated as ClanCreatedEvent } from "../generated/ClanFactoryClones/ClanFactoryClones"
import { handleClanCreated } from "../src/clan-factory-clones"
import { createClanCreatedEvent } from "./clan-factory-clones-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let leader = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let clan = Address.fromString("0x0000000000000000000000000000000000000001")
    let newClanCreatedEvent = createClanCreatedEvent(leader, clan)
    handleClanCreated(newClanCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ClanCreated created and stored", () => {
    assert.entityCount("ClanCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ClanCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "leader",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ClanCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "clan",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
