import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      system: "You are a helpful assistant.",
      model: google("gemini-2.0-flash"),
      prompt:
        "Write a vegetarian lasagna recipe for 4 people. The recipe should be easy to make and healthy, and should contain a wide variety of vegetables and herbs.",
    });

    return steps;
  }
);
