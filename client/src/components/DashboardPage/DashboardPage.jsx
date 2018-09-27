import React, { Component } from 'react';
import styled from 'styled-components';
import { Doughnut as DoughnutChart } from 'react-chartjs-2';

const Wrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: #fafafa;
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: 400px 400px 400px;
  justify-content: space-between;
  grid-auto-flow: row;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const QuestionStatistic = styled.div`
  width: 368px;
  //height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const QuestionTitle = styled.h2`
  width: 100%;
  font-weight: 500;
  margin: 0 1rem 1rem 1rem;
  color: #333;
  font-size: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const NoVotesMessage = styled.div`
  font-size: 1.5rem;
  color: #bbb;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  border-radius: 50%;
`;

const Header = styled.div`
  font-size: 5rem;
  color: #333;
  text-align: center;
  padding-top: 3rem;
  font-weight: 700;
`;

const DoughnutChartContainer = styled.div`
  width: 250px;
  height: 250px;
`;

export default class DashboardPage extends Component {
  state = {
    data: [],
  };

  componentWillMount = () => {
    this.populateStats();
  };

  populateStats = async () => {
    const response = await fetch('http://server.loelkes.com/question/marshmello');
    const json = await response.json();

    const data = json.map(q => {
      return {
        chartData: {
          labels: q.langs['en'].answers,
          datasets: [{
            data: q.hits,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
            ],
          }],
        },
        question: q
      }
    });

    this.setState({ ...this.state, data });
  }

  render() {
    const { data } = this.state;
    if (data.length === 0) {
      return <div></div>;
    }

    const legendOptions = {
      display: true,
      position: 'bottom',
      fullWidth: true,
    };

    return (
      <Wrapper>
        <Header>
          OtterBoard
        </Header>
        <Inner>
          { data.map(d =>
            <QuestionStatistic key={d.question.id}>
              <QuestionTitle title={d.question.langs['en'].question}>{ d.question.langs['en'].question }
              </QuestionTitle>
              { d.question.hits.reduce((a, b) => a + b, 0) > 0 ? 
                <DoughnutChartContainer>
                  <DoughnutChart
                    data={d.chartData}
                    legend={legendOptions}
                    width={200}
                    height={200}/>
                </DoughnutChartContainer>
                :
                <NoVotesMessage>No votes</NoVotesMessage>
              }
            </QuestionStatistic>
          )}
        </Inner>
      </Wrapper>
    );
  }
}
