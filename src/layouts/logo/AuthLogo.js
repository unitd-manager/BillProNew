// import React from 'react';
// import { useSelector } from 'react-redux';

// import { ReactComponent as LogoDarkText } from '../../assets/images/logos/logo.svg';
// import { ReactComponent as LogoWhiteIcon } from '../../assets/images/logos/xtreme-white-icon.svg';
// import { ReactComponent as LogoWhiteText } from '../../assets/images/logos/xtreme-white-text.svg';

// const AuthLogo = () => {
//   const isDarkMode = useSelector((state) => state.customizer.isDark);

//   return (
//     <div className="p-4 d-flex justify-content-center gap-2">
//       {isDarkMode !== false ? (
//         <>
//           <LogoWhiteIcon />
//           <LogoWhiteText />
//         </>
//       ) : (
//         <>
          
//           <LogoDarkText />
//         </>
//       )}
//     </div>
//   );
// };

// export default AuthLogo;
import { Link } from 'react-router-dom';
import React from 'react';
import  MainLogo from '../../assets/images/logos/logo.png';

const AuthLogo = () => {
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
    <img src={MainLogo} alt="Logo" className='w-100' />
    </Link>
  );
};

export default AuthLogo;
