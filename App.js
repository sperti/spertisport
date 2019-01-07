import React from 'react';
import { View } from 'react-native';
import { Button, Text, Header, CheckBox } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import colors from './colors';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      duration: 30,
      interval: 3,
      checkedColors: new Map(),
      showTimer: false,
      buttonDisabled: true,
      training: false,
      trainingBackground: 'white',
      countdown: 5
    };

    this.startTraining = this.startTraining.bind(this);
    this.countDownTraining = this.countDownTraining.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(color) {
    let colors = this.state.checkedColors;
    if(colors.has(color)) {
      colors.delete(color);
    } else {
      colors.set(color, true);
    }

    this.setState({ checkedColors: colors });
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

    this.setState({countdown: 'Training...'});

    let interval = setInterval(() =>{
      let keys = Array.from(this.state.checkedColors.keys());
      let random = Math.floor(Math.random() * keys.length);
      console.log(keys[random]);
      this.setState({trainingBackground: keys[random]})
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
        background: 'white'
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
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          {
          colors.map(item => (
                <CheckBox
                  checkedIcon='check-circle'
                  uncheckedIcon='circle'
                  checkedColor={item.name}
                  uncheckedColor={item.name}
                  checked={this.state.checkedColors.get(item.name)}
                  onPress={(event) => this.handleChange(item.name)}
                  size={50}
                  style={{
                    margin: 3,
                    width: 100
                  }}
                />
            ))
          }
        </View>
        { this.state.training && <View style={{position: 'absolute', zIndex: 2, backgroundColor: this.state.trainingBackground, left: 0, right: 0, bottom: 0, top: 0, flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}><Text h1>{this.state.countdown}</Text></View> }

        <Button
          style={{height: 50}}
          disabled={this.state.checkedColors.size == 0}
          onPress={() => this.countDownTraining()}
          title='Start Exercize'
        />

      </View>
    );
  }


}

