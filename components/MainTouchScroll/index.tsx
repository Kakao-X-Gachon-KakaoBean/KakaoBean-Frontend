import React from 'react';
import {Image, ImageDiv} from './styles';
//https://www.npmjs.com/package/react-fast-marquee
import Marquee from "react-fast-marquee";
import test1 from '../../image/ScreenTest1.png';
import test2 from '../../image/ScreenTest2.png';
import test3 from '../../image/ScreenTest3.png';


const HeaderBar = () => {
  return (
    <Marquee gradient={false} pauseOnHover={true}>
        <Image src={test1} />
        <Image src={test2} />
        <Image src={test3} />
    </Marquee>
  );
};

export default HeaderBar;
