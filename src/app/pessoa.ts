"use server";
export default async function Pessoa(urlParams: any) {
  
  console.log("Buscando pessoas");
  const url = new URLSearchParams(urlParams ).toString();
  const resp = await fetch(process.env.API_URL + "/pessoa?"+url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await resp.json();
  console.log(data);
  return data;

}
