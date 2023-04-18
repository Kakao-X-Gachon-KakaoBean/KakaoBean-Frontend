import axios from "axios";

const headers = {
  "X-Requested-With": "XMLHttpRequest",
};
//get
const fetcher = async ({ queryKey }: { queryKey: string }) => {
  const response = await axios.get(queryKey, {
    withCredentials: true,
    headers,
  });
  return response.data;
};

export default fetcher;
