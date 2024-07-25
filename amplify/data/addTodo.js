import {util} from "@aws-appsync/utils";
import {getConnectionDetails, getDataAPIHeaders} from "./mongoDBUtils.js";

export function request(ctx) {
  console.log(`adding object with args ${JSON.stringify(ctx.arguments)}`);

  let connectionDetails = getConnectionDetails();
  return {
    method: "POST",
    resourcePath: `${ctx.env.atlasdataapipath}/insertOne`,
    params: {
      headers: getDataAPIHeaders(ctx),
      body: {
        ...connectionDetails,
        "document": {
          "content": ctx.arguments.content,
          "username": ctx.identity.username,
        }
      },
    },
  };
}

export function response(ctx) {
 const res = JSON.parse(ctx.result.body)

	// https://www.mongodb.com/docs/atlas/api/data-api-resources/#response-2
	if (res.insertedId) {
		return {id: "id3", content: "title3"}
	} else {
		util.error('record failed to be inserted')
	}
}