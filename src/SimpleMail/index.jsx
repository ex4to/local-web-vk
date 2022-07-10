import { Avatar, Cell, Checkbox, Text } from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import {
  Icon20PrometeyCircleFillRed,
  Icon24KeyOutline,
  Icon24BookmarkOutline,
  Icon24NewsfeedOutline,
} from "@vkontakte/icons";
import "./index.css";

const SimpleMail = ({
  isMailMarked,
  checkHandler,
  url,
  author,
  title,
  mailBody,
  sendTime,
  read,
  isImportant,
  isConfidence,
  isFlag,
  isNewThread,
  file,
}) => {
  const classRead = "preview-mail " + (read ? "" : "unread");
  const [isInnerMark, setIsInnerMark] = useState(false);

  useEffect(() => {
    setIsInnerMark(isMailMarked);
  }, [isMailMarked]);

  return (
    <Cell
      before={
        <>
          <Checkbox
            checked={isInnerMark}
            onClick={(e) => {
              setIsInnerMark(!isInnerMark);
              checkHandler(e.target.checked);
            }}
          />
        </>
      }
    >
      <div className={classRead}>
        <div className="author-block">
          <Avatar src={url} size={28} />
          <Text weight={read ? "2" : "1"}>{author}</Text>
        </div>
        <Text className="preview-title" weight={read ? "2" : "1"}>
          {title}
        </Text>
        <Text className="preview-text" weight={read ? "3" : "2"}>
          {mailBody}
        </Text>

        <div className="preview-date">
          <Icon24NewsfeedOutline hidden={!isNewThread} />
          <Icon24BookmarkOutline hidden={!isFlag} />
          <Icon24KeyOutline hidden={!isConfidence} />
          <Icon20PrometeyCircleFillRed hidden={!isImportant} />
          <Text>{sendTime}</Text>
        </div>
        {file ? (
          <div className="intro">
            <img className="preview-file" src={file.preview} />
          </div>
        ) : (
          ""
        )}
      </div>
    </Cell>
  );
};

export default SimpleMail;
