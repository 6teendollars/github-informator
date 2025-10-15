import React, { useEffect } from "react";


const RepoList = ({reposList}) => {
 

const [repos, setRepos] = React.useState([]);
// const date = new Date(repository.updated_at)
repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

useEffect(() => {
 (async () => {
    const result = await fetch(reposList);
    setRepos(await result.json());
 })();
}, [reposList]);

return(
    
    <div>
        {!RepoList.length && <div>Loading...</div>}
        {!!RepoList.length && 
        <ul>
            {repos.map(repository => 
            <li className="rounded-xl border p-3 m-2 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-50" key={repository.id}>
                <a className="text-blue-500" href={repository.html_url} target="_blank"rel="noreferrer">{repository.name}</a>
             {repository.description && <p className="text-xs text-gray-500">Description:{repository.description}</p>}
              {repository.language && <p>Language:<span className="text-green-500">{repository.language}</span> </p>}
                <p className="text-sm">Updated at: {new Date(repository.updated_at).toLocaleDateString()}</p>
            </li>
            )}
            </ul>}
    </div>
)

}



export default RepoList;