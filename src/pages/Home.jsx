import { useContext } from "react";
import Hero from "../components/Hero";
import DataContext from "../context/Data";
import Card from "../components/Card";
import RouterContext from "../context/Router";
import AllDonations from "../components/modals/AllDonations";
import FundSign from "../components/modals/FundSign";



export default function Home() {

    const { posts } = useContext(DataContext);
    const { targetRef } = useContext(RouterContext);

    const sortedPosts = posts.sort((a, b) => {
        if(a.tikslas !== a.surinkta && b.tikslas === b.surinkta){
            return -1;
        }
        if(a.tikslas === a.surinkta && b.tikslas !== b.surinkta){
            return 1;
        }
        return 0;
    })


    return (
        <div className="home-wrapper">
            <Hero />
            <AllDonations />
            <FundSign />
            <div className="home-text">
                <span>Full Fundraise List</span>
            </div>
            <div className="home-posts" ref={targetRef}>
                {
                    sortedPosts.length > 0 ? (
                        sortedPosts.map(post => {
                            return post.status === 'patvirtinta' ?
                                <Card key={post.id} post={post} />
                                :
                                null
                        })
                    )
                        :
                        (
                            <h1>Loading...</h1>
                        )
                }
            </div>
        </div>
    );
}