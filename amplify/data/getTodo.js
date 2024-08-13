import { util } from "@aws-appsync/utils";

// This is the request function that is used to make a POST request to the data API
export function request(ctx) {
  console.log(`hello from request`);
  return {
    method: "POST",
    resourcePath: `${ctx.env.atlasdataapipath}/findOne`,
    params: {
      headers: JSON.parse(ctx.env.dataapiheader),
      body: {
        ...JSON.parse(ctx.env.clusterdetails),
        "filter": {
          "username": ctx.identity.username,
        },
        "projection": {"_id": 1, "content":1}
      },
    },
  };
}

// This is the response function that is used to handle the response from the data API
export function response(ctx) {
  console.log(`hello from response`);
  if (ctx.error) {
    return util.error(ctx.error.message, ctx.error.type);
  }
  if (ctx.result.statusCode == 200) {
    return JSON.parse(ctx.result.body).document;
  } else {
    return  {id: "error", content: `${JSON.stringify(ctx)}`};
  }
}