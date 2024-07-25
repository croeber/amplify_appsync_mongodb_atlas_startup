import { util } from "@aws-appsync/utils";
import {getConnectionDetails, getDataAPIHeaders, getUserFilter} from "./mongoDBUtils.js";

export function request(ctx) {
  console.log(`hello from request`);
  return {
    method: "POST",
    resourcePath: `${ctx.env.atlasdataapipath}/find`,
    params: {
      headers: getDataAPIHeaders(ctx),
      body: {
        ...getConnectionDetails(),
        "filter": getUserFilter(ctx),
      },
    },
  };
}

export function response(ctx) {
  
  console.log(`hello from response`);
  if (ctx.error) {
    return util.error(ctx.error.message, ctx.error.type);
  }
  if (ctx.result.statusCode == 200) {
    return JSON.parse(ctx.result.body).documents;
  } else {
    return  {id: "id7error", content: `${JSON.stringify(ctx)}`};
  }
}