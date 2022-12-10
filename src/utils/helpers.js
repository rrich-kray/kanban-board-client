export const headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export async function fetchData(url, method, headers, body = null) {
  return await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });
}

export const config = {
  headers: {
    Authorization: `Bearer ${
      localStorage.getItem("token") ? localStorage.getItem("token") : ""
    }`,
  },
};
