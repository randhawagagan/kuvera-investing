import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Container, Header, Card, Icon, Grid, GridColumn, Input, Divider, Segment} from 'semantic-ui-react';
class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      funds : [], 
      filteredFunds: []
    }
    this.handleSearch = this.handleSearch.bind(this);
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
               <a>
                 {fundsData.name}
               </a>}</Card.Header>
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

  render() {
   
    return (
      <div >
      <Header  className='App-header' >
         <h3 className="App-white">KUVERA</h3>
      </Header>
        <div className="">
          <Container>
            <Header>
            <Grid>
            <GridColumn>
            <Input
            icon='usd'
            iconPosition='left'
            label={{ tag: true, content: 'Mutual Funds' }}
            labelPosition='right'
            placeholder='Narrow Your Search'
            onChange={this.handleSearch}
              />
            </GridColumn>
          </Grid>
            </Header>
          <Card.Group>
    {this._displayFundsView()}
      </Card.Group>
          </Container>
        </div>
      </div>
    );
  }
}


export default App;
