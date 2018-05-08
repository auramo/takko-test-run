import React from "react"
import Header from "./header"

class TestView1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { running: true }
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.ready("test1")
      this.setState({ running: false })
    }, 1000)
  }
  render() {
    if (this.state.running) {
      return <div>Test 1 running</div>
    } else {
      return <div>Test 1 done</div>
    }
  }
}

class TestView2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { progress: 0 }
  }
  componentDidMount() {
    const simulateDelayedProgress = () => {
      if (this.state.progress < 10) {
        setTimeout(simulateDelayedProgress, 1000)
        this.setState({ progress: this.state.progress + 1 })
      } else {
        this.props.ready("test2")
      }
    }
    simulateDelayedProgress()
  }
  render() {
    if (this.state.progress < 10) {
      return (
        <div>
          Test 2 running<progress value={this.state.progress} max="10" />
        </div>
      )
    } else {
      return <div>Test 2 done</div>
    }
  }
}

const tests = {
  test1: { view: TestView1, next: "test2" },
  test2: { view: TestView2, next: null }
}

class MainView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currentTest: null, alreadyRan: [] }
  }
  renderCurrentTest() {
    if (this.state.currentTest) {
      return React.createElement(tests[this.state.currentTest].view, {
        ready: testName => {
          console.log("test ready:", testName)
          const nextTest = tests[testName].next
          this.setState({ alreadyRan: [...this.state.alreadyRan, testName] })
          if (nextTest) this.setState({ currentTest: nextTest })
        }
      })
    } else {
      return (
        <button
          onClick={() => {
            this.setState({ currentTest: "test1" })
          }}
        >
          Start
        </button>
      )
    }
  }
  render() {
    return (
      <div>
        <div>Executed tests: {this.state.alreadyRan.join(",")}</div>
        {this.renderCurrentTest()}
      </div>
    )
  }
}

export default params => (
  <div>
    <Header selectedTab="tab1" />
    <div className="view-content">
      <MainView />
    </div>
  </div>
)
