class DiaryEntry {

  constructor(diaryId, containerElement) {
    this.containerElement = containerElement;
    this.diaryId = diaryId;

    const controlBarContainer = document.querySelector('.control-bar');
    const controlBar = new ControlBar(controlBarContainer);

    console.log(diaryId);
    this.containerElement.classList.remove('hidden');
  }

}