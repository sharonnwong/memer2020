import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {LinearProgress} from '@material-ui/core'
import {Search} from '@material-ui/icons'


function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)

  async function getMemes(){ /*async function because 'await', to download data */
    console.log("GET MEMES")
    setLoading(true)
    setMemes([]) 
    const key = 'dh1QNMJ7r6EOD6M524HVYY96AuqH86aC'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key='+key
    url += '&q='+text
    const response = await fetch(url) 
    /*fetch is a built in function to the browser. it'll search up the url */
    const body = await response.json() 
    /*parse the json from the response */
    setMemes(body.data)
    setText('')
    setLoading(false)
  }

  console.log(memes)

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField fullWidth variant="outlined"
            label="Search for memes!"
            value={text} 
            onChange={e=> setText(e.target.value)}
            onKeyPress={e=>{
              if(e.key==='Enter') getMemes()
            }}
          />
          <Button variant="contained" 
            color="primary"
            onClick={getMemes} /*identical to {()=>getMemes()} */>
            <Search />
            Search
          </Button>
        </div>
      </header>
      {loading && <LinearProgress />} 

      <div className="memes">
        {memes.map((meme,i)=> <Meme key={i} {...meme}/> /*function Meme, add every single thing to the memes list */)}
      </div>
    </div>
  );
}

function Meme({title,images}){
  return <div className="meme" onClick={()=>window.open(images.fixed_height.url,'_blank')}>
    <img src={images.fixed_height.url} alt="meme" height="200"/>
    <div className="meme-title">{title}</div>
  </div>
}

export default App;
