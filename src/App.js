import React, { Component } from 'react';
import posed, { tween } from 'react-pose';
import './App.css';

const initial = { height: 'auto', width: '500px', flip: true };

const Image = posed.img({
  normal: initial,
  large: {
    height: '100vh',
    width: 'auto',
    y: 0,
    flip: true,
  },
  closing: initial,
});

const ModalContainer = posed.div({
  mount: {
    y: ({ y }) => y,
  },
  mounted: {
    y: 20,
  },
});

class Modal extends Component {
  state = { imagePose: 'large', modalPose: 'mounted' };

  beginClose = () => {
    this.setState({ imagePose: 'closing', modalPose: 'mount' });
  };

  handlePoseComplete = () => {
    if (this.state.imagePose === 'closing') {
      this.props.close();
    }
  };

  render() {
    return (
      <ModalContainer
        onClick={this.beginClose}
        className="Modal"
        initialPose="mount"
        pose={this.state.modalPose}
        y={this.props.modalEmanationPoint.top}
      >
        <Image
          onPoseComplete={this.handlePoseComplete}
          pose={this.state.imagePose}
          initialPose="normal"
          src={this.props.src}
          className="ImageContainer-image"
          alt="logo"
        />
      </ModalContainer>
    );
  }
}

class ImageContainer extends Component {
  state = { showModal: false };

  handleToggleModal = e => {
    const { top } = this.image.getBoundingClientRect();
    this.setState(prev => ({
      showModal: !prev.showModal,
      modalEmanationPoint: { top },
    }));
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
          style={this.state.showModal ? { opacity: 0 } : {}}
        />
        {this.state.showModal && (
          <Modal
            close={this.handleToggleModal}
            src={src}
            modalEmanationPoint={this.state.modalEmanationPoint}
          />
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
