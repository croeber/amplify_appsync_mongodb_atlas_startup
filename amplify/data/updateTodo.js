export function request(ctx) {
  console.log(`adding object with args ${JSON.stringify(ctx.arguments)}`);

  return {
    method: "POST",
    resourcePath: `${ctx.env.atlasdataapipath}/updateOne`,
    params: {
      headers: JSON.parse(ctx.env.dataapiheader),
      body: {
        ...JSON.parse(ctx.env.clusterdetails),
        "filter": {
        "_id": { "$oid": ctx.arguments._id },
        "username": ctx.identity.username,
        },
        "update": {
          "$set": {
            "content": ctx.arguments.content,
          }
        },
      }
    },
  };
}

export function response(ctx) {
	// https://www.mongodb.com/docs/atlas/api/data-api-resources/#response-2
  if (ctx.result.statusCode == 200) {
    return ""
  } else {
    return  `${JSON.stringify(ctx)}`;
  }
}