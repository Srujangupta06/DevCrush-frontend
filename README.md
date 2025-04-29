# DevCrush

- Created a Vite + React project
- Removed boiler plate code (unnecessary)
- Initialized a git repository
- Installed Tailwind Css
- Installed Daisy UI
- Installed react-router-dom
- Configured Routes (Body and Children)
- Outlet component
- Created Footer Component
- Install axios
- Install Cors to avoid cors error
- add cors middleware in express(backend) with configuration
  {
  origin,credentials
  }
- In frontend, need to you pass {withCredentials:true} for every API Call
- Installed Redux Toolkit
- Configured Store and Provided to Application
- Configured User Slice
- Integrated User Profile with API in Header Component
- User Authentication
- Logout
- Profile Page of Logged In User
- Feed
- Profile Updation including Image file upload
- Developed Connections Route to display all user connections
- Page for to display all connection requests of loggedIn User
- added functionality for accept or reject connection request
- Functionality for sending connection request/ignoring connection Request
- Signup New User

# Deployment

- Create an AWS Account/SignUp
- Change location info in AWS Console
- Launch EC2 Instance
- Create key-pair(store key in .pem)
- chmod 400 .pem file
- connected to our machine using
  ssh -i "devcrush-secret.pem" ubuntu@ec2-52-66-213-192.ap-south-1.compute.amazonaws.com
- Installed node

# Install node version which you are using in your local which is working perfectly

- node -v
- nvm install <version>

- Clone git repo into our system
  frontend
  backend

# Frontend Deployment

- cd frontend
- Installed all dependencies from package.json file using npm i
- sudo apt update
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- copy code from build files(dist folder) to /var/www/html (nginx http server)
- sudo scp -r dist/\* /var/www/html
- Enable port 80 of your instance
- Created a BASE_URL dynamically select for development and Production

# Component Design

Body

- Navbar
- Route / Hero Section
- Route /feed - Feed
- Route /login - Login Page
- Route /connectiosn - Connections
- Route /profilr - Profile
