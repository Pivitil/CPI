import WorkoutTracker from './components/WorkoutTracker.js';
import HabitTracker from './components/HabitTracker.js';
import ProteinTracker from './components/ProteinTracker.js';
import Insights from './data/insights.js';
import { exercises } from './data/exercises.js'; 

document.addEventListener('DOMContentLoaded', () => {
    fetch('src/pages/header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            setupEventListeners();
        });
});

function setupEventListeners() {
    document.getElementById('workout-btn').addEventListener('click', () => {
        displayAppContent(WorkoutTracker);
        addWorkoutFormListener();
    });

    document.getElementById('habit-btn').addEventListener('click', () => {
        displayAppContent(HabitTracker);
        addHabitFormListener();
    });

    document.getElementById('protein-btn').addEventListener('click', () => {
        displayAppContent(ProteinTracker);
        addProteinFormListener();
    });

    document.getElementById('insights-btn').addEventListener('click', () => {
        displayAppContent(Insights);
        addInsightsFormListener();
    });
}

function displayAppContent(contentFunction) {
    document.getElementById('app').innerHTML = contentFunction();
    document.getElementById('app').style.display = 'block'; // Show the app div
}

function addWorkoutFormListener() {
    let routineCounter = 0;

    const addRoutineBtn = document.getElementById('add-routine-btn');
    const endWorkoutBtn = document.getElementById('end-workout-btn');

    if (addRoutineBtn) {
        addRoutineBtn.addEventListener('click', addRoutine);
    }

    if (endWorkoutBtn) {
        endWorkoutBtn.addEventListener('click', endWorkout);
    }

    function addRoutine() {
        routineCounter++;
        const routineDiv = document.createElement('div');
        routineDiv.classList.add('routine');
        routineDiv.innerHTML = `
            <h3>Routine ${routineCounter}</h3>
            <div>
                <select id="focus-area" name="focus-area" required>
                    <option value="" disabled selected>Select Focus Area</option>
                    ${Object.keys(exercises).map(area => `<option value="${area}">${area}</option>`).join('')}
                </select>
            </div>
            <div>
                <select id="exercise" name="exercise" required>
                    <option value="" disabled selected>Select Exercise</option>
                </select>
            </div>
            <div id="previous-weights"></div>
            <div id="sets"></div>
            <div class="routine-buttons">
                <button type="button" class="add-set-btn">Add Set</button>
                <button type="button" class="add-routine-btn">Add Routine</button>
                <button type="button" class="end-workout-btn">End Workout</button>
            </div>
        `;
        document.getElementById('routines').appendChild(routineDiv);
        document.getElementById('end-workout-btn').style.display = 'block';

        const focusAreaSelect = routineDiv.querySelector('#focus-area');
        const exerciseSelect = routineDiv.querySelector('#exercise');
        const previousWeightsDiv = routineDiv.querySelector('#previous-weights');

        focusAreaSelect.addEventListener('change', () => {
            const selectedArea = focusAreaSelect.value;
            exerciseSelect.innerHTML = `<option value="" disabled selected>Select Exercise</option>` + exercises[selectedArea].map(exercise => `<option value="${exercise}">${exercise}</option>`).join('');
        });

        exerciseSelect.addEventListener('change', () => {
            const selectedExercise = exerciseSelect.value;
            const workoutData = JSON.parse(localStorage.getItem('workoutData')) || [];
            const exerciseData = workoutData.filter(entry => entry.exercise === selectedExercise);

            if (exerciseData.length === 0) {
                previousWeightsDiv.innerText = 'No previously recorded routine for this exercise.';
                return;
            }

            const weights = exerciseData.map(entry => parseFloat(entry.setWeight));
            const previousLow = Math.min(...weights);
            const previousHigh = Math.max(...weights);
            const pr = Math.max(...weights);

            previousWeightsDiv.innerText = `Previous Low = ${previousLow} | Previous High = ${previousHigh} | PR = ${pr}`;
        });

        routineDiv.querySelector('.add-set-btn').addEventListener('click', () => addSet(routineDiv));
        routineDiv.querySelector('.add-routine-btn').addEventListener('click', addRoutine);
        routineDiv.querySelector('.end-workout-btn').addEventListener('click', endWorkout);
    }

    function addSet(routineDiv) {
        const setsDiv = routineDiv.querySelector('#sets');
        let setCounter = setsDiv.childElementCount + 1;
        const setDiv = document.createElement('div');
        setDiv.classList.add('set');
        setDiv.innerHTML = `
            <h4>Set ${setCounter}</h4>
            <div>
                <input type="number" id="weight" name="weight" placeholder="Enter Weight (lbs)" required>
            </div>
            <div>
                <input type="number" id="reps" name="reps" placeholder="Enter Reps" required>
            </div>
        `;
        setsDiv.appendChild(setDiv);
    }

    function endWorkout() {
        const routines = document.querySelectorAll('.routine');
        const workoutData = [];
        routines.forEach((routine, routineIndex) => {
            const focusArea = routine.querySelector('#focus-area').value;
            const exercise = routine.querySelector('#exercise').value;
            routine.querySelectorAll('.set').forEach((set, setIndex) => {
                const weight = set.querySelector('#weight').value;
                const reps = set.querySelector('#reps').value;
                workoutData.push({
                    timestamp: new Date().toLocaleString(), // Use local time
                    routineNumber: routineIndex + 1,
                    focusArea,
                    exercise,
                    setNumber: setIndex + 1,
                    setWeight: weight,
                    setReps: reps
                });
            });
        });
        let storedWorkoutData = JSON.parse(localStorage.getItem('workoutData')) || [];
        if (!Array.isArray(storedWorkoutData)) {
            storedWorkoutData = [];
        }
        storedWorkoutData.push(...workoutData);
        localStorage.setItem('workoutData', JSON.stringify(storedWorkoutData));
        alert('Workout data saved!');
        document.getElementById('routines').innerHTML = '';
        document.getElementById('end-workout-btn').style.display = 'none';
        routineCounter = 0; // Reset the counter after ending the workout
    }
}

function addHabitFormListener() {
    const habitForm = document.getElementById('habit-form');

    if (habitForm) {
        habitForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission from reloading the page

            const sleep = document.getElementById('sleep').value;
            const stress = document.getElementById('stress').value;
            const weight = document.getElementById('weight').value;
            const notes = document.getElementById('notes').value;

            const habitData = {
                timestamp: new Date().toLocaleString(), // Use local time format
                sleep,
                stress,
                weight,
                notes
            };

            let storedHabitData = JSON.parse(localStorage.getItem('habitData')) || [];
            if (!Array.isArray(storedHabitData)) {
                storedHabitData = [];
            }
            storedHabitData.push(habitData);
            localStorage.setItem('habitData', JSON.stringify(storedHabitData));

            alert('Habit data saved!');
            habitForm.reset(); // Clear the form after submission
        });
    }
}

function addProteinFormListener() {
    const form = document.getElementById('protein-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const proteinGoal = document.getElementById('protein-goal').value;
            const proteinIntake = document.getElementById('protein-intake').value;
            const today = new Date().toLocaleDateString(); // Get today's date in local format

            let proteinData = JSON.parse(localStorage.getItem('proteinData')) || {};
            if (!proteinData[today]) {
                proteinData[today] = { goal: proteinGoal, intake: 0 };
            } else {
                // Update the goal only if it is not already set
                if (!proteinData[today].goal) {
                    proteinData[today].goal = proteinGoal;
                }
            }
            proteinData[today].intake += parseInt(proteinIntake, 10);

            localStorage.setItem('proteinData', JSON.stringify(proteinData));

            updateProteinStatus(today, proteinData[today]);

            // Reset the protein intake input field
            document.getElementById('protein-intake').value = '';

            alert('Protein data saved!');
        });

        // Load protein data and update status when the page is loaded
        const today = new Date().toLocaleDateString();
        const proteinData = JSON.parse(localStorage.getItem('proteinData')) || {};
        if (proteinData[today]) {
            document.getElementById('protein-goal').value = proteinData[today].goal || '';
            updateProteinStatus(today, proteinData[today]);
        }
    }
}

function updateProteinStatus(date, data) {
    const proteinStatusDiv = document.getElementById('protein-status');
    if (proteinStatusDiv) {
        proteinStatusDiv.innerText = `Date: ${date}, Goal: ${data.goal} grams, Intake: ${data.intake} grams`;
    }
}

function addInsightsFormListener() {
    document.getElementById('export-habit-btn').addEventListener('click', function() {
        exportData('habit');
    });

    document.getElementById('export-protein-btn').addEventListener('click', function() {
        exportData('protein');
    });

    document.getElementById('export-workout-btn').addEventListener('click', function() {
        exportData('workout');
    });

    document.getElementById('workout-report-btn').addEventListener('click', () => {
        generateReport('workout');
    });

    document.getElementById('habits-report-btn').addEventListener('click', () => {
        generateReport('habits');
    });

    document.getElementById('protein-report-btn').addEventListener('click', () => {
        generateReport('protein');
    });
}

function exportData(type) {
    const workoutData = JSON.parse(localStorage.getItem('workoutData')) || [];
    const habitData = JSON.parse(localStorage.getItem('habitData')) || [];
    const proteinData = JSON.parse(localStorage.getItem('proteinData')) || {};

    let data, headers, filename;

    if (type === 'workout') {
        data = workoutData;
        headers = ['timestamp', 'routineNumber', 'focusArea', 'exercise', 'setNumber', 'setWeight', 'setReps'];
        filename = 'workout_data.csv';
    } else if (type === 'habit') {
        data = habitData;
        headers = ['timestamp', 'sleep', 'stress', 'weight', 'notes'];
        filename = 'habit_data.csv';
    } else if (type === 'protein') {
        data = Object.keys(proteinData).map(date => ({ date, ...proteinData[date] }));
        headers = ['date', 'goal', 'intake'];
        filename = 'protein_data.csv';
    }

    const csv = convertToCSV(data, headers);
    downloadCSV(csv, filename);
}

function convertToCSV(data, headers) {
    const csvRows = [];
    csvRows.push(headers.join(','));

    data.forEach(row => {
        const values = headers.map(header => {
            const escaped = ('' + (row[header] || '')).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function generateReport(type) {
    const startDateInput = document.getElementById('start-date').value;
    const endDateInput = document.getElementById('end-date').value;
    const reportDiv = document.getElementById('report');
    reportDiv.innerHTML = '';

    // Error handling
    if (!startDateInput && !endDateInput) {
        reportDiv.innerHTML = '<p class="error-message">Enter a Date Range</p>';
        return;
    } else if (!startDateInput) {
        reportDiv.innerHTML = '<p class="error-message">No Start Date</p>';
        return;
    } else if (!endDateInput) {
        reportDiv.innerHTML = '<p class="error-message">No End Date</p>';
        return;
    }

    const startDate = new Date(startDateInput + 'T00:00:00');
    const endDate = new Date(endDateInput + 'T23:59:59');

    console.log(`Start Date: ${startDate}`);
    console.log(`End Date: ${endDate}`);

    const workoutData = JSON.parse(localStorage.getItem('workoutData')) || [];
    const habitData = JSON.parse(localStorage.getItem('habitData')) || [];
    const proteinData = JSON.parse(localStorage.getItem('proteinData')) || {};

    const filteredWorkoutData = filterWorkoutDataByDateRange(workoutData, startDate, endDate);
    const filteredHabitData = filterHabitDataByDateRange(habitData, startDate, endDate);
    const filteredProteinData = filterProteinDataByDateRange(proteinData, startDate, endDate);

    if (type === 'workout' && filteredWorkoutData.length === 0) {
        reportDiv.innerHTML = '<p class="error-message">No data available for date range specified</p>';
    } else if (type === 'habits' && filteredHabitData.length === 0) {
        reportDiv.innerHTML = '<p class="error-message">No data available for date range specified</p>';
    } else if (type === 'protein' && Object.keys(filteredProteinData).length === 0) {
        reportDiv.innerHTML = '<p class="error-message">No data available for date range specified</p>';
    } else {
        if (type === 'workout') {
            reportDiv.innerHTML += generateWorkoutTable('Workout Data', filteredWorkoutData);
        } else if (type === 'habits') {
            reportDiv.innerHTML += generateHabitTable('Habit Data', filteredHabitData);
        } else if (type === 'protein') {
            reportDiv.innerHTML += generateProteinTable('Protein Data', filteredProteinData);
        }
    }

    // Push export options to the bottom
    document.querySelector('.export-buttons').style.marginTop = '20px';
}

function filterWorkoutDataByDateRange(data, startDate, endDate) {
    return data.filter(item => {
        const date = new Date(item.timestamp);
        return date >= startDate && date <= endDate;
    });
}

function filterHabitDataByDateRange(data, startDate, endDate) {
    return data.filter(item => {
        const date = new Date(item.timestamp);
        return date >= startDate && date <= endDate;
    });
}

function filterProteinDataByDateRange(data, startDate, endDate) {
    const filteredData = {};
    for (const [date, value] of Object.entries(data)) {
        const currentDate = new Date(date);
        if (currentDate >= startDate && currentDate <= endDate) {
            filteredData[date] = value;
        }
    }
    return filteredData;
}

function generateWorkoutTable(title, data) {
    let table = `<h3>${title}</h3><table><tr><th>Date</th><th>Exercise</th><th>Sets</th><th>Reps</th><th>Weight</th></tr>`;
    data.forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString();
        table += `<tr><td class="center-text">${date}</td><td class="center-text">${item.exercise}</td><td class="center-text">${item.setNumber}</td><td class="center-text">${item.setReps}</td><td class="center-text">${item.setWeight}</td></tr>`;
    });
    table += '</table>';
    return table;
}

function generateHabitTable(title, data) {
    let table = `<h3>${title}</h3><table><tr><th>Date</th><th>Sleep</th><th>Stress</th><th>Weight</th><th>Notes</th></tr>`;
    data.forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString();
        table += `<tr><td class="center-text">${date}</td><td class="center-text">${item.sleep}</td><td class="center-text">${item.stress}</td><td class="center-text">${item.weight}</td><td class="center-text">${item.notes}</td></tr>`;
    });
    table += '</table>';
    return table;
}

function generateProteinTable(title, data) {
    let table = `<h3>${title}</h3><table><tr><th>Date</th><th>Goal</th><th>Intake</th></tr>`;
    for (const [date, value] of Object.entries(data)) {
        table += `<tr><td class="center-text">${date}</td><td class="center-text">${value.goal}</td><td class="center-text">${value.intake}</td></tr>`;
    }
    table += '</table>';
    return table;
}