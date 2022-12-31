import Header from '../components/Header';

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className="container"></div>
            <div className="content">{children}</div>
        </div>
    );
}

export default HeaderOnly;
