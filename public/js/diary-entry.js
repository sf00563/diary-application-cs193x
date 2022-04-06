class DiaryEntry {

  constructor(diaryId, containerElement) {
    this.containerElement = containerElement;
    this.diaryId = diaryId;
    this.currentDate = new Date();
    this.title = document.querySelector('.entry h1');
    this.textArea = document.querySelector('textarea');
    this.paragraph = document.querySelector('.entry-details');

    this.showTextArea = this.showTextArea.bind(this);
    this.updateEntry = this.updateEntry.bind(this);

    const options = { month: 'long', day: 'numeric' };

    this.title.textContent = this.currentDate.toLocaleDateString('en-US', options)

    const controlBarContainer = document.querySelector('.control-bar');
    this.controlBar = new ControlBar(controlBarContainer);

    const textContainer = document.querySelector('.text-container');
    textContainer.addEventListener("click", this.showTextArea);

    const entryScreen = document.querySelector('.entry');
    entryScreen.addEventListener("click", this.updateEntry);

    this.loadEntry();
    this.containerElement.classList.remove('hidden');
  }

  loadEntry() {
    const objectr = {
      id: 'sfdhkjfdskjhjhkdfs',
      diaryId: '87345874358',
    }

    if (objectr.content) {
      this.paragraph.textContent = objectr.content;
      this.paragraph.classList.remove('hidden');
    }
  }

  showTextArea(event) {
    event.stopPropagation();
    this.paragraph.classList.add('hidden');
    this.textArea.textContent = this.paragraph.textContent;
    this.controlBar.changeToAcceptContols();
    this.textArea.classList.remove('hidden');
  }

  updateEntry() {
    if (!this.textArea.classList.contains('hidden')) {
      const text = this.textArea.value;
      console.log(text);
      if (this.paragraph.textContent !== text) {
        console.log("update on db");
        this.paragraph.textContent = text
      }
      this.textArea.classList.add('hidden');
      this.paragraph.classList.remove('hidden');
    }
  }


}