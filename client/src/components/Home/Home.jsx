import React, { Component } from 'react';
import styled from 'styled-components';
import VotingArea from '../VotingArea';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  //background-color: #b71c1c;
  background-image: url('/bg.jpg');
  background-size: cover;
`;

const KITLogo = styled.img`
  width: 150px;
  margin-right: 100px;
`;

const FlagContainer = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const FlagImg = styled.img`
  width: 64px;
  height: 64px;
  margin-left: 1rem;
  user-select: none;
  cursor: pointer;
`;

const Header = styled.div`
  padding: 0 4rem;
  display: flex;
  flex-direction: row;
  height: 150px;
  align-items: center;
  justify-content: space-between;
`;

const BrandName = styled.h1`
  font-weight: 900;
  margin: 0;
  color: #fafafa;
  font-size: 3rem;
`;

const BrandLogo = styled.div`
  margin-top: 2rem;
  width: 150px;
  height: 150px;
  background-image: url('/otter-logo.png');
  background-size: contain;
`;

const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 8rem);
  height: calc(100% - 150px - 8rem);
  padding: 4rem;
`;

const ContentInner = styled.div`
  margin-bottom: 3rem;
  min-height: 500px;
`;

export default class Home extends Component {
  state = {
    questions: [],
    selectedLanguageId: 'en',
    currentQuestionIdx: 0
  };

  LANGUAGES = [{
      identifier: 'en',
      imgPath: '/GB-flat.png'
    }, {
      identifier: 'de',
      imgPath: '/DE-flat.png'
    }, {
      identifier: 'cn',
      imgPath: '/CN-flat.png'
    },
  ];

  componentWillMount = () => {
    this.fetchQuestions();
  };

  fetchQuestions = async () => {
    const response = await fetch('https://obelix.zkm.de/question/marshmello');
    const json = await response.json();
    console.log(JSON.stringify(json));
    this.setState({ questions: json });
  }

  handleVote = (question, result) => {
    let { selectedLanguageId } = this.state;
    // Notify server about vote that was casted.
    fetch(`https://obelix.zkm.de/answer/${question.id}/${selectedLanguageId}/${result}`)
      .then(function(response) {
        console.log(response);
        return true;
      })

    const currentQuestionIdx = (this.state.currentQuestionIdx + 1) % this.state.questions.length;
    if (!(selectedLanguageId in this.state.questions[currentQuestionIdx].langs)) {
      // TODO: Probably better to pick first key from langs.
      selectedLanguageId = 'en';
    }

    this.setState({ ...this.state, currentQuestionIdx, selectedLanguageId });
  };

  handleLanguageSwitch = langId => {
    this.setState({ selectedLanguageId: langId });
  };

  render() {
    const { questions, selectedLanguageId, currentQuestionIdx } = this.state;
    if (questions.length === 0) {
      return <div></div>;
    }
    const currentQuestion = questions[currentQuestionIdx];
    console.log()

    return (
      <Wrapper>
        <Header>
          <KITLogo src='/kit_logo.png' />
          <BrandLogo />
          <FlagContainer>
            { this.LANGUAGES.map(l => {
              if (l.identifier in currentQuestion.langs) {
                return <FlagImg key={l.identifier} src={l.imgPath} onClick={this.handleLanguageSwitch.bind(this, l.identifier)} />
              }
            }
            )}
          </FlagContainer>
        </Header>
        <ContentWrapper>
          <ContentInner>
            <VotingArea lang={selectedLanguageId} question={currentQuestion} onVote={this.handleVote} />
          </ContentInner>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
