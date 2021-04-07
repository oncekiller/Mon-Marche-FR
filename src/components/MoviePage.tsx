import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';


interface MoviePageElementProps {
   isdarkmode: boolean;
}

const Title = styled('h2')<MoviePageElementProps>`
  color: ${props => props.isdarkmode ? "#ffffff" : "#000000"};
  margin-right : 5%;
  @media (max-width: 599px) {
    font-size : 18px
 }
`

const Description = styled('p')<MoviePageElementProps>`
  color: ${props => props.isdarkmode ? "#ffffff" : "#000000"};
  margin-right : 5%;
  @media (max-width: 599px) {
    font-size : 14px
 }
`

const Rate = styled('p')<MoviePageElementProps>`
  color: ${props => props.isdarkmode ? "#ffffff" : "#000000"};
  @media (max-width: 599px) {
    font-size : 14px
 }
`

const Icon = styled.img`
  width : 100%;
  @media (max-width: 599px) {
    width : 70%;
    margin-left : 15%;
    margin-top : 5%;
 }

`

const MoviePageContainer = styled(Dialog)<MoviePageElementProps>`
  .MuiPaper-root {
    background-color: ${props => props.isdarkmode ? "#808B96" : "#ffffff"};
  }
  .MuiGrid-root{
    @media (max-width: 599px) {
      display : block
   }
  }
`
type MoviePage = {
  title : string
  description : string
  rate : string
  iconUrl : string
  isOpen : boolean
  handlePopupClose : () => void
  isDarkMode : boolean
}


//Movie Popup Page
function MoviePage({title, description, rate, iconUrl , isOpen , handlePopupClose , isDarkMode}: MoviePage){

  return (
    <MoviePageContainer
      open={isOpen}
      onClose={handlePopupClose}
      maxWidth={"lg"}
      aria-labelledby="responsive-dialog-title"
      isdarkmode={isDarkMode}
    >
      <DialogTitle>
        <IconButton aria-label="close"  onClick={handlePopupClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="row">
          <Grid item  xs={12} sm={8}>
            <Title isdarkmode={isDarkMode}>{title}</Title>
            <Description isdarkmode={isDarkMode}>{description}</Description>
            <Rate isdarkmode={isDarkMode}>{rate}/10</Rate>
          </Grid>
          <Grid item xs={12} sm={4}>
              <Icon src={iconUrl}/>
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </MoviePageContainer>
  );

}

export default MoviePage;
