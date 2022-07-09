import {
  AppRoot,
  View,
  Panel,
  PanelHeader,
  Group,
  Header,
  List,
  Input,
} from "@vkontakte/vkui";
import "./App.css";
import SimpleMail from "./SimpleMail";

import data from "./small.json";

const App = () => {
  return (
    <AppRoot>
      <View activePanel="main">
        <Panel id="main">
          <PanelHeader>Malluto</PanelHeader>
          <Group header={<Header mode="secondary">Список</Header>}>
            <List>
              {data.map((e) => (
                <SimpleMail
                  author={e.author.name}
                  title={e.title}
                  mailBody={e.text}
                  sendTime={e.dateTime}
                />
              ))}
            </List>
          </Group>
        </Panel>
      </View>
    </AppRoot>
  );
};

export default App;
