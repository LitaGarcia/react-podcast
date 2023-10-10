import {useNavigate} from "react-router-dom";
import {Container, Link, Nav} from "./header.styles"
import Loading from "../loader/loading";


export default function Header({isLoading}: any) {
    const navigate = useNavigate();
    return (
        <>
            <Container>
            <Nav>
            <Link onClick={() => navigate('/')}>
                Podcaster
            </Link>
            </Nav>
                {isLoading ? <Loading></Loading> : ''}
            </Container>
        </>
    )
}
