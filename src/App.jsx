// import './App.css'
import  React, { useState }  from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom'
import RepoList from './RepoList';



function App() {

  const [userSearch, setUserSearch] = useState('');
  const [foundUser, setFoundUser] = useState();

  const performSearchRequest = async() =>{
try {
  const response = await fetch(`https://api.github.com/users/${userSearch}`);
  // const response = await fetch(`https://api.github.com/users/octocat`);

  setFoundUser(await response.json());
  if(response.status === 404){
    console.log('User not found - 404');
    setFoundUser(null);
  }
} catch (error) {
  console.log(error)
  
}
  }

  const SearchFormUser = event =>{
    event.preventDefault();
    performSearchRequest();
  }
  return (
    <div className="flex flex-col items-center max-w-[400px] mx-auto p-5 mt-10 rounded-lg shadow-md">
    <h1 className="text-3xl"><span className='text-green-500'>GitHub</span> Informator</h1> 
    <Router>
      <nav>
        <ul className='flex gap-5 p-5 text-lg '>
          <li>
            <Link className='hover:text-green-500' to="/">UserInfo</Link>
          </li>
          <li>
            <Link className='hover:text-green-500' to="/repo">Repositories</Link>
          </li>

        </ul>
      </nav>

      <main>
    <Routes>

  <Route path="/" 
  element={
    <div className="flex flex-col items-center">
  <form onSubmit={SearchFormUser}>
 <input placeholder='search user' className='w-[150px] p-2 rounded-l-lg border 1px' value={userSearch}onChange={event => setUserSearch(event.target.value)}/>
   <button className="p-2 rounded-r-lg border 1px bg-green-100 ">Search</button>
  </form>
  {!foundUser && <div className='mt-10 text-red-400 text-lg'>USER not found</div>}
  {foundUser && <div className='flex flex-col items-center'>
  <img className="size-[200px] rounded-[100px] border mt-5" src={foundUser.avatar_url} alt="photo" />
 <div className="mt-5 gap-1 flex flex-col text-lg mb-5">
  <h3><span className='text-green-500'>Username:</span> {foundUser.login}</h3>
  <h3><span className='text-green-500'>Name:</span> {foundUser.name}</h3>
  <h3><span className='text-green-500'>Repo Count:</span> {foundUser.public_repos}</h3>
   <h3><span className='text-green-500'>Location:</span> {foundUser.location}</h3>
  <h2><span className='text-green-500 '>Created:</span> {new Date(foundUser.created_at).toLocaleDateString("en-GB")}</h2>
 </div>
  


</div>}


   </div>
} 

  />

 <Route
  path="/repo"
  element={
    <>

      {foundUser && (
        <RepoList reposList={foundUser?.repos_url} />
      )}
    </>
  }
/>

  

  
</Routes>

      </main>
    </Router>
    </div>
  )
}

export default App
