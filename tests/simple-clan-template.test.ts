import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { Initialized } from "../generated/schema"
import { Initialized as InitializedEvent } from "../generated/SimpleClanTemplate/SimpleClanTemplate"
import { handleInitialized } from "../src/simple-clan-template"
import { createInitializedEvent } from "./simple-clan-template-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let leader = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newInitializedEvent = createInitializedEvent(leader)
    handleInitialized(newInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Initialized created and stored", () => {
    assert.entityCount("Initialized", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Initialized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "leader",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
