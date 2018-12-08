import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border-radius: 25px;
  padding: 2px;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? '#4FB847' : 'white')};
  color: ${props => (props.isDragging ? 'white' : 'inherit')};
  width: fit-content;
`;

export default class Field extends React.Component {
  render() {
    return (
      <Draggable 
        draggableId={this.props.measure.id}
        index={this.props.index}
      >
      {
        (provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.measure.content}
          </Container>
        )
      }
      </Draggable>
    )
  }
}