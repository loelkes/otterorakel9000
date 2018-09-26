import React, { Component } from 'react';
import styled from 'styled-components';
import Question from '../Question';
import VotingArea from '../VotingArea';
import Flag from 'react-flags';

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
    selectedLanguageId: 'en'
  };

  LANGUAGES = [{
      identifier: 'en',
      imgPath: '/flags/flags-iso/shiny/64/GB.png'
    }, {
      identifier: 'de',
      imgPath: '/flags/flags-iso/shiny/64/DE.png'
    }, {
      identifier: 'cn',
      imgPath: '/flags/flags-iso/shiny/64/CN.png'
    },
  ];

  componentWillMount = () => {
    this.fetchQuestions();
  };

  fetchQuestions = () => {
    const dummyJson = [{
        'id': 1,
        'translations': {
          'en': {
            'question': 'Is A or B true?',
            'firstAnswer': 'It\'s A',
            'secondAnswer': 'It\'s B'
          },
          'de': {
            'question': 'Ist A oder B wahr?',
            'firstAnswer': 'Es ist A',
            'secondAnswer': 'Es ist B'
          },
        }
      }, {
        'id': 2,
        'translations': {
          'en': {
            'question': 'Marshmellos or Haribo Cola?',
            'firstAnswer': 'Marshmellos',
            'secondAnswer': 'Haribo Cola'
          },
          'de': {
            'question': 'Marshmellos oder Haribo Cola?',
            'firstAnswer': 'Marshmellos',
            'secondAnswer': 'Haribo Cola'
          },
        }
      },
    ];
    this.setState({ questions: dummyJson });
  }

  handleVote = result => {
    console.log(result);
  };

  handleLanguageSwitch = langId => {
    this.setState({ selectedLanguageId: langId });
  };

  render() {
    const { questions, selectedLanguageId } = this.state;

    if (questions.length === 0) {
      // TODO: Replace with appropriate loading screen.
      return <div></div>;
    }

    return (
      <Wrapper>
        <Header>
          <KITLogo src='/kit_logo.png' />
          <BrandName>OtterOrakel9000</BrandName>
          <FlagContainer>
            { this.LANGUAGES.map(l =>
              <FlagImg src={l.imgPath} onClick={this.handleLanguageSwitch.bind(this, l.identifier)} />
            )}
          </FlagContainer>
        </Header>
        <ContentWrapper>
          <ContentInner>
            <Question lang={selectedLanguageId} data={questions[0]}/>
            <VotingArea lang={selectedLanguageId} question={questions[0]} onVote={this.handleVote} />
          </ContentInner>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
