import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
  type SearchBarProps = {
    getMovies : (searchString? : string | null)  => void
  }

  const SearchBarContainer  = styled.div`
    width : 50%;
    background-color : #ffffff;
    margin : 0 auto;
    margin-bottom : 2%;
    border : solid 1px #555555;
    border-radius : 10px;
    height : 40px;
    .MuiInputBase-root{
      width : 80%;
      margin-top: -4px
    }
    .MuiButtonBase-root{
      margin-top: -3px
    }

    @media (max-width: 599px) {
      width : 100%;

   }
  `

//SearchBar
class SearchBar extends React.Component<SearchBarProps, any>{
  constructor(props : SearchBarProps) {
     super(props);
     this.state = {
       value: ""
     };
    }
  handleClose = () => {
    this.setState({
      value : ""
    })
    this.props.getMovies('')
  }
  handleChange = (newValue : string) => {
    this.setState({
      value : newValue
    })
    this.props.getMovies(newValue)
  }
  render() {
    return (
      <SearchBarContainer>
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(event) => {this.handleChange(event.target.value)}}
            value={this.state.value}
          />
          <IconButton aria-label="close"  onClick={this.handleClose}>
            <CloseIcon />
          </IconButton>
      </SearchBarContainer>
      )
  }
}


export default SearchBar;
