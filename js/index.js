"use strict";

var Child = React.createClass({
  displayName: "Child",

  handleChange: function handleChange() {
    var input = document.getElementById('input-window').value;
    var preview = marked(input);

    // this.props.onChange is the changePreivew function, so we pass in
    // preview here as the argument so the function can change the preview
    // to the updated one.
    this.props.onChange(preview);
  },

  render: function render() {
    var startingInput = ["This is a heading", "==", "This is a sub-heading", "--", "", "### This symbol is another way to create headers", "", "Try different amounts of #", "", "Paragraphs are separated", "by a blank line.", "", "To get a line break, put two spaces at the end of line.", "Like this  ", "You can also create lists  ", "", "List:  ", "  * a", "  * b", "  * c", "", "*italic* **bold** 'monospace' ~~strikethrough~~  ", "", "By *[Ted](https://github.com/shintouki)*"].join("\n");

    return React.createElement(
      "div",
      null,
      React.createElement(
        "textarea",
        {
          id: "input-window",
          rows: "30",
          cols: "50",
          onClick: this.handleChange,
          onChange: this.handleChange },
        startingInput
      ),
      React.createElement("div", { id: "preview-window",
        dangerouslySetInnerHTML: { __html: this.props.currentPreview } })
    );
  }
});

var Parent = React.createClass({
  displayName: "Parent",

  getInitialState: function getInitialState() {
    return {
      currentPreview: ""
    };
  },

  changePreview: function changePreview(newPreview) {
    this.setState({
      currentPreview: newPreview
    });
  },

  render: function render() {
    return React.createElement(Child, {
      currentPreview: this.state.currentPreview,
      onChange: this.changePreview });
  }
});

ReactDOM.render(React.createElement(Parent, null), document.getElementById('app'));