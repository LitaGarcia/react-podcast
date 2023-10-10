import {useNavigate} from "react-router-dom";
import {Container, Link, Nav} from "./header.styles"
import Loading from "../loader/loading";


export default function Header() {
    const navigate = useNavigate();
    return (
        <>
            <Container>
            <Nav>
            <Link onClick={() => navigate('/')}>
                Podcaster
            </Link>
            </Nav>
            <Loading></Loading>
            </Container>
        </>
    )
}
