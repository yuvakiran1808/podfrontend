import { API } from "../../backend";

export const createPodcast = (userId, token, product) => {
  console.log(product);
  console.log(userId);
  console.log(token);
  for (const value of product.values()) {
    console.log(value);
  }  
  return fetch(`${API}/create/podcast/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return {
         "error" : err
      }
    });
};

export const getAllPodcasts = () => {
  return fetch(`${API}/podcasts`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
