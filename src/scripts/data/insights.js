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
            <div class="form-section">
                <span class="form-label">Reports:</span>
                <div class="button-group report-buttons">
                    <button type="button" id="workout-report-btn">Workout</button>
                    <button type="button" id="habits-report-btn">Habits</button>
                    <button type="button" id="protein-report-btn">Protein</button>
                </div>
            </div>
            <hr>
            <div class="form-section">
                <span class="form-label">Export Data:</span>
                <div class="button-group export-buttons">
                    <button type="button" id="export-workout-btn">Workout Data</button>
                    <button type="button" id="export-habit-btn">Habit Data</button>
                    <button type="button" id="export-protein-btn">Protein Data</button>
                </div>
            </div>
        </form>
        <div id="report"></div>
    `;
}