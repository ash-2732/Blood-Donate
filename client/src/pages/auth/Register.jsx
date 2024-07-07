import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import store from "../../redux/store";
import { userRegister } from "../../redux/features/auth/authActions";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

    const handleRegister = (e) => {
    e.preventDefault();
    try {
        console.log(email, password, role, name, organizationName, hospitalName, website, address, phone)
        store.dispatch(userRegister({role , email , password , name , organizationName , hospitalName , address , phone , website}))
    } catch (error) {
        console.log(error)
    }
    }
  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl w-full p-5">
          <div className="px-16 w-full">
            <h1 className="font-bold text-3xl text-[#002d74] text-center">
              REGISTER
            </h1>
            <p className="text-sm mt-4 text-center">
              if you dont have an account , open an account please!
            </p>
            <form action="" className="flex flex-col gap-5" onSubmit={handleRegister}>
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
              <div className="flex flex-row gap-8">
                <div className="flex flex-col w-1/2 gap-3">
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
                  {(role === "admin" || role === "donar") && (
                    <TextField
                      id="name"
                      label="Name"
                      variant="standard"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                    />
                  )}

                  {role === "organization" && (
                    <TextField
                      id="organizationName"
                      label="Organization Name"
                      variant="standard"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      type="text"
                    />
                  )}
                </div>
                <div className="flex flex-col w-1/2 gap-3">
                  {role === "hospital" && (
                    <TextField
                      id="hospitalName"
                      label="Hospital Name"
                      variant="standard"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      type="text"
                    />
                  )}
                  <TextField
                    id="website"
                    label="Website"
                    variant="standard"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    type="text"
                  />
                  <TextField
                    id="address"
                    label="Address"
                    variant="standard"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                  />
                  <TextField
                    id="phone"
                    label="Phone"
                    variant="standard"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <button
                className="w-full bg-[#002d74] text-white p-2 mt-2 rounded-lg"
                type="submit"
              >
                Register
              </button>
            </form>
            <div className="text-sm flex items-center mt-3 gap-2">
              <p>if you already have an account...</p>
              <Link to={"/login"} className="text-[#002d74] font-semibold">
                Login
              </Link>
              <p>please</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
