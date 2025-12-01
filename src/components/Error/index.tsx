import './Error.scss';

export default function Error(props: {mainText: string; subText?: string}) {
  return (
    <div className="error-page">
      <div className="row justify-content-center">
        <div className="col-sm-12 text-center">
          <div className="error-image"></div>
          <div className="error-main-text">{props.mainText}</div>
          {!!props.subText && <div className="error-sub-text">{props.subText}</div>}
        </div>
      </div>
    </div>
  );
}
