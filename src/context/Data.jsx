import { createContext } from "react";
import usePosts from "../hooks/usePosts";
import useDonations from "../hooks/useDonations";

const DataContext = createContext();

export const Data = ({children}) => {

    const {posts} = usePosts();
    const {donations} = useDonations();
    

    return (
        <DataContext.Provider value={{
            posts,
            donations
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;