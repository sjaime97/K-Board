import React from "react";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import TextArea from "react-textarea-autosize";

class TrelloActionButton extends React.Component {
  state = {
    formOpen: false,
  };

  openForm = () => {
    this.setState({ formOpen: true });
  };

  renderAddButton = () => {
    const { list } = this.props;
    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";
    const buttonStyles = {
      ...styles.openForButtonGroup,
      opacity: buttonTextOpacity,
      color: buttonTextColor,
      backgroundColor: buttonTextBackground,
    };

    return (
      <div style={buttonStyles} onClick={this.openForm}>
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { list } = this.props;
    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";

    const buttonTitle = list ? "Add List" : "Add Card";

    return (
      <div>
        <Card>
          <TextArea />
        </Card>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const styles = {
  openForButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10,
  },
};

export default TrelloActionButton;
