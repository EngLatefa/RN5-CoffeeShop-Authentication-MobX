import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { observer } from "mobx-react";

//Stores
import authStore from "../../store/authStore";

// NativeBase Components
import {
  Text,
  Button,
  Body,
  List,
  ListItem,
  Form,
  Label,
  Input,
  Item,
  Content,
  Header
} from "native-base";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin() {
    authStore.loginUser(this.state, this.props.navigation);
  }

  handleSignup() {
    authStore.registerUser(this.state, this.props.navigation);
  }

  static navigationOptions = {
    title: "Login"
  };

  render() {
    const { username, password } = this.state;

    return (
      <Content>
        <Header transparent />
        <List>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Body>
              <Form>
                <Body>
                  <Label style={{ color: "white" }}>Username</Label>
                </Body>
                <Item
                  rounded
                  style={{
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Input
                    id="username"
                    value={username}
                    name="username"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={text => this.setState({ username: text })}
                  />
                </Item>
                <Body>
                  <Label style={{ color: "white" }}>Password</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    id="password"
                    value={password}
                    name="password"
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={text => this.setState({ password: text })}
                  />
                </Item>
              </Form>
            </Body>
          </ListItem>
          <Button full success onPress={() => this.handleLogin()}>
            <Text>Login</Text>
          </Button>
          <Button full warning onPress={() => this.handleSignup()}>
            <Text>Register</Text>
          </Button>
        </List>
        <Body>
          <Label style={{ color: "red", opacity: 0.6 }} />
        </Body>
      </Content>
    );
  }
}

export default withNavigation(observer(Login));
