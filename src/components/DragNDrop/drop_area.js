import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import ExtensionIcons from './images';

const Container = styled.div`
  border: ${props => (props.isDraggingOver ? '2px solid rgba(208, 2, 27, 0.4)' : props.areaRequired ? '2px solid rgba(70, 130, 180, 0.6)' : '2px dashed lightgrey')};
  border-radius: 2px;
  padding: 4px;
  display: inline-block;
  width: 53px;
  height: 70px;
  margin: 3px;
  vertical-align: top;
`;

const MeasureIcon = styled.img`
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 8px;
  margin-top: 8px;
  height: 17px;
`;

const MeasureTitle = styled.p`
  text-align: center;
  font-size: 11px;
`;

export default class DropArea extends React.Component {
  render() {
    return (
      <Droppable droppableId={this.props.area.id}>
        {(provided, snapshot) => (
          <Container
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            areaRequired={this.props.area.required}
          >
            <MeasureIcon src={ExtensionIcons[this.props.area.icon]} alt="" />
            <MeasureTitle>{this.props.area.title}</MeasureTitle>
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    );
  }
}