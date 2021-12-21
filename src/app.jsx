import {useState} from 'react';
import './app.css';
import HtmlReactParser from 'html-react-parser';

function App() {

  const [movieCont, setMovieCont] = useState({
    title: '',
    content: ''
  })

  const [viewCont, setViewCont] = useState([]);

  const getValue = e => {
    const {name, value} = e.target;
    // console.log(name, value);
    setMovieCont({
      ...movieCont,
      [name]: value
    });
    console.log(movieCont);
  }

  return (
    <div className='App'>
      <h1>영화 리뷰 기록</h1>
      <div className='form-wrap'>
        <input type="text" className='tit-input' placeholder='영화 제목을 입력해주세요' onChange={getValue} name='title'/>
        <textarea className='txt-area' placeholder='내용'></textarea>
      </div>
      <button className='submit-btn'
        onClick={() => {
          setViewCont(viewCont.concat({...movieCont}));
        }}
      >저장</button>
      <div className='movie-cont'>
        {viewCont.map(element => 
          <div className='movie-box'>
            <h2>{element.title}</h2>
            <div>
              {HtmlReactParser(element.content)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
