# 1. How to Run

Click on the following link to run the website:

https://khadeejah-01.github.io/Frontend-Website/

## Run on Local Machine

Download the ZIP file from GitHub to run locally.

### Steps

1. Open the GitHub repository using your web browser.
2. Click the green **Code** button at the top of the webpage.
3. Download the repository as a ZIP file.
4. Extract the ZIP folder on your device.
5. Open the `index.html` file with any browser.
6. The website "Habit Tracker" will open on your local device.

# 2. Stack and Design Choices

## Stack Choice

I chose a Vanilla Frontend Stack for this website because it was a completely frontend-based project and did not require excessive tool configuration.
Keeping in view the time constraints, I decided to use technologies I was already comfortable with (HTML, CSS, JavaScript) instead of learning a completely new framework during development.

## Design Decisions

  1. Sticky Habit Column

I chose sticky habit columns so that users on smaller screens could checkmark habits easily without losing sight of the habit names while horizontally scrolling.

  2. Horizontal Scrolling on Mobile

I used:
```css
overflow-x:auto;
```
in parent div (.chart) of my conatinerGrid to allow horizontal scroll on smaller screens without collapsing the weekdays.
  3. For highlighting today, I used transform scale(1.05) but it introduced a horizontal scrollbar even on full screen. So I added:
    1. padding: 5px; to .chart (gave room for scaled transform)
    2.box-sizing: border-box; to both .conatinerGrid and to grid children (prevent the overlap of habit column over streak) 
  4. Week Structure Design: I used monday to sunday because it feels more productive and aligns better with workflow systems.
  5. Streak interpretation: Streak counts checked days in the current visible week.

## 3. Responsiveness and Accessiblity

  1. On phone my app's containerGrid allows horizontal scrolling instead of breaking the days columns.
On laptop it takes up 100% width with some padding and margin.
  2. I added keyboard navigation to the "addHabitBtn" so now it allows us to add new habit by both mouse click, as well as enter key.
  3. Color Inspiration Theme: For the title icon I chose a bee because it depicts hardwork and consistency. I aligned this concept in the theme of the website by adding yellow as it also displays optimism, and dedication.
  4. Because I had chosen my theme to revolve around "yellow" color and "Bees", then I referred to some free color palletes available online to get to know what border color would go with yellow and orange, thus used a dark bluish shade.
  5. I added some motivational quotes on top to motivate the user.  
  4. I added a font from "google fonts" to enhance the UI
  5. I used emotes for "delete" and "rename" button to ease usability.
  6. Empty State: For empty state (no habits) I added a string on top that asks user to start making habits.
  7. Whenver habit is checked, a pop sound is heard for congratulating upon doing a habit successfully.
  8.I could add icons from googleFonts to ease interaction but I think the website's UI is easy enough to interact with as it is now.

## 4. AI Usage:

For the scrollbar issue on larger screens, AI gave me an alternate way of using animations. It gave me box-shadow animations to show highlighted today cell. But upon implementing it, It wasn't satisfactory. So I switched back to transform scale and searched out alternate methods to resolve this issue. Then I switched to adjusting the padding and adding box-sizing:border-box.

To save the state of week's progress, I asked AI for possible ways to do it using only JS, and I decided to use objects for each habit. Then AI helped me in modifying the checkboxes eventListener by adding the updated checkbox to habit object.

## 5. Honest Gap

-> Upon checking Habit: I have added sound, but I would improve it further by adding a toast message of congratulations upon every habit user checks.

->Current streak logic works for visible week data but long term consecutive streak calculations across week boundaries could be improved further. It can be done by using actual dates instead of weekly arrays.







