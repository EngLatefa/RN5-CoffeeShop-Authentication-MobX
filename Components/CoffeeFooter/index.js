import React from "react";
import { observer } from "mobx-react";

// Navigation
import { withNavigation } from "react-navigation";

// NativeBase Components
import { Footer, FooterTab, Button, Text } from "native-base";

//Store
import authStore from "../../store/authStore";

class coffeeFooter extends React.Component {
  loginButton() {
    return (
      <Button vertical onPress={() => this.props.navigation.navigate("Login")}>
        <Text>LOGOUT</Text>
      </Button>
    );
  }

  logoutButton() {
    return (
      <Button vertical onPress={() => authStore.logoutUser()}>
        <Text>LOGIN</Text>
      </Button>
    );
  }

  logoutButton() {
    return (
      <Button vertical onPress={() => this.props.navigation.navigate("Login")}>
        <Text>LOGOUT</Text>
      </Button>
    );
  }

  render() {
    return (
      <Footer>
        {authStore.user ? this.logoutButton() : this.loginButton()}
        <FooterTab />
      </Footer>
    );
  }
}

export default withNavigation(observer(coffeeFooter));
