import React from "react";
import Countdown from "react-countdown";

import Timer from "../timer";
import SequenceGrid from "./sequenceGrid";
import SequenceResult from "./sequenceResult";
import * as constants from "./sequenceConstants";
import gameStates from "./gameStates";

class SequenceGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLimit: this.props.timeLimit,
      showTimer: this.props.showTimer,
      sequence: Array.from(
        { length: this.props.timeLimit * constants.MAX_DIGITS_PER_SECOND },
        () => Math.floor(Math.random() * 10)
      ),
      handleNewGame: this.props.handleNewGame,
      currentAnswer: [""],
      gameState: gameStates.MEMORIZE,
    };

    this.handleMemorizationCompletion =
      this.handleMemorizationCompletion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
  }

  renderSwitch() {
    switch (this.state.gameState) {
      case gameStates.MEMORIZE:
        return (
          <>
            <p>Memorize as many digits as possible before the time runs out.</p>
            <p>Navigate using arrow keys, or A and D.</p>
            <div>
              <SequenceGrid sequence={this.state.sequence} />
            </div>
            <div>
              <Countdown
                date={
                  Date.now() +
                  this.state.timeLimit * constants.MILLISECONDS_IN_SECOND
                }
                renderer={this.countdownRenderer}
                onComplete={this.handleMemorizationCompletion}
              />
            </div>
            <button
              className="new-game-button"
              onClick={this.state.handleNewGame}
            >
              Restart
            </button>
          </>
        );
      case gameStates.SOLVE:
        return (
          <>
            <p>Enter remembered numbers.</p>
            <SequenceGrid
              sequence={this.state.currentAnswer}
              setAnswer={this.setAnswer}
              acceptInput
            />
            <Timer paused={false} visible={this.state.showTimer}></Timer>
            <button onClick={this.handleSubmit}>Submit</button>
          </>
        );
      case gameStates.FINISHED:
        return (
          <SequenceResult
            score={this.calculateScore()}
            submissionDuration={this.submissionDuration}
            sequence={this.state.sequence}
            currentAnswer={this.state.currentAnswer}
            reportFontSize={13}
            handleNewGame={this.state.handleNewGame}
          ></SequenceResult>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="sequence-game">
        {this.renderSwitch(this.state.gameState)}
      </div>
    );
  }

  setAnswer(newAns) {
    this.setState((state) => ({
      ...state,
      currentAnswer: newAns,
    }));
  }

  handleMemorizationCompletion() {
    this.setState((state) => ({
      ...state,
      gameState: gameStates.SOLVE,
    }));
    this.startTime = Date.now();
  }

  handleSubmit() {
    this.setState((state) => ({
      ...state,
      gameState: gameStates.FINISHED,
    }));
    this.submissionDuration = Date.now() - this.startTime;
  }

  // Renderer callback with condition
  countdownRenderer({ minutes, seconds }) {
    return (
      <span>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </span>
    );
  }

  calculateScore() {
    console.log(this.state.sequence, this.state.currentAnswer);
    let ret = 0;
    while (
      ret <
      Math.min(this.state.sequence.length, this.state.currentAnswer.length)
    ) {
      if (this.state.sequence[ret] !== this.state.currentAnswer[ret]) break;
      ++ret;
    }
    return ret;
  }
}

export default SequenceGame;
