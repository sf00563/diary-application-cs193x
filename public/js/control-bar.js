class ControlBar {
  constructor(containerElement, updateCallBack, nextEntryCallBack) {
    this.containerElement = containerElement;
    this.updateCallBack = updateCallBack;
    this.nextEntryCallBack = nextEntryCallBack;
    this.div = document.createElement('div');

    const p = document.createElement('p');
    p.textContent = "home";
    const image = document.createElement('img');
    image.src = './img/checked.png';
    image.classList.add('hidden');

    const backImage = document.createElement('img');
    backImage.src = './img/back.png';
    this.backButton = document.createElement('button');
    this.backButton.append(backImage);

    const forwardImage = document.createElement('img');
    forwardImage.src = './img/forward.png';
    this.forwardButton = document.createElement('button');
    this.forwardButton.append(forwardImage);

    this.todaysDay = this.todaysDay.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.previousDay = this.previousDay.bind(this);

    this.div.addEventListener("click", this.todaysDay);
    this.forwardButton.addEventListener("click", this.nextDay);
    this.backButton.addEventListener("click", this.previousDay);

    this.containerElement.append(this.backButton);
    this.div.append(p);
    this.div.append(image);
    this.containerElement.append(this.div);
    this.containerElement.append(this.forwardButton);
  }

  changeToAcceptContols() {
    this.forwardButton.classList.add('hidden');
    this.backButton.classList.add('hidden');
    this.div.removeEventListener("click", this.loadCurrentDate);
    this.div.children[0].classList.add('hidden');
    this.div.children[1].classList.remove('hidden');
    this.div.addEventListener("click", this.updateCallBack);

  }

  revertToNormalContols() {
    this.forwardButton.classList.remove('hidden');
    this.backButton.classList.remove('hidden');
    this.div.removeEventListener("click", this.updateCallBack);
    this.div.addEventListener("click", this.loadCurrentDate);
    this.div.children[0].classList.remove('hidden');
    this.div.children[1].classList.add('hidden');
  }

  todaysDay() {
    this.nextEntryCallBack(0);
  }

  nextDay() {
    this.nextEntryCallBack(1);
  }

  previousDay() {
    this.nextEntryCallBack(-1);
  }


}