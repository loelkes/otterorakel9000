import React, { Component } from 'react';
import styled from 'styled-components';
import VotingArea from '../VotingArea';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #b71c1c;
`;

const KITLogo = styled.img`
  width: 150px;
`;

const FlagContainer = styled.div`
  display: flex;
  flex-direction: row;
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
    //fetch('https://obelix.zkm.de/question/0', {'mode': 'no-cors'})
    const response = await fetch('https://obelix.zkm.de/question/marshmello');
    const json = await response.json();
    console.log(JSON.stringify(json));
    this.setState({ questions: json });

    //const dummyJson = [{
      //'id': 1,
        //'hits': [0, 1],
        //'langs': {
          //'en': {
            //'question': 'Is A or B true?',
            //'answers': ['It\'s A', 'It\'s B']
          //},
          //'de': {
            //'question': 'Ist A oder B wahr?',
            //'answers': ['Es ist A', 'Es ist B']
          //},
        //}
      //}, {
        //'id': 2,
        //'hits': [10, 1],
        //'langs': {
          //'en': {
            //'question': 'Marshmellos or Haribo Cola?',
            //'answers': ['Marshmellos', 'Haribo Cola']
          //},
          //'de': {
            //'question': 'Marshmellos oder Haribo Cola?',
            //'answers': ['Marshmellos', 'Haribo Cola']
          //},
          //'cn': {
            //'question': 'Marshmellos还是Haribo Cola？',
            //'answers': ['Marshmellos', 'Haribo Cola']
          //},
        //}
      //},
    //];
    //this.setState({ questions: dummyJson });
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
          <BrandName>OtterOrakel9000</BrandName>
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
