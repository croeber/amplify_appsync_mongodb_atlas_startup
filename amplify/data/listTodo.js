import { util } from "@aws-appsync/utils";

export function request(ctx) {
  console.log(`hello from request`);
  return {
    method: "POST",
    resourcePath: `${ctx.env.atlasdataapipath}/find`,
    params: {
      headers: JSON.parse(ctx.env.dataapiheader),
      body: {
        ...JSON.parse(ctx.env.clusterdetails),
        "filter": {
          "username": ctx.identity.username,
        }
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