import styled from 'styled-components';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {auth,provider} from '../firebase';
import {useEffect} from 'react';
import {selectUserName,selectUserPhoto,setUserLoginDetails,setSignOutState} from '../features/user/userSlice'
import React from 'react'

function Header(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const username = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto)
    // const userPhoto = useSelector(selectUserPhoto)

    useEffect(()=>{
        auth.onAuthStateChanged(async(user)=>{
            if(user){
                setUser(user)
                history.push('/home')
            }
        })
    },[username])
    const handleAuth = ()=>{
        if(!username){
            auth.signInWithPopup(provider).then((result)=>{
                setUser(result.user);
                console.log(result);
            }).catch((error)=>{
                alert(error.message)
            })
        }else if(username){
            auth.signOut().then(()=>{
                dispatch(setSignOutState())
                history.push('/');

            }).catch((err)=>{
                alert(err.message)
            })
        }
    }

    const setUser  = (user) =>{
        dispatch(setUserLoginDetails({
            name:user.displayName,
            email:user.email,
            photo:user.photoURL,
        }))
    };


    return (
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="Disney+"></img>
            </Logo>

            {
                !username?(
                <Login onClick={handleAuth}>Login</Login>)
                :
                (<>
                    <NavMenu> 
                        <a href="/home">
                            <img src="/images/home-icon.svg" alt="home"/>
                            <span>Home</span>
                        </a> 
                        <a href="/search">
                            <img src="/images/search-icon.svg" alt="home"/>
                            <span>Search</span>
                        </a> 
                        <a href="/watchlist">
                            <img src="/images/watchlist-icon.svg" alt="home"/>
                            <span>Watchlist</span>
                        </a> 
                        <a href="/orignals">
                            <img src="/images/original-icon.svg" alt="home"/>
                            <span>Orignals</span>
                        </a> 
                        <a href="/movies">
                            <img src="/images/movie-icon.svg" alt="home"/>
                            <span>Movies</span>
                        </a> 
                        <a href="/series">
                            <img src="/images/series-icon.svg" alt="home"/>
                            <span>Series</span>
                        </a> 
                    </NavMenu>
                    <SignOut>
                        <UserImg src={userPhoto} alt={username} ></UserImg>   
                        <DropDown>
                            <span onClick={handleAuth}>Sign Out</span>
                        </DropDown>
                    </SignOut>
                </>)
                

            }
            
        </Nav>
    )
}

const Nav = styled.nav`
    position:fixed;
    top:0;
    left:0;
    right:0;
    height:70px;
    background-color:#090b13;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 36px;
    z-index:2;
`
const Logo = styled.a`
    width:90px;
    margin-top:4px;
    max-height:70px;
    font-size:0;
    display:inline-block;
    img{
        display:block;
        width:100%;

    }

`

const NavMenu = styled.div`
    display: flex;
    align-items:center;
    flex-flow:row nowrap;
    height:100%;
    justify-content:flex-end;
    margin:0;
    pading:0;
    position:relative;
    margin-right:auto;
    margin-left:25px;

    a{
        display:flex;
        align-items:center;
        padding:0 12px;

        img{
            height:20px;
            min-width:20px;
            width:10px;
            z-index:auto;    
        }
        span{
            color:rgb(249,249,249);
            font-size:13px;
            letter-spacing:1.42px;
            line-height:1rem;
            white-space:nowrap;
            position:relative;
            margin:4px;
            margin-top:7px;


            &:before{
                background-color:rgb(249,249,249);
                border-radius:0px 0px 4px 4px;
                bottom: -6px;
                content:"";
                height:2px;
                left:0;
                opacity:0;
                position:absolute;
                right:0px;
                transform-origin:left center;
                transform:scaleX(0);
                transition:all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
                visibility:hidden;
                width:auto;   
            }
            
        }

        &:hover{
            span:before{
                transform:scaleX(1);
                visibility:visible;
                opacity:1 !important;
            }
        }
    }

    

   @media(max-width:768px){
       display:none
   } 

`

const Login = styled.a`
    border: 1px solid #f9f9f9;
    background-color:rgba(0,0,0,0.6);
    padding:0.8rem;
    text-transform:uppercase;
    letter-spacing:1px;
    border-radius:4px;
   transition:all .2s ease-out;

   &:hover{
       background-color:#f9f9f9;
       color:black;
       cursor:pointer;
       border-color:transparent;
   }
`
const UserImg = styled.img`
    height:100%;

`

const DropDown = styled.div`
    position:absolute;
    top:52px;
    right:20px;
    background: rgb(19,19,19);
    border: 1px solid rgba(151,151,151,0.34);
    border-radius:4px;
    box-shadow:rgb(0 0 0/50%) 0px 0px 18px 0px;
    padding:10px;
    font-size:14px;
    width:100px;
    opacity:0;

`
const SignOut = styled.div`
    position:relative;
    height:48px;
    width:48px;
    display:flex;
    cursor:pointer;
    align-items:center;
    justify-content:center;

   ${UserImg}{
    border-radius:50%;
    width:100%;
    height:100%;
   }

   &:hover{
       ${DropDown}{
           opacity:1;
           transition-duration:1s;
       }
   }

`

export default Header
