import { useContext } from "react";
import DataContext from "../context/Data";
import AdminCard from "../components/AdminCard";
import Confirm from "../components/modals/Confirm";
import AllDonations from "../components/modals/AllDonations";
import Approve from "../components/modals/Approve";

export default function Admin() {

    const { posts } = useContext(DataContext);

    const sortedPosts = posts.sort((a, b) => {
        if (a.status === 'nepatvirtinta' && b.status !== 'nepatvirtinta') {
            return -1;
        }
        if (a.status !== 'nepatvirtinta' && b.status === 'nepatvirtinta') {
            return 1;
        }

        if (a.tikslas !== a.surinkta && b.tikslas === b.surinkta) {
            return -1;
        }
        if (a.tikslas === a.surinkta && b.tikslas !== b.surinkta) {
            return 1;
        }
        return 0;
    })

    return (
        <div className="admin-wrap">
            <Confirm />
            <AllDonations />
            <Approve />
            <div className="admin-text">
                <span>Admin Panel</span>
            </div>
            <div className="admin-cards">
                {
                    sortedPosts.map(post => (
                        <AdminCard key={post.id} post={post} />
                    ))
                }
            </div>
        </div>
    );
}