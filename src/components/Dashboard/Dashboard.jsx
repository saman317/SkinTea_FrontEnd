import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        Review all of your favorite (and not so favorite) products.
      </p>
    </main>
  );
};

export default Dashboard;