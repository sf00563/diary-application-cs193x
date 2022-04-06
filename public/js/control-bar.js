class ControlBar {
  constructor(containerElement) {
    this.containerElement = containerElement;

    const home = document.createElement('p');
    home.textContent = "home";

    const backImage = document.createElement('img');
    backImage.src = './img/back.png';
    this.backButton = document.createElement('button');
    this.backButton.append(backImage);

    const forwardImage = document.createElement('img');
    forwardImage.src = './img/forward.png';
    this.forwardButton = document.createElement('button');
    this.forwardButton.append(forwardImage);

    this.containerElement.append(this.backButton);
    this.containerElement.append(home);
    this.containerElement.append(this.forwardButton);
  }

  changeToAcceptContols() {
    this.forwardButton.classList.add('hidden');
    this.backButton.classList.add('hidden');
  }
}