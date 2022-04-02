class ControlBar {
  constructor(containerElement) {
    this.containerElement = containerElement;

    const home = document.createElement('p');
    home.textContent = "home";

    const backImage = document.createElement('img');
    backImage.src = './img/back.png';
    const backButton = document.createElement('button');
    backButton.append(backImage);

    const forwardImage = document.createElement('img');
    forwardImage.src = './img/forward.png';
    const forwardButton = document.createElement('button');
    forwardButton.append(forwardImage);

    this.containerElement.append(backButton);
    this.containerElement.append(home);
    this.containerElement.append(forwardButton);
  }
}