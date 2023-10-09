import {useNavigate} from "react-router-dom";
import {Link, Nav} from "./header.styles"

function Header() {
    const navigate = useNavigate();
    return (
        <>
            <Nav>
            <Link onClick={() => navigate('/')}>
                Podcaster
            </Link>
            </Nav>
        </>
    )
}

export default Header;