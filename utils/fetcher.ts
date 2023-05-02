import axios from "axios";

const headers = {
  "X-Requested-With": "XMLHttpRequest",
};
//get
const fetcher = async ({ queryKey }: { queryKey: string }) => {
  const response = await axios.get(queryKey, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export default fetcher;
