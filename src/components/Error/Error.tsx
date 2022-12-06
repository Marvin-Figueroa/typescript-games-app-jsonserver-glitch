import './Error.scss';

type Props = { message: string };

export const Error = ({ message }: Props) => {
  return (
    <div className="error">
      <h2 className="error_title">
        An error occured while getting the data!!!
      </h2>
      <p className="error_message">{message}</p>
    </div>
  );
};
