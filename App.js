import React from 'react';
import { View } from 'react-native';
import { Button, Text, Header, CheckBox, Slider } from 'react-native-elements';
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
          centerComponent={{ text: 'SPERTISPORT', style: { color: 'white', fontSize: 26 } }}
        />

        <Text h4>Visual Training</Text>

        <Text style={{fontWeight: 'bold'}}>Select training duration</Text>
        <Text>{this.state.duration} seconds</Text>
        <Slider
          style={{
            width: '80%'
          }}
          value={this.state.duration}
          minimumValue={10} 
          maximumValue={120}
          step={1}
          onValueChange={(duration) => this.setState({duration})} />
        

        <Text style={{fontWeight: 'bold'}}>Select training interval</Text>
        <Text>{this.state.interval} seconds</Text>
        <Slider
          style={{
            width: '80%'
          }}
          value={this.state.interval}
          minimumValue={1}
          step={0.5} 
          maximumValue={10}
          onValueChange={(interval) => this.setState({interval})} />
          
        
        <Text>Select colors you want</Text>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          {
          colors.map(item => (
                <CheckBox
                  key={item.name}
                  checkedIcon='check-circle'
                  uncheckedIcon='circle'
                  checkedColor={item.name}
                  uncheckedColor={item.name}
                  checked={this.state.checkedColors.get(item.name)}
                  onPress={() => this.handleChange(item.name)}
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
          style={{
            height: 100,
            width: 300,
            padding: 20,
            opacity: (this.state.training) ? 0 : 1,
          }}
          disabled={this.state.checkedColors.size == 0}
          onPress={() => this.countDownTraining()}
          title='Start Exercize'
        />

        
      </View>
    );
  }


}

