import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from "./routes/mainRoutes";


ReactDOM.render(
    <BrowserRouter>
        <MainRoutes />
    </BrowserRouter>,
    document.getElementById('root'),
);
