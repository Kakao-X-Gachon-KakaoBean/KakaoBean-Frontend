import {
  Wrapper,
  TextDiv,
  BeanText,
  CorText,
  CorTextDiv,
  IndexDiv,
  Indexes,
  Detail,
  LongText,
} from "./styles";
import React from "react";

const BlackField = () => {
  return (
    <Wrapper>
      <CorTextDiv>
        <BeanText>KaKaoBeanjjj</BeanText>
        <CorText> corporation</CorText>
      </CorTextDiv>
      <TextDiv>
        <IndexDiv>
          <Indexes>Service</Indexes>
          <Detail>Web Hosting</Detail>
          <Detail>Domains</Detail>
          <Detail>Premium Hosting</Detail>
          <Detail>Private Server</Detail>
          <Detail>E-mail Hosting</Detail>
        </IndexDiv>
        <IndexDiv>
          <Indexes>Support</Indexes>
          <Detail>Pricing Plan</Detail>
          <Detail>Documentation</Detail>
          <Detail>Guide</Detail>
          <Detail>Tutorial</Detail>
        </IndexDiv>
        <IndexDiv>
          <Indexes>Company</Indexes>
          <Detail>About</Detail>
          <Detail>Blog</Detail>
          <Detail>Join Us</Detail>
          <Detail>Press</Detail>
          <Detail>Partners</Detail>
        </IndexDiv>
        <IndexDiv>
          <Indexes>Legal</Indexes>
          <Detail>Claim</Detail>
          <Detail>Privacy</Detail>
          <Detail>Terms</Detail>
        </IndexDiv>
        <IndexDiv>
          <Indexes>Subscribe to our newsletter</Indexes>
          <LongText>Funding freemium long tail hypotheses first</LongText>
          <LongText>mover advantage assets ownership</LongText>
        </IndexDiv>
      </TextDiv>
    </Wrapper>
  );
};

export default BlackField;
