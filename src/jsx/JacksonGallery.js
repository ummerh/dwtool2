const React = require('react');
const ReactDOM = require('react-dom');
import ImageGallery from 'react-image-gallery';

const images = [
  {
    original: 'https://azfaasgallery.blob.core.windows.net/jackson-images/01.jpg',
    thumbnail: 'https://azfaasgallery.blob.core.windows.net/jackson-images/01.jpg'
  },
  {
    original: 'https://azfaasgallery.blob.core.windows.net/jackson-images/02.jpg',
    thumbnail: 'https://azfaasgallery.blob.core.windows.net/jackson-images/02.jpg'
    
  },
  {
    original: 'https://azfaasgallery.blob.core.windows.net/jackson-images/03.jpg',
    thumbnail: 'https://azfaasgallery.blob.core.windows.net/jackson-images/03.jpg'
    
  },
  {
    original: 'https://azfaasgallery.blob.core.windows.net/jackson-images/04.jpg',
    thumbnail: 'https://azfaasgallery.blob.core.windows.net/jackson-images/04.jpg'
    
  },
  {
    original: 'https://azfaasgallery.blob.core.windows.net/jackson-images/05.jpg',
    thumbnail: 'https://azfaasgallery.blob.core.windows.net/jackson-images/05.jpg'
    
  },
  {
    original: 'https://azfaasgallery.blob.core.windows.net/jackson-images/06.jpg',
    thumbnail: 'https://azfaasgallery.blob.core.windows.net/jackson-images/06.jpg'
    
  },
  {
    original: 'https://azfaasgallery.blob.core.windows.net/jackson-images/07.jpg',
    thumbnail: 'https://azfaasgallery.blob.core.windows.net/jackson-images/07.jpg'
    
  }  
];
 
export class JacksonGallery extends React.Component {
  render() {
    return (<div className="row" ><br/><div className="col-lg-2"></div><div><h3>Jackson National, Lansing 8CW</h3><ImageGallery items={images} showThumbnails={true} /></div></div>);
  }
}