# My Web App

This is my very first experiment with a web application and I built it with the help of Visual Studio copilot.  The goal was simpliciy to help users quickly track their workout routines, habits, and protein intake.  While there are several apps on the market, they are either for pay or get way too complicated increasing the users learning curve and getting the way of doing what they want to do.  Workout and monitor progress.

## Project Structure

```
CPI/
├── .gitignore
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── src/
│   ├── images/
│   │   └── logo.png
│   ├── pages/
│   │   ├── email.html
│   │   ├── export.html
│   │   └── insights.html
│   ├── scripts/
│   │   ├── Utils/
│   │   │   └── helpers.js
│   │   ├── app.js
│   │   ├── components/
│   │   │   ├── HabitTracker.js
│   │   │   ├── ProteinTracker.js
│   │   │   └── WorkoutTracker.js
│   │   ├── data/
│   │   │   ├── exercises.js
│   │   │   ├── export.js
│   │   │   └── insights.js
│   └── styles/
│       └── style.css
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-web-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the web application, open `CPI/index.html` in your web browser. You can also set up a local server for a better development experience.

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes. 

## License

This project is licensed under the MIT License.
