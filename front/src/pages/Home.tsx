import Intro from "../components/Intro/Intro.tsx";
import Description from "../components/Description/Description.tsx";
import Reviews from "../components/Reviews/Reviews.tsx";
import Portfolio from "../components/Portfolio/Portfolio.tsx";

function Home() {
    return (
        <>
            <Intro/>
            <Description/>
            <Reviews/>
            <Portfolio/>
        </>
    )
}

export default Home;