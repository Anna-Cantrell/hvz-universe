import styled from 'styled-components';

const LoadingStyles = styled.div`
  @-webkit-keyframes walk {
    0%{background-position:0%}
    100%{background-position:200%}
  }
  @-moz-keyframes walk {
    0%{background-position:0%}
    100%{background-position:200%}
  }
  @keyframes walk {
    0%{background-position:0%}
    100%{background-position:200%}
}
 .loading-sprite {
   height: 50px;
   width: 50px;
   background-image: url("../../static/spritesheet.png");
   background-size: 100px;
   background-repeat: no-repeat;
   animation: walk .8s steps(2) infinite;
   margin: 0 auto;
 }
 opacity: .6;
 text-align: center;
 font-size: 12px;
 text-transform: uppercase;
 ${props => props.theme.fontBold}
 color: #999;
`;

export default LoadingStyles;
