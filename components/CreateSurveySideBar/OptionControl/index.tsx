import React, { useEffect, useState } from "react";
import { Wrapper } from "@components/CreateSurveySideBar/OptionControl/styles";
import { MultipleOptionControl } from "@components/CreateSurveySideBar/OptionControl/MultipleOptionControl";
import { SubjectiveOptionControl } from "@components/CreateSurveySideBar/OptionControl/SubjectiveOptionControl";
import { RangeOptionControl } from "@components/CreateSurveySideBar/OptionControl/RangeOptionControl";

export const OptionControl = () => {
  return (
    <Wrapper>
      <MultipleOptionControl />
      {/*<SubjectiveOptionControl />*/}
      {/*<RangeOptionControl />*/}
    </Wrapper>
  );
};
