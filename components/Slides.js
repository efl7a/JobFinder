import React, { Component } from 'react';
import { ScrollView, Text, View, Dimensions, Button } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width

class Slides extends Component {
  renderSlides() {
    return this.props.data.map((slide, index) => {
        return (
          <View
            key={slide.text}
            style={[styles.slideViewStyle, {backgroundColor: slide.color}]}
          >
            <Text style={styles.slideTextStyle}>{slide.text}</Text>
            {(index === (this.props.data.length - 1)) ?
              <Button
                title={slide.buttonText}
                style={styles.buttonStyle}
                onPress={this.props.onComplete}
              /> : null
            }
          </View>
        );
      })

  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
      >
        {this.renderSlides()}

      </ScrollView>
    );
  }
}

const styles = {

  slideTextStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  slideViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15
  }
};

export default Slides;
