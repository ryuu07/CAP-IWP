import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {RiCloseLine} from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';
import './Sidebar.css'
import{logo} from '../assets';
import{links} from "../assets/constants"

const NavLinks = ({handleClick}) => (
  <div className="mt-10">
    {links.map((item)=>(
      <NavLink 
      key={item.name}
      to={item.to}
      className="flex flex-row justify-start items-center
      font-medium text-gray-400 hover:text-cyan-400 my-8 text-sm"
      onClick={()=> handleClick && handleClick()}
      >
        <item.icon className="w-g h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] =useState(false);
  return(
    <>
      <div className=" md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191627]">
        {/* <img src={logo} alt="logo" className="w-full h-14 object-contain"/> */}
        <span class="glitch" data-text="CAP">
        CAP
        </span>
        <NavLinks />
      </div>
      <div className=" absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2"
          onClick={()=> setMobileMenuOpen(false)}/>
        ):(
          <HiOutlineMenu className="w-6 h-6 text-white mr-2"
           onClick={()=> setMobileMenuOpen(true)}/>
        )
      }

      </div>
      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#191627] 
      backdrop-blur-lg z-10 p-6 md:hidden 
      smooth-transition ${mobileMenuOpen ? 'left-0': 'left-full'}`} >
        <span class="glitch" data-text="CAP">
        CAP
        </span>
        <NavLinks handleClick={()=> setMobileMenuOpen(false)}/>
      </div>
    </>
  )
  };

export default Sidebar;
