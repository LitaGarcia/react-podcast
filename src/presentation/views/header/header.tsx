import {useNavigate} from "react-router-dom";
import {Link, Nav} from "./header.styles"


export default function Header() {
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
