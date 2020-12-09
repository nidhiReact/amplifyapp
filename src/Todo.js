import React, { Component } from "react";
import "./App.css";

class Todo extends Component {
  state = {
    deleteMode: true,
    list: [
      { value: "Learn HTML & CSS", done: true, created: new Date() },
      { value: "Practice HTML & CSS", done: true, created: new Date() },
      { value: "Learn Javascript", done: true, created: new Date() },
    ],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState((prevState, props) => {
      const { value, list } = prevState;
      if (typeof value === "string" && value.length > 0) {
        list.push({ value });
        return {
          list,
          value: "",
        };
      }
      return null;
    });
  };
  handleChange = (event) => {
    const { value } = event.target;
    this.setState((prevState, props) => {
      if (typeof value === "string" && value.length >= 0) {
        return { value };
      }
      return null;
    });
  };
  remove = (i) => {
    this.setState((prevState, props) => {
      const { list } = prevState;
      if (typeof i === "number" && i >= 0 && i < list.length) {
        return { removing: i };
      }
      return null;
    });
  };
  removeConfirm = (i) => {
    this.setState((prevState, props) => {
      const { list } = prevState;
      if (typeof i === "number" && i >= 0 && i < list.length) {
        list.splice(i, 1);
        return { list };
      }
      return null;
    }, this.removeCancel);
  };
  removeCancel = (event) => {
    this.setState((prevState, props) => {
      delete prevState.removing;
      return prevState;
    });
  };
  toggleEdit = (i) => {
    this.setState({ editing: i }, () => {
      if (typeof this.input === "object" && this.input !== null) {
        this.input.focus();
      }
    });
  };
  handleBlur = (event) => {
    this.setState((prevState, props) => {
      delete prevState.editing;
      return prevState;
    });
  };
  handleEditing = (event) => {
    const { value } = event.target;
    this.setState((prevState, props) => {
      const { list, editing } = prevState;
      if (Array.isArray(list) && list.length > 0) {
        if (
          typeof editing === "number" &&
          editing >= 0 &&
          editing < list.length
        ) {
          list[editing].value = value;
          return { list };
        }
      }
      return null;
    });
  };
  toggleDone = (i) => {
    this.setState((prevState, props) => {
      const { list } = prevState;
      if (typeof i === "number" && i >= 0 && i < list.length) {
        const { done } = list[i];
        list[i].done = !done;
        return { list };
      }
      return null;
    });
  };
  renderList() {
    const { list, deleteMode, removing, editing } = this.state;
    if (Array.isArray(list) && list.length > 0) {
      return (
        <ul class="list-unstyled">
          {list.map((e, i) => (
            <li className="media mb-3">
              <div className="mr-3 media-head">
                {e.done && (
                  <button
                    className="btn btn-toggle"
                    onClick={() => this.toggleDone(i)}
                  >
                    {"\u2713"}
                  </button>
                )}
                {!e.done && (
                  <button
                    className="btn btn-toggle"
                    onClick={() => this.toggleDone(i)}
                  >
                    {"\u25cb"}
                  </button>
                )}
              </div>
              <div className="media-body">
                <h5 className={`mt-2 mb-1 ${e.done ? "done" : "undone"}`}>
                  {editing !== i && (
                    <span
                      onClick={() => this.toggleEdit(i)}
                      className={
                        typeof e.value === "string" && e.value.length > 0
                          ? ""
                          : "empty"
                      }
                    >
                      {typeof e.value === "string" && e.value.length > 0
                        ? e.value
                        : "<empty>"}
                    </span>
                  )}
                  {editing === i && (
                    <textarea
                      ref={(el) => (this.input = el)}
                      className="form-control"
                      value={e.value}
                      onChange={this.handleEditing}
                      onBlur={this.handleBlur}
                    />
                  )}
                </h5>
              </div>
              {deleteMode && (
                <div className="media-foot">
                  <div className="btn-toolbar" role="toolbar">
                    {removing !== i && (
                      <button
                        className="btn btn-outline-light btn-sm mr-2"
                        onClick={() => {
                          this.remove(i);
                        }}
                      >
                        {"\u{2718}"} Remove
                      </button>
                    )}
                    {removing === i && (
                      <div style={{ color: "white" }}>
                        {"Are you sure want to delete ? "}
                        <button
                          className="btn btn-outline-light btn-sm mr-2"
                          onClick={() => {
                            this.removeConfirm(i);
                          }}
                        >
                          Yes
                        </button>
                        <button
                          className="btn btn-outline-dark btn-sm mr-2"
                          onClick={this.removeCancel}
                        >
                          No
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  }
  renderInput() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3 hover-Style">
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={value}
            onChange={this.handleChange}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-light" type="submit">
              {"\u002b"} Add
            </button>
          </div>
        </div>
        <small className="form-text">
          Kindly Press <kbd>enter</kbd> on done to add.
        </small>
      </form>
    );
  }
  render() {
    return (
      <div>
        <div>
          <button type="button" class="btn btn-dark postFix" onClick={()=>this.props.logoutFunc()}>
            Logout
          </button>
        </div>
        <div className="container">
          <h4
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: "800",
            }}
          >
            {" "}
            {"Hi , " + this.props.username + " your task status"}
          </h4>
          <div
            style={{
              textAlign: "center",
              color: "black",
              display: "flex",
              margin: "2% 0%",
            }}
          >
            <h5 style={{ margin: "0% 12%" }}>
              {"Number of Completed Task is " +
                this.state.list.filter((data) => data.done === true)
                  .length}{" "}
            </h5>
            <h5 style={{ margin: "0% 10%" }}>
              {"Number of InCompleted Task is " +
                this.state.list.filter((data) => data.done !== true).length}
            </h5>
          </div>
          <div className="row mb-5">
            <div className="col">
              <h1
                style={{
                  textAlign: "center",
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                TODO List{" "}
              </h1>

              {this.renderList()}
              {this.renderInput()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;