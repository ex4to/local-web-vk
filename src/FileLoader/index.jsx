import { Group, File, Header, Button } from "@vkontakte/vkui";
import { Icon24Document } from "@vkontakte/icons";
import { useState } from "react";

const FileLoader = ({ saveHandler, uploadFile }) => {
  const [fileName, setFileName] = useState("");

  const localSave = (e) => {
    setFileName(e.name);
    saveHandler(e);
  };

  const localUploadHandler = () => uploadFile();

  return (
    <Group header={<Header mode="secondary">Загрузка</Header>} className="main">
      <File
        stretched
        style={{ padding: 4 }}
        before={<Icon24Document role="presentation" />}
        size="l"
        mode="secondary"
        onChange={(e) => localSave(e.target.files[0])}
      />
      <Button
        style={{ marginTop: 8, padding: 4 }}
        stretched
        disabled={!fileName}
        size="l"
        mode="secondary"
        appearance="positive"
        onClick={() => localUploadHandler()}
      >
        Отправить
      </Button>
    </Group>
  );
};

export default FileLoader;
