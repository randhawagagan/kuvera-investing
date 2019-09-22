import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Header, Card, Icon, Grid, GridColumn, Input, Divider, Segment, Menu, Button} from 'semantic-ui-react';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import DetailComponent from './components/DetailComponent'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      funds : [], 
      filteredFunds: []
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.sortBycategory = this.sortBycategory.bind(this);
    this.sortBy3y = this.sortBy3y.bind(this);
    this.sortByPlan = this.sortByPlan.bind(this);
  }
 
  handleSearch = event => {
    event.preventDefault();
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.funds.filter(element => {
        if(query !== ''){
          return element.name.toLowerCase().includes(query.toLowerCase());
        }
        return prevState.funds;
      });
      return{
        filteredFunds: filteredData
      }
    }); 
  };

  sortBycategory = (e) => {
 
      e.preventDefault()
      const myData = [].concat(this.state.funds)
      .sort((a, b) => a.category.localeCompare(b.category));
      this.setState({
        filteredFunds: myData
      });
    }

    sortBy3y = (e) => {
 
      e.preventDefault()
      const myData = [].concat(this.state.funds)
      .sort((a, b) => a.returns.year_3 - b.returns.year_3);
      this.setState({
        filteredFunds: myData
      });
    }

    sortByPlan = (e) => {
 
      e.preventDefault()
      const myData = [].concat(this.state.funds)
      .sort((a, b) => a.plan.localeCompare(b.plan));
      this.setState({
        filteredFunds: myData
      });
    }
  

    componentDidMount(){
    const reducedData = [];
          fetch(`https://api.kuvera.in/api/v3/funds.json`)
        .then(response => response.json())
        .then(data =>{
            data.forEach(fulldata => {
                if (reducedData.length < 100) {
                 reducedData.push(fulldata);
                }
                 });
             this.setState({
                  funds:reducedData, 
                  filteredFunds: reducedData
               })
        })
      }

    _displayFundsView = () => {
      
       return this.state.filteredFunds.map(
        fundsData => (<Card centered color='green'>
           <Card.Content>
                <Card.Header>{
                  <NavLink to={{
                    pathname: "/detail/",
                    state: {
                      code : {fundsData}
                    }
                  }} exact activeStyle={{color: 'green'}}>
                  {fundsData.name}
                  </NavLink>
                  }</Card.Header>
             <Card.Content extra>
                {
                <section className="container">
                  <div className="one">
                    <h3>{fundsData.fund_type}</h3>
                </div>
                <div className="two">
                      {fundsData.plan}
                </div>
                </section>
                }
             </Card.Content>
             <Card.Description>{fundsData.fund_category}</Card.Description>
             <Card.Content extra>
                <Segment>
                <Grid columns={2} relaxed='very'>
                  <GridColumn>
                  1 Year {fundsData.returns.year_1}
                    </GridColumn>              
                  <GridColumn>
                  3 Year {fundsData.returns.year_3}
                    </GridColumn>             
                    </Grid>
                    <Divider vertical><Icon name='angle double up'/><Icon name='angle double down'/></Divider>
                  </Segment>
             </Card.Content>
           </Card.Content>
         </Card>)
      );        
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
   
    return (
      
      <Router>
        <div >
     <Route path="/" exact strict render={
       () => {
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
          onClick={this.handleItemClick}
        >
          Set Goal
        </Menu.Item>

        <Menu.Item
          name='Features'
          onClick={this.handleItemClick}
        >
          Features
        </Menu.Item>
      </Menu>
         <div className="">
           <Container>
             <Header>
             <Grid columns='equal'>
             <Grid.Row>
      <Grid.Column>
        <Segment>
        <Input
             size="small"
             icon='usd'
             iconPosition='left'
             label={{ tag: true, content: 'Mutual Funds' }}
             labelPosition='right'
             placeholder='Narrow Your Search'
             onChange={this.handleSearch}
               />
        </Segment>
      </Grid.Column>
      <Grid.Column>
      <Grid.Row>
        <Segment clearing>
        SORT BY 
        <Button.Group floated='right'>
    <Button  basic color='green'  onClick={this.sortBycategory}>
      Category
    </Button>
    <Button basic color='green' onClick={this.sortBy3y}>
      3Y Returns
    </Button>
    <Button basic color='green' onClick={this.sortByPlan}>
      Plan
    </Button>
  </Button.Group>
        </Segment>
        </Grid.Row>
      </Grid.Column>
    </Grid.Row>
           </Grid>
             </Header>
           <Card.Group>
     {this._displayFundsView()}
       </Card.Group>
           </Container>
         </div>
          </div>
         )
       }
     }>

     </Route>
     <Route path="/detail/" exact strict component={DetailComponent}>

     </Route>
      </div>
      </Router>
    );
  }
}


export default App;
