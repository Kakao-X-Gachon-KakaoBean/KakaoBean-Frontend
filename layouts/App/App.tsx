import React from "react";
import { Redirect, Route, Switch } from "react-router";
import loadable from "@loadable/component";

const Main = loadable(() => import(`@layouts/Main`));
const SignUp = loadable(() => import(`@pages/SignUp`));
const LogIn = loadable(() => import(`@pages/LogIn`));
const MyPage = loadable(() => import(`@pages/MyPage`));
const Team = loadable(() => import(`@pages/Team`));
const Product = loadable(() => import(`@pages/Product`));
const CreateSurvey = loadable(() => import(`@pages/Survey/CreateSurvey`));
const SurveyResponseDetail = loadable(
  () => import(`@pages/Survey/SurveyResponseDetail`)
);

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="main" />
      </Route>
      <Route path="/main" component={Main} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/team" component={Team} />
      <Route path="/survey/:id" component={Team} />
      <Route path="/product" component={Product} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/mypage/:id" component={MyPage} />
      <Route path="/mypage/:id/:surveyid" component={MyPage} />
      <Route path="/createsurvey" component={CreateSurvey} />
      <Route path="/surveyresponsedetail" component={SurveyResponseDetail} />
    </Switch>
  );
};

export default App;
