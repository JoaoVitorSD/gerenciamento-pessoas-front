"use server";

import {RequestProps} from "@types";

export default async function Endereco({ method, params, body, path }: RequestProps) {
  let URL = process.env.API_URL + "/endereco";
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
  const data = req.json();
  return data;
}
