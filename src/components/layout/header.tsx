'use client'
import * as React from 'react';

import {
  styled, alpha, AppBar, Box, Toolbar, IconButton, Typography, InputBase, MenuItem, Menu,
  Avatar, FormControlLabel, FormGroup, Switch, Container
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import NightlifeOutlinedIcon from '@mui/icons-material/NightlifeOutlined';
import LyricsOutlinedIcon from '@mui/icons-material/LyricsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import Link from 'next/link';
import { ThemeContext } from '../theme-registry/theme.registry';
import { useRouter } from 'next/navigation';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
  },
}));

const pages = ['Playlists', 'Likes', 'Upload'];
export default function HeaderAppBar() {
  const router = useRouter();
  const { toggleTheme, mode } = React.useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: theme.palette.background.default,
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            theme.palette.text.primary,
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.text.primary,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      // backgroundColor: theme.palette.mode === 'dark' ? "#F1F1F2" : "#1E1F26",
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          'theme.palette.background.paper',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: 'theme.palette.background.paper',
      borderRadius: 20 / 2,
    },
  }));
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={isMenuOpen}
      onClose={handleMenuClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            backgroundColor: 'info.main',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.info',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >

      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu

      anchorEl={mobileMoreAnchorEl}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            backgroundColor: 'info.main',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.info',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem sx={{
        display: "flex", alignItems: "center", "> a": {
          color: 'inherit',
          textDecoration: "unset"
        }
      }}>
        <Link href='/playlist'>
          <LyricsOutlinedIcon sx={{
            marginRight: '10px', "> a": {
              color: 'inherit',
              textDecoration: "unset"
            }
          }} />
          Playlists
        </Link>
      </MenuItem>
      <MenuItem sx={{
        display: "flex", alignItems: "center", "> a": {
          color: 'inherit',
          textDecoration: "unset"
        }
      }}>
        <Link href='/likes' >
          <FavoriteBorderOutlinedIcon sx={{ marginRight: '10px' }} />
          Likes
        </Link>
      </MenuItem>
      <MenuItem sx={{
        display: "flex", alignItems: "center", "> a": {
          color: 'inherit',
          textDecoration: "unset"
        }
      }}>
        <Link href='/upload' >
          <CloudUploadOutlinedIcon sx={{ marginRight: '10px' }} />
          Upload
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt="" src="" sx={{
          color: "text.secondary",
          borderColor: 'text.secondary',
          borderStyle: 'solid',
          backgroundColor: 'info.main', // Màu nền
          '&:hover': {
            backgroundColor: '#C0AB84', // Màu khi hover
          },
        }} > <Typography>TX</Typography></Avatar>
        Profile
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'info.main' }}>
        <Container >
          <Toolbar sx={{
            color: 'text.primary', // Màu chữ tự động thay đổi theo theme
            "> a": {
              color: 'inherit',
              textDecoration: 'none',
            },
          }}
          >
            <Link href='/'>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => router.push('/')}
              >
                <NightlifeOutlinedIcon />
              </IconButton>
            </Link>
            <Link href='/'>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                SoundCloud
              </Typography>
            </Link>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            {/* right menu */}
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center', textAlign: 'center',
              "> a": {
                color: 'inherit',
                textDecoration: "unset"
              }
            }} >

              <Link href='/playlist'><Typography sx={{ minWidth: 100 }}>Playlists</Typography></Link>
              <Link href='/likes' ><Typography sx={{ minWidth: 100 }}>Likes</Typography></Link>
              <Link href='/upload'><Typography sx={{ minWidth: 100 }}>Upload</Typography></Link>
              <FormGroup>
                <FormControlLabel
                  control={<MaterialUISwitch sx={{ m: 1 }} checked={mode === "dark"} onChange={toggleTheme} />}
                  label={mode === "dark" ? "" : ""}
                />
              </FormGroup>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"

              >
                <Avatar alt="" src="" sx={{
                  color: "text.secondary",
                  borderColor: 'text.secondary',
                  borderStyle: 'solid',
                  backgroundColor: 'info.main', // Màu nền
                  '&:hover': {
                    backgroundColor: '#C0AB84', // Màu khi hover
                  },
                }} >TX</Avatar>
              </IconButton>
            </Box>
            {/* right menu mobie */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
