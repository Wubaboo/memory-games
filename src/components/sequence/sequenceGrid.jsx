import React from "react";

import * as constants from "./sequenceConstants";
import SequenceCell from "./sequenceCell";

import "../../styles/sequence.css";

class SequenceGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      acceptInput: this.props.acceptInput,
      sequence: this.props.sequence,
      selectedIdx: 0,
      scrollDir: constants.RIGHT_SCROLL,
      currentCell: React.createRef(),
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", (e) => {
      // Movement keys
      if (
        e.keyCode === constants.KEYCODE_RIGHT ||
        e.keyCode === constants.KEYCODE_D
      ) {
        this.setState((state) => ({
          ...state,
          selectedIdx: Math.min(
            state.selectedIdx + 1,
            state.sequence.length - 1
          ),
          scrollDir: constants.RIGHT_SCROLL,
        }));
      } else if (
        e.keyCode === constants.KEYCODE_LEFT ||
        e.keyCode === constants.KEYCODE_A
      ) {
        this.setState((state) => ({
          ...state,
          selectedIdx: Math.max(state.selectedIdx - 1, 0),
          scrollDir: constants.LEFT_SCROLL,
        }));
      }

      // Input keys
      if (this.state.acceptInput) {
        if (
          e.keyCode >= constants.KEYCODE_ZERO &&
          e.keyCode <= constants.KEYCODE_NINE
        ) {
          // Numbers
          const newAnswer = [
            ...this.state.sequence.slice(0, -1),
            e.keyCode - constants.KEYCODE_ZERO,
            this.state.sequence[this.state.sequence.length - 1],
          ];
          this.props.setAnswer(newAnswer); // Propagates change up to parent.
          this.setState((state) => ({
            ...state,
            sequence: newAnswer,
            selectedIdx: Math.min(state.selectedIdx + 1, state.sequence.length),
            scrollDir: constants.RIGHT_SCROLL,
          }));
        } else if (e.keyCode == constants.KEYCODE_BACKSPACE) {
          // Backspace
          const newAnswer = [
            ...this.state.sequence.slice(0, -2),
            this.state.sequence[this.state.sequence.length - 1],
          ];
          this.props.setAnswer(newAnswer);
          this.setState((state) => ({
            ...state,
            sequence: newAnswer,
            selectedIdx: Math.max(state.selectedIdx - 1, 0),
            scrollDir: constants.LEFT_SCROLL,
          }));
        }
      }

      // Scroll selected cell into view
      if (this.state.currentCell && this.state.currentCell.current) {
        var targetLeft;
        if (
          this.state.selectedIdx <
          constants.CELLS_IN_GRID - constants.SCROLL_OFF
        ) {
          targetLeft = 0;
        } else if (this.state.scrollDir === constants.RIGHT_SCROLL) {
          targetLeft =
            constants.GRID_MARGIN +
            constants.SCROLL_UNIT *
              (this.state.selectedIdx -
                constants.CELLS_IN_GRID +
                constants.SCROLL_OFF +
                1);
        } else if (this.state.scrollDir === constants.LEFT_SCROLL) {
          targetLeft =
            constants.GRID_MARGIN +
            constants.SCROLL_UNIT *
              (this.state.selectedIdx - constants.SCROLL_OFF);
        }

        this.state.currentCell.current.scrollTo({
          left: targetLeft,
          behavior: "smooth",
        });
      }
    });
  }

  render() {
    return (
      <div className="sequence-game-grid" ref={this.state.currentCell}>
        {this.state.sequence.map((item, idx) => (
          <SequenceCell
            selected={this.state.selectedIdx === idx}
            key={idx}
            // Attach ref only to element
            // we're scrolling to.
            // ref={this.state.selectedIdx === idx ? this.state.currentCell : null}
          >
            {item}
          </SequenceCell>
        ))}
      </div>
    );
  }
}

export default SequenceGrid;
