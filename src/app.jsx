import {useState} from 'react';
import './app.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setMovieCont({
              ...movieCont,
              content: data
            })
            console.log(movieCont)
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
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
