import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VotingOptions = styled.div`
  display: flex;
  flex-direction: row;
`;

const Vote = styled.div`
  user-select: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 2rem;
  min-width: 10rem;
  text-align: center;
  padding: 48px;
  margin: 0 2rem 6px 2rem;
  transition: margin .1s ease-in-out, box-shadow .1s ease-in-out, background-color .1s ease-in-out;

  background-color: #fafafa;
  box-shadow: 0 10px 0 0 #ccc;

  
  &:active {
    margin: 6px 2rem 0 2rem;
    box-shadow: 0 4px 0 0 #388E3C;
    background-color: #66BB6A;
  }
`;

const NoVote = styled(Vote)`
  background-color: red;
`;

const YesVote = styled(Vote)`
  background-color: green;
`;

const ThankYouContainer = styled.div`
  font-size: 5rem;
  color: #fafafa;
  font-weight: 700;
`;

export default class VotingArea extends Component {
  state = {
    showThankYou: false
  };

  thankYouTranslations = {
    'en': 'Thanks for voting!',
    'de': 'Danke für\'s Abstimmen!',
    'cn': 'No fucking idea what the translation is :('
  };

  showThankYouNote = (durationInMs = 3000) => {
    this.setState({ ...this.state, showThankYou: true });
    setTimeout(() => {
      this.setState({ ...this.state, showThankYou: false });
    }, durationInMs);
  };

  submitVote = () => {
    // TODO: fetch(...)
    // Better: have onVote callback with result
  }

  handleFirstAnswerClick = event => {
    // TODO: Handle vote
    this.showThankYouNote();
    this.props.onVote(0);
  };

  handleSecondAnswerClick = event => {
    // TODO: Handle vote
    this.showThankYouNote();
    this.props.onVote(1);
  };

  render() {
    const { showThankYou } = this.state;
    const { question, lang } = this.props;

    return (
      <Container>
        { showThankYou ? 
          <ThankYouContainer hidden={!showThankYou}>
            { this.thankYouTranslations.en } 🎉🤗😍
          </ThankYouContainer>
        :
          <VotingOptions hidden={showThankYou}>
            <Vote onClick={this.handleFirstAnswerClick}>{ question.translations[lang].firstAnswer }</Vote>
            <Vote onClick={this.handleSecondAnswerClick}>{ question.translations[lang].secondAnswer }</Vote>
          </VotingOptions>
        }
      </Container>
    )
  }
}
