import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import MainRoutes from "./presentation/routes/mainRoutes";
import './index.css';


ReactDOM.render(
    <BrowserRouter>
        <MainRoutes />
    </BrowserRouter>,
    document.getElementById('root'),
);
