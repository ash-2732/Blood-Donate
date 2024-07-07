import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import store from "../../redux/store";
import { userLogin } from "../../redux/features/auth/authActions";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");

    const handleLogin = (e) => {
    e.preventDefault();
    try {
        if( !email || !password || !role) {
            return alert("Please fill all the fields")
        }
        console.log(email, password, role)
        store.dispatch(userLogin({role , email , password}))
    } catch (error) {
        console.log(error)
    }
    }
  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl w-full p-5">
          <div className="sm:w-1/2 px-16">
            <h1 className="font-bold text-3xl text-[#002d74]">LOGIN</h1>
            <p className="text-sm mt-4">
              if you already an account , easily log in
            </p>
            <form action="" className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="">
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value={"donar"}
                    control={<Radio />}
                    label="Donar"
                    onChange={(e) => setRole(e.target.value)}
                    id="donarRadio"
                  />
                  <FormControlLabel
                    value={"admin"}
                    control={<Radio />}
                    label="Admin"
                    onChange={(e) => setRole(e.target.value)}
                    id="adminRadio"
                  />
                  <FormControlLabel
                    value={"hospital"}
                    control={<Radio />}
                    label="Hospital"
                    onChange={(e) => setRole(e.target.value)}
                    id="hospitalRadio"
                  />
                  <FormControlLabel
                    value={"organization"}
                    control={<Radio />}
                    label="Organization"
                    onChange={(e) => setRole(e.target.value)}
                    id="organizationRadio"
                  />
                </RadioGroup>
              </div>
              <TextField
                id="email"
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <button
                className="w-full bg-[#002d74] text-white p-2 mt-2 rounded-lg"
                type="submit"
              >
                Login
              </button>
            </form>
            <p className="mt-5 text-xs border-b py-4">Forgot your password?</p>
            <div className="text-sm flex items-center mt-3 gap-2">
              <p>if you dont have an account...</p>
              <Link to={"/register"} className="text-[#002d74] font-semibold">
                Register
              </Link>
              <p>please</p>
            </div>
          </div>
          <div className="w-1/2 p-5 sm:block hidden">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://www.nhlbi.nih.gov/sites/default/files/styles/16x9_crop/public/2023-05/Blood-Donation-Bag-Connected-to-Heart-Shape_Stock-Illustration.jpg?h=9fb2ff0c&itok=h-HPhN-6"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
