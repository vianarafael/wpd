import { PageTransition } from '@steveeeie/react-page-transition';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import Nav from './common/Nav';
import GenopticsPDP from './genoptics-pdp';
import CreamPDP from './cream-pdp';
import EssencePDP from './essense';
import Landing from './landing';
import HomePage from './home';
import LandingPage from './landing-page';
import LandingPageQR from './landing-page/qr';
import LiveStreamPage from './livestream';
import ScienceExpose from './science-expose';
import WelcomePage from './welcome';
import PiteraEssentials from 'pitera-essentials';
import PressKit from 'press-kit/PressKit';
import Discoveries from 'discoveries/discoveries';
import Milestones from 'milestones';
import Innovation from 'milestones/innovation';

type HasSeenMilestones = {
  discoveries: boolean;
  innovations: boolean;
};

type HasSeenEssentials = {
  FTE: boolean;
  GAE: boolean;
  SPC: boolean;
  lastSeen: ('FTE' | 'GAE' | 'SPC') | null;
};

type SetHasSeenEssentials = (arg1: HasSeenEssentials) => void;

type Context = {
  isPortrait: boolean;
  hasSeenMilestones: HasSeenMilestones;
  setHasSeenMilestones: (arg1: HasSeenMilestones) => void;
  hasSeenEssentials: HasSeenEssentials;
  setHasSeenEssentials: SetHasSeenEssentials;
};

export const MainContext = React.createContext<Context>({
  isPortrait: true,
  hasSeenMilestones: { discoveries: false, innovations: false },
  setHasSeenMilestones: (arg1: HasSeenMilestones) => {},
  hasSeenEssentials: {
    FTE: false,
    GAE: false,
    SPC: false,
    lastSeen: null,
  },
  setHasSeenEssentials: (arg1: HasSeenEssentials) => {},
});

const listPages = ['/', 'welcome', 'science-expose'];

function App() {
  const [pageTitle] = useState('');
  const location = useLocation();
  let navigate = useNavigate();
  const [enterAnimation, setEnterAnimation] = useState('rotateRoomLeftIn');
  const [exitAnimation, setExitAnimation] = useState('rotateRoomLeftOut');

  // Handle device orientation
  const [isPortrait, setIsPortrait] = useState(true);
  const [hasSeenMilestones, setHasSeenMilestones] = useState({
    discoveries: false,
    innovations: false,
  });
  const [hasSeenEssentials, setHasSeenEssentials] = useState({
    FTE: false,
    SPC: false,
    GAE: false,
    lastSeen: null,
  });

  const handleIsPortrait = () => {
    window.addEventListener('resize', (event) => {
      const orientation = _.get(event, 'target.orientation', null);
      if (orientation === 0) {
        setIsPortrait(true);
      } else if (orientation === 90) {
        setIsPortrait(false);
      }
    });
  };

  // Handle Swipe
  let touchStart: number;
  let touchEnd: number;
  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    touchEnd = 0;
    touchStart = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: any) => {
    touchEnd = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setExitAnimation('rotateRoomRightOut');
      setEnterAnimation('rotateRoomLeftIn');
      navigate(listPages[0]);
    }
    if (isRightSwipe) {
      setExitAnimation('rotateRoomLeftOut');
      setEnterAnimation('rotateRoomRightIn');
      navigate(listPages[1]);
    }
  };

  useEffect(() => {
    handleIsPortrait();
  }, []);

  if (
    (window.innerHeight > 926 || window.innerWidth > 428) &&
    location.pathname !== '/'
  ) {
    return <Navigate to="/" />;
  }

  return (
    <MainContext.Provider
      value={{
        isPortrait,
        hasSeenEssentials,
        setHasSeenEssentials: setHasSeenEssentials as SetHasSeenEssentials,
        hasSeenMilestones,
        setHasSeenMilestones,
      }}
    >
      {/* <div
        className="App"
        onTouchStart={(e) => onTouchStart(e)}
        onTouchMove={(e) => onTouchMove(e)}
        onTouchEnd={() => onTouchEnd()}
      > */}
      {/* <Nav title={pageTitle}></Nav> */}
      {/* <PageTransition
        preset={''}
        transitionKey={location.pathname}
        enterAnimation={enterAnimation}
        exitAnimation={exitAnimation}
      > */}
      <Routes location={location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/qr" element={<LandingPageQR />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/science-expose" element={<ScienceExpose />} />
        <Route path="/livestream" element={<LiveStreamPage />} />
        <Route path="discoveries" element={<Discoveries />} />
        <Route path="/press-kit" element={<PressKit />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/innovation" element={<Innovation />} />
        <Route path="/essence" element={<EssencePDP />} />
        <Route path="/cream" element={<CreamPDP />} />
        <Route path="/genoptics" element={<GenopticsPDP />} />
        <Route path="/pitera-essentials" element={<PiteraEssentials />} />
      </Routes>
      {/* </PageTransition> */}
      {/* </div> */}
    </MainContext.Provider>
  );
}

export default App;
