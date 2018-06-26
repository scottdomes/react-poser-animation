import React, { Component } from 'react';
import posed, { tween } from 'react-pose';
import './App.css';

const Image = posed.img({
  normal: { width: '500px', x: '0%' },
  large: {
    width: '1000px',
    x: '-25%'
  },
  closing: {
    width: '500px',
    x: '0%',
  },
});

class Modal extends Component {
  state = { pose: 'large' };

  beginClose = () => {
    this.setState({ pose: 'closing' });
  };

  handlePoseComplete = () => {
    if (this.state.pose === 'closing') {
      this.props.close();
    }
  };

  render() {
    return (
      <div onClick={this.beginClose} className="Modal" style={this.props.modalEmanationPoint}>
        <Image
          onPoseComplete={this.handlePoseComplete}
          pose={this.state.pose}
          initialPose="normal"
          src={this.props.src}
          className="App-logo"
          alt="logo"
        />
      </div>
    );
  }
}

class ImageContainer extends Component {
  state = { showModal: false };

  handleToggleModal = e => {
    const { left, top } = this.image.getBoundingClientRect()
    this.setState(prev => ({ showModal: !prev.showModal, modalEmanationPoint: { left, top } }));
  };

  render() {
    const { src } = this.props;
    return (
      <div className="ImageContainer">
        <img
          onClick={this.handleToggleModal}
          src={src}
          ref={elem => (this.image = elem)}
          className="ImageContainer-image"
          alt="logo"
        />
        {this.state.showModal && (
          <Modal close={this.handleToggleModal} src={src} modalEmanationPoint={this.state.modalEmanationPoint} />
        )}
      </div>
    );
  }
}

class App extends Component {
  render() {
    const images = [require('./lion.jpg'), require('./lion.jpg')];
    return (
      <div className="App">
        {images.map(img => <ImageContainer src={img} />)}
      </div>
    );
  }
}

export default App;
