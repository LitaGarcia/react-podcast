import React from "react";
import {Container, Loader} from './loader.styles'

export default function Loading() {
    return (
    <>
        <Container>
            <Loader></Loader>
        </Container>
    </>
    );
}