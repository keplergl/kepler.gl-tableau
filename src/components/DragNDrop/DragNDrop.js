import React from 'react';
import Column from './column';
import { DragDropContext } from 'react-beautiful-dnd';

import '@atlaskit/css-reset';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

class DragNDrop extends React.Component {

  state = this.props.initialData;

  handleClick = (field, val) => {
    console.log('handleClick', field, val);
    this.props.configCallBack(field,val);
  }

  onDragStart = () => {}

  onDragUpdate = update => {}

  onDragEnd = result => {
    console.log('drag end', result, this.props);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumn = this.state.drop_area[source.droppableId];
    const finishColumn = this.state.drop_area[destination.droppableId];

    if (startColumn === finishColumn) {
      return;
    }

    if (finishColumn.type === 'single_drop') {
      const newState = {
        ...this.state,
        drop_area: {
          ...this.state.drop_area,
          [finishColumn.id]: { 
            ...this.state.drop_area[finishColumn.id],
            measureId: draggableId
          }
        }
      };
      
      this.setState(newState, () => {console.log('Current state:', this.state)});
      this.handleClick(destination.droppableId,draggableId);
    }

    return;
  }

  removeSelectedMeasure = (idToRemove) => {
    this.props.eraseCallBack(idToRemove);

    const newState = {
      ...this.state,
      drop_area: {
        ...this.state.drop_area,
        [idToRemove]: {
          ...this.state.drop_area[idToRemove],
          measureId: null
        }
      }
    }
    this.setState(newState);
  }

  render() {
    return (
      <React.Fragment>
        <div class="content-container">
          <h4 style={{color: "#BDBDBD"}}>{this.props.title}</h4>
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
            onDragEnd={this.onDragEnd}
          >
            <Container>
            {
              this.state.columnOrder.map(columnId => {
                const column = this.state.columns[columnId];
                let measures = [];
                let dropAreas = [];
                const fields = this.state.measures;
                if (column.type === 'measures') {
                  measures = column.measures.map(measureId => this.state.measures.filter(item => item.id === measureId)[0])
                } else if (column.type === 'options') {
                  dropAreas = column.areaIds.map(areaId => this.state.drop_area[areaId])
                }

                return (
                  <Column 
                    key={column.id} 
                    column={column} 
                    measures={measures} 
                    dropAreas={dropAreas}
                    fields={fields}
                    type={column.type} 
                    removeSelectedMeasure={this.removeSelectedMeasure}  
                  />);
              })
            }
            </Container>
          </DragDropContext>
        </div>
      </React.Fragment>
    )
  }
}

export default DragNDrop;

