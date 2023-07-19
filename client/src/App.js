import React,{useState} from 'react';

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';


function App() {
  const [justifyActive, setJustifyActive] = useState('tab1');

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [loginEmail, setloginEmail] = useState("")
  const [loginPassword, setloginPassword] = useState("")
  const [otp, setotp] = useState("")

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const registerForm=async (e)=>{
    e.preventDefault();
console.log(name,email,mobile,password);
const response = await fetch("http://localhost:4000/api/register", {
  method: "POST",  
  headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      mobile,
      password,
    }),
  });
  const data = await response.json();
  if(data.status==='ok')
  {
      history.push('/login')
  }
 
  }

  async function loginForm(e) {
    e.preventDefault();
  
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {   
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginEmail,
        loginPassword,
        otp
      }),
    });
    const data = await response.json();
    console.log(data.result);
    if (data.result) {
      var login_obj = {
        _id: data.result._id,
        email: data.result.email,
      };

      localStorage.setItem("token", JSON.stringify(login_obj));
      // alert("login sccessfull")

      if (data.result !=="") {
      
        history.push("/");
        // window.location.href("/admin/dashboard")
       
      } else {
        history.push("/admin/projectlist");
      }
      // window.location.href ="/";
    } else {
      // alert("please check your username and password")
      const error = {};
      error.msg = "please check your email or password";
      setseconderror(error);
      setvisible(true);
    }
  }

  return (
    <MDBContainer fluid>
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <div className='text-center'>
        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>
          <form onSubmit={loginForm}>
          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={loginEmail} onChange={(e)=>setloginEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={loginPassword} onChange={(e)=>setloginPassword(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Otp' id='form3' type='text' value={otp} onChange={(e)=>setotp(e.target.value)}/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>

          </form>
          <p className="text-center">Not a member? <a href="#!">Register</a></p>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
            <p>Sign up with:</p>
            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>
            <p className="text-center mt-3">or:</p>
          </div>
<form onSubmit={registerForm}>
          <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Mobile' id='form1' type='text' value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have Fread and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
</form>
        </MDBTabsPane>

      </MDBTabsContent>
      
        </div>
      </div>
    </MDBContainer>
  );
}

export default App;
