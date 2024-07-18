export const CardButton = ({ children, onClick }) => {
  return (
    <button className="card-button" onClick={onClick}>
      {children}
    </button>
  );
};
