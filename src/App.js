import * as React from 'react';
import axios from 'axios';
import './style.css';

export default function App() {
  const [data, setData] = React.useState(null);
  const techcrunchURL =
    'https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed';

  React.useEffect(() => {
    axios.get(techcrunchURL).then((response) => {
      setData(response.data);
    });
  }, []);

  let randomIndex = 0;
  if (data && data.length > 0) {
    randomIndex = Math.floor(Math.random() * data.length);
  }

  const decodeHtml = (html) => {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div>
      <h1>New headline today from TechCrunch!</h1>
      {data && data.length > 0 && (
        <div>
          <a href={data[randomIndex].link} target="_blank">
            {decodeHtml(data[randomIndex].title.rendered)}
          </a>
          <div>
            <img
              style={{ margin: '1em 0' }}
              src={data[randomIndex].parsely.meta.thumbnailUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
}
