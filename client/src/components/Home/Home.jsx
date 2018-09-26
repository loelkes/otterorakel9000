import React, { Component } from 'react';
import styled from 'styled-components';
import Question from '../Question';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Header = styled.div`
backround-color: #fafafa;
  display: flex;
  flex-direction: row;
  height: 150px;
  align-items: center;
  justify-content: center;
`;

const BrandName = styled.h1`
  font-weight: 900;
  margin: 0;
  color: #333;
  font-size: 3rem;
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 8rem);
  height: calc(100% - 150px - 8rem);
  padding: 4rem;
`;

const VotingOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: yellow;
  margin-top: 2rem;
`;

const Vote = styled.div`
  border-radius: 4px;
  font-size: 2rem;
  min-width: 6rem;
  text-align: center;
  padding: 2rem;
`;

const NoVote = styled(Vote)`
  background-color: red;
`;

const YesVote = styled(Vote)`
  background-color: green;
`;

export default class Home extends Component {

  render() {
    return (
      <Wrapper>
        <Header>
          <BrandName>OtterOrakel9000</BrandName>
        </Header>
        <Content>
          <Question content='test' />
          <VotingOptions>
            <NoVote>NO</NoVote>
            <YesVote>YES</YesVote>
          </VotingOptions>
        </Content>
      </Wrapper>
    );
  }
}
