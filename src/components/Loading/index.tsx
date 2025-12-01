import './Loading.scss';

export default function Loading() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 text-center">
          <div className="spinner-border loading-indication" title="Loading"></div>
        </div>
      </div>
    </div>
  );
}
