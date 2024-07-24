import React from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SimpleBar from 'simplebar-react';
import {
  Navbar,
  // Nav,
  // NavItem,
  // NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
   DropdownItem,
  Button,
  Label
} from 'reactstrap';
// import axios from 'axios';
// import { ErrorOutlineSharp } from '@material-ui/icons';
// import { MessageSquare } from 'react-feather';
// import * as Icon from 'react-feather';
// import LogoWhite from '../../assets/images/logos/logo.png';
// import MessageDD from './MessageDD';
// import MegaDD from './MegaDD';
// import NotificationDD from './NotificationDD';
import user1 from '../../assets/images/users/user1.jpg';
import Language from './Language';
// import api from '../../constants/api';
import { ToggleMiniSidebar, ToggleMobileSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';


const Header = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);

  // const [convertedText, setConvertedText] = useState('');
  // const [error, setError] = useState('');
  const dispatch = useDispatch();
  const logout=()=>{
    localStorage.clear()
    setTimeout(()=>{
      window.location.reload()
    },200)
  }
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();


 

  // Fetch translation when selectedLanguage or plannings changes
//   const fetchTranslation = async () => {
//     api.get('/translation/getTranslation')
//     .then((res) => {
//       res.data.data.forEach(async (cell) => {
//     if (!selectedLanguage) return; // Don't make API call if language not selected
//     try {
//       const response = await axios.post(
//         'https://translation.googleapis.com/language/translate/v2',
//         {},
//         {
//           params: {
//             q: cell.value,
//             target: "ar",
//             key: 'AIzaSyA_eJTEvBDRBHo8SYmq_2PyCh8s_Pl6It4' // Replace with your Google Translate API key
//           }
//         }
//       );
//       await api.post('/translation/editTranslationArb', {
//         translation_id: cell.translation_id,
//         arb_value1: response.data.data.translations[0].translatedText,
        
//       });
//       console.log('id',cell.translation_id)
//       console.log('trabsss',response.data.data.translations[0].translatedText)
//       setConvertedText(response.data.data.translations[0].translatedText);
//       setError('');
//     } catch (errors) {
//       setError('Translation failed. Please try again later.');
//       console.error('Translation error:', ErrorOutlineSharp);
//     }
//   })
// })
//   };

//   useEffect(() => {
//   fetchTranslation();
// }, [selectedLanguage]);

    
   
 

// console.log('convertedText',convertedText)

// console.log('error',error)

  return (
    <Navbar
      color={topbarColor}
      dark={!isDarkMode}
      light={isDarkMode}
      expand="lg"
      className="topbar"
    >
      {/******************************/}
      {/**********Toggle Buttons**********/}
      {/******************************/}
      <div className="d-flex align-items-center">
        <Button
          color={topbarColor}
          className="d-none d-lg-block"
          onClick={() => dispatch(ToggleMiniSidebar())}
        >
          <i className="bi bi-list" />
        </Button>
        {/* <NavbarBrand href="/" className="d-sm-block d-lg-none">
        <img src={LogoWhite} alt="Logo" className='w-50' />
          {/* <LogoWhite /> */}
        {/* </NavbarBrand> */}
        <Button
          color={topbarColor}
          className="d-sm-block d-lg-none"
          onClick={() => dispatch(ToggleMobileSidebar())}
        >
          <i className="bi bi-list" />
        </Button>
      </div>

      {/******************************/}
      {/**********Left Nav Bar**********/}
      {/******************************/}

      {/* <Nav className="me-auto d-none d-lg-flex" navbar> */}
        {/* <NavItem>
          <Link to="/starter" className="nav-link">
            Starter
          </Link>
        </NavItem> */}
       
        
       <Label className='text-white'>
            POS Demo
          </Label>
      {/* </Nav> */}
      {/******************************/}
      {/**********Notification DD**********/}
      {/******************************/}
      <div className="d-flex">
        {/******************************/}
        {/**********Mega DD**********/}
        {/******************************/}
        {/* <UncontrolledDropdown className="mega-dropdown mx-1">
          <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
            <Icon.Grid size={18} />
          </DropdownToggle>
          <DropdownMenu>
            <MegaDD />
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown>
          <DropdownToggle color={topbarColor}>
            <Icon.Bell size={18} />
          </DropdownToggle>
          <DropdownMenu className="ddWidth">
            <DropdownItem header>
              <span className="mb-0">Notifications</span>
            </DropdownItem>
            <DropdownItem divider />
            <SimpleBar style={{ maxHeight: '350px' }}>
              <NotificationDD />
            </SimpleBar> */}
            {/* <DropdownItem divider />
            <div className="p-2 px-3">
              <Button color="primary" size="sm" block>
                Check All
              </Button>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown> */}
        {/******************************/}
        {/**********Message DD**********/}
        {/******************************/}
        {/* <UncontrolledDropdown className="mx-1">
          <DropdownToggle color={topbarColor}>
            <MessageSquare size={18} />
          </DropdownToggle> */}
          {/* <DropdownMenu className="ddWidth">
            <DropdownItem header>
              <span className="mb-0">Messages</span>
            </DropdownItem> */}
            {/* <DropdownItem divider />
            <SimpleBar style={{ maxHeight: '350px' }}>
              <MessageDD />
            </SimpleBar>
            <DropdownItem divider /> */}
            {/* <div className="p-2 px-3">
              <Button color="primary" size="sm" block>
                Check All
              </Button>
            </div> */}
          {/* </DropdownMenu> */}
        {/* </UncontrolledDropdown> */}
        {/******************************/}
        {/**********Profile DD**********/}
        {/******************************/}
        {/* <UncontrolledDropdown className="mx-1">
        <DropdownToggle color={topbarColor}className="shadow-none"
                onClick={() => {
                  fetchTranslation();
                }}>
              Arabic Language update
          </DropdownToggle>
          </UncontrolledDropdown> */}
        <UncontrolledDropdown className="mx-1">
          <DropdownToggle color={topbarColor}>
            {/* <MessageSquare size={18} /> */}
           Language : {selectedLanguage}
          </DropdownToggle>
          <DropdownMenu className="ddWidth">
            <DropdownItem header>
              <span className="mb-0">Language</span>
            </DropdownItem>
            <DropdownItem divider />
            <SimpleBar style={{ maxHeight: '350px' }}>
              <Language />
            </SimpleBar>
            <DropdownItem divider />
            <div className="p-2 px-3">
              {/* <Button color="primary" size="sm" block>
                Check All
              </Button> */}
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown>
          <DropdownToggle color={topbarColor}>
            <img src={user1} alt="profile" className="rounded-circle" width="30" />
          </DropdownToggle>
          <DropdownMenu className="ddWidth">
            <ProfileDD />
            <div className="p-2 px-3">
              <Button onClick={logout} color="danger" size="sm">
                Logout
              </Button>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </Navbar>
  );
};

export default Header;
