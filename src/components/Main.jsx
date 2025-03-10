import { useContext } from "react";
import RouterContext from "../context/Router";
import Page404 from "./Page404";

export default function Main() {

    const {routes, page} = useContext(RouterContext);

    const route = () => {
        return routes?.[page]?.c ?? <Page404/>
    }

    return(

        <main>
            {route()}
        </main>
    );
}