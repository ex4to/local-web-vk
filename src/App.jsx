import { AdaptivityProvider, ConfigProvider, Select } from "@vkontakte/vkui";
import {
  AppRoot,
  View,
  Panel,
  PanelHeader,
  Group,
  Header,
  List,
  Div,
  IconButton,
  FormItem,
  CustomSelect,
} from "@vkontakte/vkui";

import {
  Icon24ChecksOutline,
  Icon24DoneOutline,
  Icon24Dropdown,
} from "@vkontakte/icons";

import { useEffect, useState } from "react";
import "./App.css";
import mailService from "./services/mailService";
import SimpleMail from "./SimpleMail";
import FileLoader from "./FileLoader";

const allStyles = [
  { label: "Светлая", value: "light" },
  { label: "Темная", value: "dark" },
  { label: "Кошачья", value: "cats" },
  { label: "Собачья", value: "dogs" },
  { label: "Контрастная", value: "contrast" },
];

const App = () => {
  const [mailData, setMailData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [file, setFile] = useState(null);
  const [isFileAdded, setIsFileAdded] = useState(true);
  const [isMailMarked, setIsMailMarked] = useState(false);
  const [appear, setAppear] = useState("light");

  const saveHandler = (file) => {
    setFile(file);
  };

  const uploadHandler = () => {
    if (mailService.uploadFile(file)) setIsFileAdded(true);
  };

  const checkHandler = (x, id) => {
    let arr = [...checked];
    x ? arr.push({ id }) : (arr = arr.filter((inid) => inid.id !== id));
    setChecked(arr);
  };

  const makeCheckMails = async () => {
    await mailService.makeCheckMails(checked);
    setIsFileAdded(true);
  };

  const makeUncheckMails = async () => {
    await mailService.makeUncheckMails(checked);
    setIsFileAdded(true);
  };

  const makeCheckAll = () => {
    setIsMailMarked(!isMailMarked);
  };

  useEffect(async () => {
    if (isFileAdded) {
      setMailData(await mailService.loadFile());
      setIsFileAdded(false);
    }
  }, [isFileAdded]);

  useEffect(() => {
    setChecked(isMailMarked ? mailData : []);
  }, [isMailMarked]);

  return (
    <ConfigProvider appearance={appear}>
      <AdaptivityProvider>
        <AppRoot>
          <View activePanel="main">
            <Panel id="main" className={appear}>
              <PanelHeader>Malutto</PanelHeader>
              <FileLoader
                saveHandler={(e) => saveHandler(e)}
                uploadFile={() => uploadHandler()}
              />
              <Group
                className="main a-bit-opacity"
                header={
                  <Div className="header-list">
                    <Header mode="primary">Ваши сообщения</Header>
                    <FormItem>
                      <CustomSelect
                        value={allStyles}
                        mode="plain"
                        placeholder="Выбрать тему"
                        selectType="plain"
                        options={allStyles}
                        onChange={(e) => setAppear(e.target.value)}
                      />
                    </FormItem>
                    <IconButton onClick={() => makeCheckMails()}>
                      <Icon24ChecksOutline hidden={checked.length === 0} />
                    </IconButton>
                    <IconButton onClick={() => makeUncheckMails()}>
                      <Icon24DoneOutline hidden={checked.length === 0} />
                    </IconButton>
                    <IconButton onClick={() => makeCheckAll()}>
                      <Icon24Dropdown hidden={checked.length === 0} />
                    </IconButton>
                  </Div>
                }
              >
                <List className="a-bit-opacity">
                  {mailData.map((e) => (
                    <SimpleMail
                      isMailMarked={
                        checked.findIndex((k) => k.id === e.id) !== -1
                      }
                      key={e.id}
                      author={e.author.name}
                      title={e.title}
                      mailBody={e.text}
                      sendTime={e.dateTime}
                      read={e.read}
                      url={e.author.avatar}
                      isImportant={e.important}
                      isConfidence={e.confidence}
                      isFlag={e.flag}
                      isNewThread={e.newThread}
                      file={e.file}
                      checkHandler={(x) => checkHandler(x, e.id)}
                    />
                  ))}
                </List>
              </Group>
            </Panel>
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
