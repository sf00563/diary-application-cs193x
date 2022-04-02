class HomeScreen {

  constructor(containerElement) {
    this.containerElement = containerElement;
    const button = document.querySelector('.new-diary-button');

    this.createNewDiary = this.createNewDiary.bind(this);

    button.addEventListener("click", this.createNewDiary)

    this.containerElement.classList.remove('hidden')
  }

  createNewDiary() {
    console.log("hi");
    const result = {
      idDiary: "12345"
    }
    //window.location.href = `/id/${result.idDiary}`
  }
}