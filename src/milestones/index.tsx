import MS from 'assets/images/milestones-bg.png';
import Logo from 'assets/images/milestones-second-logo.png';
import Play from 'assets/images/milestones-play-btn.png';
import './milestones.scss';
import HeaderLogo from './HeaderLogo';
import Header from 'components/header';
import { Navigate, useNavigate } from 'react-router-dom';

const Milestones = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="header">
        <Header isSound></Header>
      </div>
      <div className="logo">
        <img src={Logo} />
      </div>
      <div className="bg">
        <img src={MS} />
      </div>
      <button
        className="play-btn innovations"
        onClick={() => {
          navigate('/innovation');
        }}
      >
        <img src={Play} />
        <p>INNOVATIONS</p>
      </button>
      <button className="play-btn discoveries">
        <img src={Play} />
        <p>DISCOVERIES</p>
      </button>
      <div className="copy">
        <h2>
          Examine 40 years of groundbreaking PITERA™ research and innovations.
        </h2>
      </div>
    </div>
  );
};

export default Milestones;
