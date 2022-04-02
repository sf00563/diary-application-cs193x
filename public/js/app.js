class App {

  constructor() {

    if (false) {
      this.showHomeScreen();
    } else {
      this.showDiaryScreen("fdskjfdskfdskj");
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