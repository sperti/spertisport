import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text, Header, CheckBox } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      duration: 30,
      interval: 3,
      red: false,
      green: false,
      blue: false,
      yellow: false,
      showTimer: false,
      buttonDisabled: true,
      training: false,
      trainingBackground: 'white',
      countdown: 5
    };

    this.startTraining = this.startTraining.bind(this);
    this.countDownTraining = this.countDownTraining.bind(this);
  }

  countDownTraining () {
    if(this.state.training)
      return;

    this.setState({training: true});

    let countdown = setInterval(() => {
      this.setState({countdown: this.state.countdown-1});
      if(this.state.countdown == 0) {
        this.startTraining();
        clearInterval(countdown);
      }
    }, 1000);
  }

  startTraining () {

    let colors = [];
    if(this.state.red)
        colors.push("red");
    if(this.state.green)
        colors.push("green");
    if(this.state.blue)
        colors.push("blue");
    if(this.state.yellow)
        colors.push("yellow");

    this.setState({countdown: 'training'});

    let interval = setInterval(() =>{
      let random = Math.floor(Math.random() * colors.length); 
      this.setState({trainingBackground: colors[random]})
      setTimeout(() => {
        this.setState({trainingBackground: 'white'})
      }, 500);
    }, this.state.interval*1000);

    setTimeout(() => {
      clearInterval(interval);
      this.setState({training: false})
      this.setState({countdown: 5});
    }, this.state.duration*1000);

  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Header
          centerComponent={{ text: 'SPERTISPORT', style: { color: 'white' } }}
        />

        <Text h2>Visual Training</Text>

        <Text>Select training duration in seconds</Text>
        <NumericInput rounded='true' initValue={this.state.duration} value={this.state.duration} minValue={10} maxValue={120} onChange={(duration) => this.setState({duration})} />
        
        <Text>Select training interval in seconds</Text>
        <NumericInput rounded='true' initValue={this.state.interval} valueType='real' step={0.5} value={this.state.interval} minValue={1} maxValue={10} onChange={(interval) => this.setState({interval})} />
    
        <Text>Select colors you want</Text>
        <CheckBox
          title='Red'
  checkedIcon='check-circle'
  uncheckedIcon='circle'
          checkedColor='red'
          uncheckedColor='red'
          checked={this.state.red}
          onPress={() => this.setState({red: !this.state.red})}
        />
        <CheckBox
          title='Green'
  checkedIcon='check-circle'
  uncheckedIcon='circle'
          checkedColor='green'
          uncheckedColor='green'
          checked={this.state.green}
          onPress={() => this.setState({green: !this.state.green})}
        />
        <CheckBox
          title='Blue'
  checkedIcon='check-circle'
  uncheckedIcon='circle'
          checkedColor='blue'
          uncheckedColor='blue'
          checked={this.state.blue}
          onPress={() => this.setState({blue: !this.state.blue})}
        />
        <CheckBox
          title='Yellow'
  checkedIcon='check-circle'
  uncheckedIcon='circle'
          checkedColor='yellow'
          uncheckedColor='yellow'
          checked={this.state.yellow}
          onPress={() => this.setState({yellow: !this.state.yellow})}
        />

        { this.state.training && <View style={{position: 'absolute', zIndex: 2, backgroundColor: this.state.trainingBackground, left: 0, right: 0, bottom: 0, top: 0, flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}><Text h1>{this.state.countdown}</Text></View> }

        <Button
          style={{height: 50}}
          disabled={!(this.state.red || this.state.green || this.state.blue || this.state.yellow)}
          onPress={() => this.countDownTraining()}
          title='Start Exercize'
        />

      </View>
    );
  }


}

