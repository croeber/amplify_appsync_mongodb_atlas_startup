import {getConnectionDetails, getDataAPIHeaders, getUserDocumentFilter} from "./mongoDBUtils.js";

export function request(ctx) {
  console.log(`adding object with args ${JSON.stringify(ctx.arguments)}`);

  return {
    method: "POST",
    resourcePath: `${ctx.env.atlasdataapipath}/deleteOne`,
    params: {
      headers: getDataAPIHeaders(ctx),
      body: {
        ...getConnectionDetails(),
        "filter": getUserDocumentFilter(ctx),
      },
    },
  };
}

export function response(ctx) {
	// https://www.mongodb.com/docs/atlas/api/data-api-resources/#response-2
  if (ctx.result.statusCode == 200) {
    return "200";
  } else {
    return  `${JSON.stringify(ctx)}`;
  }
}