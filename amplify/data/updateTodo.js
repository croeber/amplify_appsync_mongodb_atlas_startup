// This function handles the request to the data API
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

// This function handles the response from the data API
export function response(ctx) {
  // Check if the response status code is 200
  if (ctx.result.statusCode == 200) {
    return "";
  } else {
    return `${JSON.stringify(ctx)}`;
  }
}