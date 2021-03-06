import API from "../../utils/API";
import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Container, Column } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn, ClearBtn } from "../../components/Form";

class Home extends Component {
  state = {
    articles: [],
    savedArticles: [],
    title: "",
    number: "",
    beginDate: "",
    endDate: ""
  };

  handleInputs = (e) => {
    const {value, name} = e.target;
    this.setState({
      [name]: value
    })
  }

  clearSearch = (e) => {
    e.preventDefault();
    this.setState({
      articles: []
    });
  }

  getSearch = (e) => {
    e.preventDefault();
    const {title, number, beginDate, endDate} = this.state;
    API.searchArticles(title, number, beginDate, endDate).then(data => {
      this.setState({
        articles: data.data.response.docs
      });
    });
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron>New York Times Archives</Jumbotron>
        <Container>
        <Column width={'30%'} float={'left'}>
          <form>
            <Input name="title" value={this.state.title} onChange={this.handleInputs} label="Title Search" placeholder="Title" />
            <Input name="beginDate" value={this.state.beginDate} onChange={this.handleInputs} label="Start Year (Optional)" placeholder="YYYYMMDD" />
            <Input name="endDate" value={this.state.endDate} onChange={this.handleInputs} label="End Year (Optional)" placeholder="YYYYMMDD" />
            <FormBtn onClick={this.getSearch}> Get New Articles </FormBtn>
            <ClearBtn onClick={this.clearSearch}> Clear Articles </ClearBtn>
          </form>
        </Column>
        </Container>
        <Column float={'right'}>
        <Container>
          <h3 style={{fontFamily: 'Abril Fatface', fontSize: '2rem'}}>Search Results: </h3>
        {this.state.articles.length ? (
              <List>
                {this.state.articles.map((article, i) => (
                  <ListItem key={article._id} id={article._id} date={article.pub_date}>
                    <a href={article.web_url}>{article.headline.main}</a>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3 style={{fontSize: '1rem', fontFamily: 'sans-serif'}}>No Search Results to Display</h3>
            )}
        </Container>
        </Column>
      </Container>

    );
  }
}

export default Home;
