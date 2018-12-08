import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Field from './field';
import DropArea from './drop_area'
import ExtensionIcons from './images';

import Close from '@material-ui/icons/Close';

import { SearchInput } from './../Configuration/CustomizeUIElements';

const Container = styled.div`
  margin: 2px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: 350px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const FieldList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  overflow: auto;
`;

const MeasuresContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
`;

const MeasureIcon = styled.img`
  display: inline-block;
  height: 12px;
  width: 12px;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 2px;
`;

const SelectedMeasures = styled.p`
  margin-bottom: 4px;
  font-size: 10px;
`;

const SelectedMeasuresContainer = styled.div`
  overflow: auto;
`;

const iconStyle = { 
  float: 'right', 
  fontSize: 12 + 'px', 
  marginRight: 8 + 'px', 
  marginTop: 3 + 'px', 
  cursor: 'pointer' 
};

const MeasureSwitchButton = styled.button`
  margin-bottom: 8px;
  margin-left: 4px;
  border-radius: 2px;
  border: 1px solid ${props => (props.active ? 'rgb(83, 189, 146)' : 'lightgray')};
  background: ${props => (props.active ? 'rgb(83, 189, 146)' : 'none')};
  color: ${props => (props.active ? 'white' : 'initial')};
  font-weight: ${props => (props.active ? 700 : 'normal')};
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  outline: none;
`;

export default class Column extends React.Component {
  constructor(props) {
    super(props);
    
    this.removeMeasure = this.removeMeasure.bind(this);
    this.filterMeasureByName = this.filterMeasureByName.bind(this);
    this.onMeasureSwitchClicked = this.onMeasureSwitchClicked.bind(this);
    this.filterMeasureBySheet = this.filterMeasureBySheet.bind(this);

    this.state = {
      filteredMeasures: this.filterMeasureBySheet('config'),
      selectedSheet: 'config'
    }
  }
  
  removeMeasure = (event) => {
    this.props.removeSelectedMeasure(event.target.id);
  }

  filterMeasureByName = (event) => {
    let searchValue = event.target.value;

    if (searchValue.length === 0) {
      this.setState({ filteredMeasures: this.filterMeasureBySheet(this.state.selectedSheet) })
    } else {
      let filteredList = this.state.filteredMeasures.filter(item => {
        if (item.content.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
          return true;
        }
        return false;
      });
  
      this.setState({ filteredMeasures: filteredList })
    }
  }

  filterMeasureBySheet = (selectedSheet) => {
    let filteredList = this.props.fields.filter(item => {
      if (item.sheet === selectedSheet) {
        return true;
      }
      return false;
    });
    return filteredList;
  }

  onMeasureSwitchClicked = (event) => {
    let selectedSheet = event.target.getAttribute('data-tag');

    let filteredList = this.filterMeasureBySheet(selectedSheet);

    this.setState({ selectedSheet: selectedSheet, filteredMeasures: filteredList })
  }

  render() {
    return (
      <Container type={this.props.type}>
        <Title>
          { this.props.column.title }
        </Title>
        {
          this.props.type === 'measures'
          &&
          <Droppable droppableId={this.props.column.id}>
            {(provided, snapshot) => (
              <FieldList
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {/* <MeasureSwitchButton 
                  active={this.state.selectedSheet === 'mark'} 
                  data-tag="mark"
                  onClick={this.onMeasureSwitchClicked}> Mark sheet
                </MeasureSwitchButton>
                <MeasureSwitchButton 
                  active={this.state.selectedSheet === 'choro'} 
                  data-tag="choro"
                  onClick={this.onMeasureSwitchClicked}> Choro sheet
                </MeasureSwitchButton> */}
                <SearchInput placeholder="Search field" onChange={this.filterMeasureByName} />
                {this.state.filteredMeasures.map((measure, index) => <Field key={measure.id} measure={measure} index={index} />)}
                {provided.placeholder}
              </FieldList>
            )}
          </Droppable>
        }
        {
          this.props.type === 'options'
          &&
          (
            <React.Fragment>
              <MeasuresContainer>
                {this.props.dropAreas.map(area => (<DropArea key={area.id} area={area} />))}
              </MeasuresContainer>
              <SelectedMeasuresContainer>
              { 
                this.props.dropAreas.map(area => (
                  area.measureId 
                  &&
                  <SelectedMeasures key={area.id}>
                    <MeasureIcon src={ExtensionIcons[area.icon]} alt="" />
                    <span>{this.props.fields.filter(item => area.measureId === item.id)[0].content}</span>
                    <Close 
                      color="error" 
                      style={iconStyle} 
                      id={area.id}
                      onClick={this.removeMeasure}
                    />
                  </SelectedMeasures>
                ))
              }
              </SelectedMeasuresContainer>
            </React.Fragment>
          )
        }
      </Container>
    );
    
  }
}