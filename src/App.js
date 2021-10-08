import "./styles.css";
import React from "react";
import styled from "styled-components";
import s from "csd";

const StyledTabIndicator = styled.div`
  position: absolute;
  width: ${(props) => 100 / props.tabCount}%;
  top: 100%;
  left: 0;

  transform: translate(${(props) => props.offset}, -100%);

  transition: transform ${(props) => props.duration}ms;

  border-top-style: solid;
  border-top-width: 1px;
`;

const StyledTab = styled.li`
  flex: 1;
  height: 100%;

  button {
    cursor: pointer;
    transition: color 0.3s;
    color: ${(props) => (props.isFocused ? "#000" : "#777")};
    border: none;
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0);
  }
`;

const Tab = ({ title, onClick, isFocused }) => {
  return (
    <StyledTab onClick={onClick} isFocused={isFocused}>
      <button>{title}</button>
    </StyledTab>
  );
};

const StyledTabs = styled.div`
  position: relative;
  list-style: none;
  height: 30px;
  ${s.row}
`;

const Tabs = ({ focusedIdx, children, onChange, duration = 300 }) => {
  return (
    <StyledTabs>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          key: i,
          isFocused: focusedIdx === i,
          onClick: (e) => {
            onChange(i);
          }
        })
      )}
      <StyledTabIndicator
        duration={duration}
        tabCount={children.length}
        offset={`${100 * focusedIdx}%`}
      />
    </StyledTabs>
  );
};
const StyledOuterSliders = styled.div`
  overflow: hidden;
`;
const StyledSliders = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  width: 100%;

  transform: translateX(${(props) => `${props.offset}%`});
  transition: transform ${(props) => props.duration}ms;

  div {
    flex-shrink: 0;
    width: 100%;
  }
`;

const Sliders = ({ focusedIdx, children, duration = 300 }) => {
  const offset = -100 * focusedIdx;

  return (
    <StyledOuterSliders>
      <StyledSliders offset={offset} duration={duration}>
        {children}
      </StyledSliders>
    </StyledOuterSliders>
  );
};

const Pane1 = () => {
  return <div>1</div>;
};
const Pane2 = () => {
  return <div>2</div>;
};
const Pane3 = () => {
  return <div>3</div>;
};

export default function App() {
  const [focusedIdx, setFocusedIdx] = React.useState(0);

  return (
    <div className="App">
      <Tabs focusedIdx={focusedIdx} onChange={setFocusedIdx}>
        <Tab title="tab1" />
        <Tab title="tab2" />
        <Tab title="tab3" />
      </Tabs>
      <Sliders focusedIdx={focusedIdx}>
        <Pane1 />
        <Pane2 />
        <Pane3 />
      </Sliders>
    </div>
  );
}
