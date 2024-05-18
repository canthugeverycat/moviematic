import './index.scss';

/**
 * A Loader component that will display animated empty grid cards
 * @returns {React.ReactElement}
 */
const Loader = (): React.ReactElement => {
    const delay = 0.2;
    const cards = [...Array(10).keys()];

    return (
        <div data-testid="loader" className="grid">
            <div className="grid-scroll">
                {cards.map((i) => (
                    <div
                        key={i}
                        className="loader-card"
                        role="presentation"
                        style={{ animationDelay: `${i * delay}s` }}
                    >
                        <div
                            className="loader-card-glow"
                            style={{ animationDelay: `${i * delay}s` }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loader;