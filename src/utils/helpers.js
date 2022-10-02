export const fetchModify = (url, type, content) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
};

export const fetchGet = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
};

export const config = {
  headers: {
    Authorization: `Bearer ${
      localStorage.getItem("token") ? localStorage.getItem("token") : ""
    }`,
  },
};
