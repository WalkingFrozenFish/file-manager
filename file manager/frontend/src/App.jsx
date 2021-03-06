// Импортируем хуки
import React, { useEffect, useState } from "react";
import './App.css';

function App() {

  const [parent, setParent] = useState("");
  const [data, setData] = useState({
    path: "",
    files: []
  });

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then(res => res.json())
      .then(
        (result) => {
          setParent("");
          setData(result);
        },
        (error) => {
          console.log(error);
        })
  }, []);

  const clickHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/?path=" + event.target.attributes.href.value)
      .then(res => res.json())
      .then((result) => {
        let linkArr = result.path.split("/");
        linkArr.pop();
        setParent(linkArr.join("/"));
        setData(result);
      },
        (error) => {
          console.log(error);
        })
  }

  return (
    <div className="file-manager">
      <div>
        <a href={parent} onClick={clickHandler} className="level-up">
          <span class="material-icons">keyboard_return</span>
          Level up
        </a>
      </div>
      <div className="current-level">
        current: {data.path === "" ? "/" : data.path}
      </div>
      <ul className="folder-list">
        {data.files.map(item => {
          if (item.dir) {
            return <li key={item.name} className="folder">
              <a href={data.path + "/" + item.name} onClick={clickHandler}>
                <span class="material-icons">folder</span>
                {item.name.toUpperCase()}
              </a>
            </li>;
          } else {
            return <li key={item.name} className="file">
              <span class="material-icons">description</span>
              {item.name}
            </li>;
          }
        })}
      </ul>
    </div>
  );
}

export default App;
