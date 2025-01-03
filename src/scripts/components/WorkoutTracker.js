import { exercises } from '../data/exercises.js';

export default function WorkoutTracker() {
    const focusAreas = Object.keys(exercises);

    return `
        <h2>Track Workout</h2>
        <div class="button-container">
            <button id="add-routine-btn">Add Routine</button>
            <button id="end-workout-btn" style="display:none;">End Workout</button>
        </div>
        <div id="routines"></div>
    `;
}