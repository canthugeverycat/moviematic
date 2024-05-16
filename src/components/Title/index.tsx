import CSSModules from 'react-css-modules';
import style from './index.module.scss';

const Title = () => <h1 styleName="title">MOVIEMATIC</h1>;

export default CSSModules(Title, style);
