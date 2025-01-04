export default function Insights() {
    return `
        <h2>Generate Reports & Export Data</h2>
        <form id="insights-form">
            <div>
                <label for="start-date">Start Date:</label>
                <input type="date" id="start-date" name="start-date" required>
            </div>
            <div>
                <label for="end-date">End Date:</label>
                <input type="date" id="end-date" name="end-date" required>
            </div>
            <div class="button-group">
                <button type="button" id="workout-report-btn">Workout Report</button>
                <button type="button" id="habits-report-btn">Habits Report</button>
                <button type="button" id="protein-report-btn">Track Protein</button>
                <button type="button" id="export-habit-btn">Export Habit Data</button>
                <button type="button" id="export-protein-btn">Export Protein Data</button>
                <button type="button" id="export-workout-btn">Export Workout Data</button>
            </div>
        </form>
        <div id="report"></div>
    `;
}