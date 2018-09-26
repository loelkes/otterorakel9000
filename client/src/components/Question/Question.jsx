import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 5rem;
  font-weight: 900;
  color: #fafafa;
`;

export default class Question extends Component {
  render() {
    const { data, lang } = this.props;

    return (
      <Wrapper>
        { data.translations[lang].question }
      </Wrapper>
    )
  }
}
