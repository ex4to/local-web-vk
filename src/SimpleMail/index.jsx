import { Cell } from "@vkontakte/vkui";
import "./index.css";

const SimpleMail = ({ author, title, mailBody, sendTime }) => {
  console.log(author);
  return (
    <Cell expandable>
      <div className="preview-mail">
        <h3 className="preview-author">{author}</h3>
        <p className="preview-title">{title}</p>
        <p className="preview-text">{mailBody}</p>
        <p className="preview-date">{sendTime}</p>
      </div>
    </Cell>
  );
};

export default SimpleMail;
