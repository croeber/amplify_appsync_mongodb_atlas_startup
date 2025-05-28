export function successResponse(body: any): object {
  return {
    statusCode: 200,
    body: body,
  };
}
export function errorResponse(err: Error): object {
  const errorMessage = err.message;
  return {
    statusCode: 400,
    body: errorMessage,
    headers: {
      "Content-Type": "application/json",
    },
  };
}
