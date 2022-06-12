class App {

  constructor() {
    const urlPathString = window.location.pathname;
    const parts = urlPathString.split('/');
    console.log(parts);
    if (parts.length > 2 && parts[2].length > 0) {
      console.log(parts);
      const diaryId = parts[2];
      this.showDiaryScreen(diaryId);
    } else {
      this.showHomeScreen();
    }


  }

  showHomeScreen() {
    const homeScreenContainer = document.querySelector('#home-screen');
    const homeScreen = new HomeScreen(homeScreenContainer);
  }

  showDiaryScreen(diaryId) {
    const containerElement = document.querySelector('#diary-screen');
    const diaryScreen = new DiaryEntry(diaryId, containerElement);
  }

}