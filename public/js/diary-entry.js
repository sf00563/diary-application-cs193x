class DiaryEntry {

  constructor(diaryId, containerElement) {
    this.containerElement = containerElement;
    this.diaryId = diaryId;
    this.date = '';
    this.title = document.querySelector('.entry h1');
    this.textArea = document.querySelector('textarea');
    this.paragraph = document.querySelector('.entry-details');

    this.showTextArea = this.showTextArea.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.loadEntry = this.loadEntry.bind(this);

    const controlBarContainer = document.querySelector('.control-bar');
    this.controlBar = new ControlBar(controlBarContainer, this.updateEntry, this.loadEntry);

    const textContainer = document.querySelector('.text-container');
    textContainer.addEventListener("click", this.showTextArea);

    const entryScreen = document.querySelector('.entry');
    entryScreen.addEventListener("click", this.updateEntry);

    this.loadEntry(0);
    this.containerElement.classList.remove('hidden');
  }

  loadEntry(value) {
    if (value === 0) {
      this.date = new Date();
    } else {
      this.date.setDate(this.date.getDate() + value);
    }
    const options = { month: 'long', day: 'numeric' };
    this.title.textContent = this.date.toLocaleDateString('en-US', options);

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
    this.textArea.value = this.paragraph.textContent;
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
    this.controlBar.revertToNormalContols();

  }


}