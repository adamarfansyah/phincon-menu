import axios from "axios";

const Api = axios.create({
  headers: {
    "Content-Type": "Application/json",
  },
});

export const callApi = async ({
  baseURL = "https://www.themealdb.com/api/json/v1/1",
  endpoint = "",
  method = "GET",
  body,
}) => {
  const response = await Api.request({
    baseURL: baseURL,
    url: endpoint,
    method: method,
    data: body,
  });

  return response.data;
};
