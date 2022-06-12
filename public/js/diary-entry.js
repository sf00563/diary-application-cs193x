class DiaryEntry {

  constructor(diaryId, containerElement) {
    this.containerElement = containerElement;
    this.diaryId = diaryId;
    this.date = '';
    this.title = document.querySelector('.entry h1');
    this.prompt = document.querySelector('.entry p');
    this.textArea = document.querySelector('textarea');
    this.paragraph = document.querySelector('.entry-details');
    this.prompts = ['List the things that make you feel powerful.',
      'What is something that made you laugh today?',
      'List the movies that you want to watch.',
      'List the things that make you feel peaceful.',
      'List your greatest comforts.',
      'What is something that brightens your day?',
      'List three things you accomplished today.',
      'What is something you look forward to every day?',
      'What is a game that you like to play?',
      'What is your Sunday ritual?',
      'List the most memorable moments of this month so far.',
      'List some things you want to do outdoors.',
      'If you could live anywhere you wanted, where would you live?',
      'List what you would spend a million dollars on, just for you.',
      'When do you feel most energized?',
      'List the things that make you feel excited.',
      'List your favorite snacks or treats.',
      'What has you busy this week?',
      'List the people you admire.',
      'List the happiest moments of your year so far.',
      'What hobby would you like to pick up?',
      'List the ways you love to have fun.',
      'Describe something you learned today',
      'List something fun you did or will do today.',
      'What is your dream job?',
      'List the things that inspire you.',
      'List something you did today that you are proud of.',
      'Find a quote that you like and write it down here.',
      'List something you should ignore.',
      'Talk about something you are excited about next month.',
      'List three traits you would like others to see in you.']

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

  async loadEntry(value) {
    const options = { month: 'long', day: 'numeric' };
    this.paragraph.innerHTML = '';

    if (value === 0) {
      this.date = new Date();
    } else {
      this.date.setDate(this.date.getDate() + value);
    }

    const day = this.date.toLocaleDateString().substring(0, 2);
    let index = 0;
    if (day.charAt(0) === 0) {
      index = parseInt(day.charAt(1));
    } else {
      index = parseInt(day);
    }

    this.title.textContent = this.date.toLocaleDateString('en-US', options);
    this.prompt.textContent = this.prompts[index - 1];

    const result = await fetch(`/lookupEntry/${this.diaryId}?date=${this.date.toLocaleDateString()}`);
    const data = await result.json();

    console.log("get for content", data);

    if (data.result) {
      this.paragraph.textContent = data.result.content;
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

  async updateEntry() {
    if (!this.textArea.classList.contains('hidden')) {
      const text = this.textArea.value;
      if (this.paragraph.textContent !== text) {
        const entry = {
          content: text
        };
        const fetchOptions = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(entry)
        }
        const result = await fetch(`/newEntry/${this.diaryId}?date=${this.date.toLocaleDateString()}`, fetchOptions);
        const data = await result.json();
        console.log("return from post new content", data);
        this.paragraph.textContent = text
      }
      this.textArea.classList.add('hidden');
      this.paragraph.classList.remove('hidden');
    }
    this.controlBar.revertToNormalContols();

  }


}