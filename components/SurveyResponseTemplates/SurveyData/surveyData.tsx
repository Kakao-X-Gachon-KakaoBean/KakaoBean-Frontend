// import React from "react";
// import { useQuery } from "react-query";
// import fetcher from "@utils/fetcher";
// import { incomingDataList } from "@pages/Team/type";
// import { atom, useRecoilState, useSetRecoilState } from "recoil";
// export const surveyData = atom<incomingDataList>({
//   key: "testInput",
//   default: undefined,
// });
//
// const { isLoading, isSuccess, status, isError, data, error } = useQuery(
//   ["survey"],
//   () => fetcher({ queryKey: "http://localhost:8080/surveys/2" })
// );
// const [surveyInput, setSurveyInput] = useRecoilState(surveyData);
// setSurveyInput(data);
export {};
