"use server";

import RequestProps from "@types/RequestProps";

export default async function Pessoa({
  method,
  params,
  body,
  path,
}: RequestProps) {
  let URL = process.env.API_URL + "/pessoa";
  if (path) {
    URL += "/" + path;
  }
  const urlParams = new URLSearchParams(params).toString();

  const req = await fetch(URL + "?"+urlParams, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = req.json();
  return data;
}
