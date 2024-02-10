import { useState } from 'react';

export const LoginView = ({ onLoggedIn }) => {
  //state variables for form fields - set both value and onChange properties to this
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //when submit button is clicked, verify inputted data with movies API login endpoint
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch('https://my-flix-project-b74d36752ec6.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      //transforms the response content into a JSON object to extract the JWT
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem("user",JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          //pass user and token back to MainView-used for subsequent API requests
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
    };

    //display login form to authenticate user
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
};
