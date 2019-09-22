import React, { Component } from 'react';
import '../App.css';
import logo from '../logo.svg';
import { Container, Header, Card, Grid, GridColumn, Menu, Divider, Segment, Icon} from 'semantic-ui-react';

class DetailComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
    props,
    funddetail : {}
    }
  }

    componentDidMount(){
    const url = "https://api.kuvera.in/api/v3/funds/"+this.state.props.location.state.code.fundsData.code +".json"
          fetch(url)
        .then(response => response.json())
        .then(data =>{
             this.setState({
                 funddetail: data[0]
               })
        })
      }

  render() {
   
    return (
      <div>
      <Menu stackable>
          <Menu.Item>
            <img alt="" size="large" src={logo} />
          </Menu.Item>
          <Menu.Item
            name='Explore'
            active={this.state.activeItem === 'Explore'}
            onClick={this.handleItemClick}
          >
            Explore
          </Menu.Item>
          <Menu.Item
            name=' SetGoal'
            //active={activeItem === ' SetGoal'}
            onClick={this.handleItemClick}
          >
            Set Goal
          </Menu.Item>
          <Menu.Item
            name='Features'
            //active={activeItem === 'Features'}
            onClick={this.handleItemClick}
          >
            Features
          </Menu.Item>
        </Menu>
           <div className="">
             <Container>
               <Header>
               <Grid>
               <GridColumn>
               </GridColumn>
             </Grid>
               </Header>
         <Card fluid color="red"
    header={this.state.funddetail.name}
    meta={this.state.funddetail.fund_category}
    description={this.state.funddetail.investment_objective}
    extra={
      <Segment>
                <Grid columns={2} relaxed='very'>
                  <GridColumn>
                  Face value  {this.state.funddetail.face_value}
                    </GridColumn>              
                  <GridColumn>
                  Expense Ratio {this.state.funddetail.expense_ratio}
                    </GridColumn>             
                    </Grid>
                    <Divider vertical><Icon name='chart line'/></Divider>
                  </Segment>
      }
  />
             </Container>
           </div>
            </div>
    );
  }
}


export default DetailComponent;
