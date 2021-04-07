
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components'
import MoviePage from './MoviePage'
import SearchBar from './SearchBar'
import imageEmpty from '../assets/image_empty.jpg'

interface ContainerProps {
   isDarkMode: boolean;
}

interface HomePageMoviePanelState  {
  apiKey: string
  selectedMovieTitle : string
  selectedMovieDescription : string
  selectedMovieRate: string
  selectedMovieIconUrl : string
  isMoviePageOpen: boolean
  dataMovies  : string[]
  isDarkMode : boolean
}

interface MoviePanelProps {
  id : string
  title : string
  description : string
  rate : string
  iconUrl : string
  handlePopupOpen : (id: string, title : string, description : string, rate : string, iconUrl : string) => void
}


interface HeadBarProps {
  handleDarkMode : () => void
  isDarkMode: boolean
}


interface HeadBarContainerProps {
  isDarkMode: boolean;
}

const ImgageMoviePanel  = styled.img`
  width : 100%;
`

const TitleMoviePanel = styled.h4`
  display : none;
  position: absolute;
  width : 100%;
  padding-top : 20px;
  padding-bottom : 20px;
  color : #ffffff
`

const Container = styled("div")<ContainerProps>`
  padding-left : 20%;
  padding-right : 20%;
  padding-top : 20px;
  min-height : 94.9vh;
  background-color: ${props => props.isDarkMode ? "#808B96" : "#ffffff"};
  @media (max-width: 959px) {
    padding-left : 5%;
    padding-right : 5%;
 }
 .MuiGrid-item{
   margin-bottom : 0.2vw;
   padding-left : 0.2vw;
    padding-right : 0.2vw;
    &:hover{
      ${TitleMoviePanel}{
        display: block;
        background-color : rgba(0, 0,0, 0.8);
      }
    }
 }


`
const ContainerTitleMoviePanel =  styled.div`
  position : relative;
  top : 10%;
`
const HeadBarContainer = styled("div")<HeadBarContainerProps>`
  background-color: ${props => props.isDarkMode ? "#34495E" : "#3498DB"};
  height : 26px;
  padding-top : 10px;
  padding-bottom : 10px;
`

const TitleHeadBar = styled.h2`
  text-align : center;
  margin-top : -5px;
  color: #ffffff

`

const CheckBoxWrapper = styled.div`
  position: relative;
  margin-top : -47px;
  margin-right : 3%;
  width : fit-content;
  float : right;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #3498DB;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;



//HeadBar HomePage
const HeadBar = (props : HeadBarProps) => {
  return(
    <HeadBarContainer isDarkMode={props.isDarkMode}>
        <TitleHeadBar>Movies</TitleHeadBar>
        <CheckBoxWrapper >
            <CheckBox id="checkbox" type="checkbox" onClick={() => {props.handleDarkMode()}} />
            <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>

    </HeadBarContainer>
  )
}

//Panel Movie HomePage
const MoviePanel = (props : MoviePanelProps) => {
  var imageUrl = ""
  if (props.iconUrl != null) {
    imageUrl = "https://image.tmdb.org/t/p/original" + props.iconUrl
  }else{
    imageUrl = imageEmpty
  }

    return(
      <Grid item xs={4} md={3} lg={2} onClick={() => {props.handlePopupOpen(props.id , props.title, props.description, props.rate, imageUrl )}} >
        <ContainerTitleMoviePanel>
          <TitleMoviePanel className={"titleMoviePanel"}>{props.title}</TitleMoviePanel>
        </ContainerTitleMoviePanel>
        <ImgageMoviePanel src={imageUrl}/>
      </Grid>
    )
}

//HomePage
class HomePageMoviePanel extends Component<any, HomePageMoviePanelState>{

  //Manage Popup Movie Page close
  handlePopupClose = () => {
    this.setState({
      isMoviePageOpen : false
    })
  }

  //Manage Popup Movie Page close
  handlePopupOpen = (id: string, title : string, description : string, rate : string, iconUrl : string) => {
    this.setState({
      selectedMovieTitle : title,
      selectedMovieDescription : description,
      selectedMovieRate : rate,
      selectedMovieIconUrl : iconUrl,
      isMoviePageOpen : true,
    })
  }

  constructor(props : any){
    super(props)
    this.state = {
      apiKey : 'fe63c37b434784a3de401fb51951d553',
      dataMovies : [],
      isMoviePageOpen : false,
      selectedMovieTitle : '',
      selectedMovieDescription : '',
      selectedMovieRate: '',
      selectedMovieIconUrl : '',
      isDarkMode : false,
    }
  }

  handleDarkMode = () => {
    if (this.state.isDarkMode) {
      this.setState({
        isDarkMode : false
      })
    }else{
      this.setState({
        isDarkMode : true
      })
    }
  }

  //Get Movies base on research bar value

  getMovies = (searchString? : string | null) => {
    var url = ''
    if (searchString == null || searchString == ''){
      url = "https://api.themoviedb.org/3/movie/popular?api_key="+this.state.apiKey +"&language=en-US&page=1"
    }else{
      url = "https://api.themoviedb.org/3/search/movie?api_key="+this.state.apiKey +"&language=en-US&query="+ searchString +"&page=1"
    }
    fetch(url,{
      method: "get",
      headers: {
      'Content-Type': 'application/json',
      'accept' : 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        dataMovies: res.results
      })
     })

  }

  componentDidMount() {
    this.getMovies()
  }

  render() {
    return(
      <div>
        <HeadBar isDarkMode={this.state.isDarkMode} handleDarkMode = {this.handleDarkMode}/>
        <Container isDarkMode={this.state.isDarkMode}>
          <SearchBar getMovies={this.getMovies}/>
          <MoviePage isOpen={this.state.isMoviePageOpen} handlePopupClose={this.handlePopupClose} title={this.state.selectedMovieTitle} description={this.state.selectedMovieDescription} rate={this.state.selectedMovieRate} iconUrl={this.state.selectedMovieIconUrl} isDarkMode={this.state.isDarkMode} />
          <Grid container direction='row'   >
            {this.state.dataMovies.map((movie : any, key) => {
                return(
                      <MoviePanel key={key} id={movie.id} title={movie.title} description= {movie.overview} rate = {movie.vote_average} iconUrl={movie.poster_path} handlePopupOpen={this.handlePopupOpen}  />
                )
            })}
          </Grid>
        </Container>
      </div>
      )
  }
}


export default HomePageMoviePanel
