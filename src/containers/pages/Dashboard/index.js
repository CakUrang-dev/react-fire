import React, { Component, Fragment } from "react";
import "./Dasboard.scss";
import { connect } from "react-redux";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataAPI,
  deleteDataAPI,
} from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    data: "",
    content: "",
    textButton: "Save",
    noteId: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
    console.log(userData);
  }

  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };

    if (textButton === "Save") {
      saveNotes(data);
    } else {
      data.noteId = noteId;
      updateNotes(data);
      console.log(updateNotes());
    }
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  updateNotes = (note) => {
    console.log(note);
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "Update",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "Save",
    });
  };

  deleteNote = (e, note) => {
    e.stopPropagation();
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    this.props.deleteNote(data);
  };

  render() {
    const { title, content } = this.state;
    const { notes } = this.props;
    console.log("Notes", notes);
    return (
      <div className="container">
        <div className="input-form">
          <input
            type="text"
            placeholder="title"
            className="input-title"
            value={title}
            onChange={(e) => this.onInputChange(e, "title")}
          />
          <textarea
            placeholder="content"
            className="input-content"
            value={content}
            onChange={(e) => this.onInputChange(e, "content")}
          ></textarea>

          <div className="action-wrapper">
            {this.state.textButton === "Update" ? (
              <button
                className="save-btn cancel"
                onClick={this.handleSaveNotes}
                onClick={this.cancelUpdate}
              >
                Cancel
              </button>
            ) : (
              <div></div>
            )}
            <button className="save-btn" onClick={this.handleSaveNotes}>
              {this.state.textButton}
            </button>
          </div>
        </div>

        {notes.length > 0 ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div
                  className="card-content"
                  key={note.id}
                  onClick={() => this.updateNotes(note)}
                >
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.date}</p>
                  <p className="content">{note.data.content}</p>
                  <div
                    className="delete-btn"
                    onClick={(e) => this.deleteNote(e, note)}
                  >
                    X
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const mapDispatchToProps = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataAPI(data)),
  deleteNote: (data) => dispatch(deleteDataAPI(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
