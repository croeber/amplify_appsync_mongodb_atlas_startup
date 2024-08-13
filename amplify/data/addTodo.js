import { util } from "@aws-appsync/utils";

/**
 * This function is responsible for making a request to add a todo object.
 * 
 * @param {Object} ctx - The context object containing the arguments and environment details.
 * @returns {Object} - The request object with the method, resourcePath, and params.
 */
export function request(ctx) {
  console.log(`adding object with args ${JSON.stringify(ctx.arguments)}`);

  return {
    method: "POST",
    resourcePath: `${ctx.env.atlasdataapipath}/insertOne`,
    params: {
      headers: JSON.parse(ctx.env.dataapiheader),
      body: {
        ...JSON.parse(ctx.env.clusterdetails),
        "document": {
          "content": ctx.arguments.content,
          "username": ctx.identity.username,
        }
      },
    },
  };
}

// This function handles the response from the API call
export function response(ctx) {
  const res = JSON.parse(ctx.result.body);

  // Check if the record was successfully inserted
  if (res.insertedId) {
    return { id: "id3", content: "title3" };
  } else {
    util.error('record failed to be inserted');
  }
}