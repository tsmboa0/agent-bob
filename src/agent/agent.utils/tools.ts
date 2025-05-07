import { tool } from "@langchain/core/tools";
import { BaxusService } from "src/baxus/baxus.service";
import { z } from "zod";

const baxusService = new BaxusService();

export const searchBottleTool = tool(
    async({bottle_name})=>{
        const result = await baxusService.searchBottles(bottle_name);
        return JSON.stringify(result);
    },
    {
        name:"SearchBottle",
        description:"Search our database for whisky bottles matching a bottle name. It accepts a bottle name and returns a list of bottles matching the provided name.",
        schema: z.object({
            bottle_name: z.string().describe("This is the complete name of the bottle to be searched for.")
        })
    }
)

export const verifyBottleExists = tool(
    async({bottle_name})=>{
        const result = await baxusService.verifyBottleExists(bottle_name);
        return JSON.stringify(result)
    },
    {
        name:"VerifyBottle",
        description:"Verify if a specific bottle exists in our database. It accepts the complete bottle name and returns a bool and the bottle metadata indicating if the bottle exists or not.",
        schema: z.object({
            bottle_name: z.string().describe("This is the complete anme of the bottle to be verified.")
        })
    }
)

export const allTools = [searchBottleTool, verifyBottleExists]