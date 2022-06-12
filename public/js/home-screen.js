class HomeScreen {

  constructor(containerElement) {
    this.containerElement = containerElement;
    const button = document.querySelector('.new-diary-button');

    this.createNewDiary = this.createNewDiary.bind(this);

    button.addEventListener("click", this.createNewDiary)

    this.containerElement.classList.remove('hidden')
  }

  async createNewDiary() {
    // async await is just a neater way than using promises(then) and functions like jsonReady etc
    const result = await fetch('/newDiary', { method: 'POST' });
    const json = await result.json();
    console.log(json.id);
    window.location.href = `/diary/${json.id}`;
  }
}