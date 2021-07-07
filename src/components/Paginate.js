import Button from "@material-ui/core/Button";

const Paginate = ({ skip, data, setSkip }) => {
  const handleOnClickNext = () => {
    setSkip(skip + 10);
  };

  const handleOnClickPrev = () => {
    setSkip(skip - 10);
  };

  return (
    <div className="pagination">
      {skip && (
        <Button size="small" onClick={handleOnClickPrev}>
          Prev
        </Button>
      )}
      <span>{skip / 10}</span>
      {skip + data.limit < data.count && (
        <Button size="small" onClick={handleOnClickNext}>
          Next
        </Button>
      )}
    </div>
  );
};

export default Paginate;
