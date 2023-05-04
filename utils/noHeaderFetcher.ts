import axios from "axios";

//get
const NoHeaderFetcher = async ({ queryKey }: { queryKey: string }) => {
  const response = await axios.get(queryKey, {
    withCredentials: true,
  });
  return response.data;
};

export default NoHeaderFetcher;
