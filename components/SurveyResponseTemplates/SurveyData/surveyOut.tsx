import { useMutation } from "react-query";
import { responseDataList } from "@pages/Team/type";

export const postData = async (url: string, data: responseDataList) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("API 요청이 실패했습니다.");
  }

  return response.json();
};
