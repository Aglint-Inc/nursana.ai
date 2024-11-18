import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';
import { type z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { schema } from './schema';

const TEMPLATE = `Extract the requested fields from the input text only.
Fix spelling mistakes. Do not add or generate extra information use only given text.
The field "entity" refers to the first mentioned entity in the input.
Input:

{input}`;

export const parseJson = async (currentMessageContent: string) => {
  let totalCompletionTokens = 0;
  let totalPromptTokens = 0;
  let totalExecutionTokens = 0;
  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
  const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    callbacks: [
      {
        handleLLMEnd: (output) => {
          const { completionTokens, promptTokens, totalTokens } =
            output.llmOutput?.tokenUsage || {};
          totalCompletionTokens += completionTokens ?? 0;
          totalPromptTokens += promptTokens ?? 0;
          totalExecutionTokens += totalTokens ?? 0;
        },
      },
    ],
    temperature: 0.5,
    modelName: 'gpt-4o-mini',
    // tokens.length < 1000 ? "gpt-3.5-turbo-0613" : "gpt-3.5-turbo-16k-0613",
    // verbose: true,
    timeout: 100 * 1000, //30sec
  });
  const functionCallingModel = model.bind({
    functions: [
      {
        name: 'output_formatter',
        description: 'Should always be used to properly format output',
        parameters: zodToJsonSchema(schema),
      },
    ],
    function_call: { name: 'output_formatter' },
  });
  /**
   * Returns a chain with the function calling model.
   */
  const chain = prompt
    .pipe(functionCallingModel)
    .pipe((data) => {
      // JSON.parse(data.lc_kwargs.additional_kwargs.function_call);
      return data;
    })
    .pipe(new JsonOutputFunctionsParser());

  const result = (await chain.invoke({
    input: currentMessageContent,
  })) as z.infer<typeof schema>;
  return {
    result,
    token: { totalCompletionTokens, totalPromptTokens, totalExecutionTokens },
  };
};
