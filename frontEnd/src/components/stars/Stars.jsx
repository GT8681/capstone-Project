

const Stars = ({ rating }) => {
    return (
        <div className="d-inline-block">
            {[...Array(10)].map((_, i) => (
                <i 
                    key={i} 
                    className={`bi ${i < rating ? 'bi-star-fill text-warning' : 'bi-star text-secondary'} me-1`}
                ></i>
            ))}
        </div>
    );
};
export default Stars;