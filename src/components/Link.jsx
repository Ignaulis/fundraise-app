export default function Link({to, children, onClick}) {

    return(
        <a href={'#' + to} onClick={onClick}>{children}</a>
    );
}