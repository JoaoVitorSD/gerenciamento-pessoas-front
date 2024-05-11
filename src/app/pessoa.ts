"use server";

import { RequestProps, ResponseProps } from "@types";

export default async function Pessoa({
  method,
  params,
  body,
  path,
}: RequestProps){
  let URL = process.env.API_URL + "/pessoa";
  if (path) {
    URL += "/" + path;
  }
  const urlParams = new URLSearchParams(params).toString();

  const req = await fetch(URL + "?" + urlParams, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return  buildResponse(req);
}
async function buildResponse(response: Response) {
  const ok = response.ok;
  const data = await response.json();
  const message = !ok ? data?.message : undefined;
  return {
    ok,
    data,
    message,
  };
}
