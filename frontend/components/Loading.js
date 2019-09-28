import React from 'react';
import LoadingStyles from './styles/LoadingStyles';

const Loading = props => (
  <LoadingStyles fullscreen={props.fullscreen}>
    <div className="loading-container">
      <div className="loading-sprite"></div>
      Loading...
    </div>
  </LoadingStyles>
);

export default Loading;
