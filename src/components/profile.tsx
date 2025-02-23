import { useNavigate } from "react-router-dom";
import { AuthContext } from './authcontext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const userFromState = location.state?.user;



  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div>
        <h1>Better Airlines</h1>
        <img onClick={handleRedirect} className="logo" src="src\assets\logo.png" style={{ cursor: 'pointer' }} alt="Better Airlines Logo" />

    </div>
  );
};

export default Home;