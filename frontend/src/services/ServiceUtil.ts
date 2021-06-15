export function urlWithOptionalLimitOffset(baseUrl: string, ...params: (string | number | undefined)[]) {
  return [baseUrl, ...params.filter(p => p !== undefined && p !== "")].join("/");
}

export function jsonResponseOrError(response: Response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}
