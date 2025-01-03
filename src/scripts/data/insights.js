document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('home-btn').addEventListener('click', function() {
        const currentUrl = window.location.href;
        const homePath = currentUrl.includes('CPI') ? '../index.html' : '../../index.html';
        location.href = homePath;
    });

    document.getElementById('export-btn').addEventListener('click', function() {
        location.href = '../pages/export.html';
    });

    document.getElementById('workout-report-btn').addEventListener('click', function() {
        generateReport('workout');
    });

    document.getElementById('habits-report-btn').addEventListener('click', function() {
        generateReport('habits');
    });

    document.getElementById('protein-report-btn').addEventListener('click', function() {
        generateReport('protein');
    });
});

function generateReport(type) {
    const startDateInput = document.getElementById('start-date').value;
    const endDateInput = document.getElementById('end-date').value;

    // Parse the input dates as local dates
    const startDate = new Date(startDateInput + 'T00:00:00');
    const endDate = new Date(endDateInput + 'T23:59:59');

    console.log(`Start Date: ${startDate}`);
    console.log(`End Date: ${endDate}`);

    const reportDiv = document.getElementById('report');
    reportDiv.innerHTML = '';

    const workoutData = JSON.parse(localStorage.getItem('workoutData')) || [];
    const habitData = JSON.parse(localStorage.getItem('habitData')) || [];
    const proteinData = JSON.parse(localStorage.getItem('proteinData')) || {};

    const filteredWorkoutData = filterWorkoutDataByDateRange(workoutData, startDate, endDate);
    const filteredHabitData = filterHabitDataByDateRange(habitData, startDate, endDate);
    const filteredProteinData = filterProteinDataByDateRange(proteinData, startDate, endDate);

    if (type === 'workout') {
        reportDiv.innerHTML += generateWorkoutTable('Workout Data', filteredWorkoutData);
    } else if (type === 'habits') {
        reportDiv.innerHTML += generateHabitTable('Habit Data', filteredHabitData);
    } else if (type === 'protein') {
        reportDiv.innerHTML += generateProteinTable('Protein Data', filteredProteinData);
    }
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
        table += `<tr><td>${item.timestamp}</td><td>${item.exercise}</td><td>${item.sets}</td><td>${item.reps}</td><td>${item.weight}</td></tr>`;
    });
    table += '</table>';
    return table;
}

function generateHabitTable(title, data) {
    let table = `<h3>${title}</h3><table><tr><th>Date</th><th>Sleep</th><th>Stress</th><th>Weight</th><th>Notes</th></tr>`;
    data.forEach(item => {
        table += `<tr><td>${item.timestamp}</td><td>${item.sleep}</td><td>${item.stress}</td><td>${item.weight}</td><td>${item.notes}</td></tr>`;
    });
    table += '</table>';
    return table;
}

function generateProteinTable(title, data) {
    let table = `<h3>${title}</h3><table><tr><th>Date</th><th>Goal</th><th>Intake</th></tr>`;
    for (const [date, value] of Object.entries(data)) {
        table += `<tr><td>${date}</td><td>${value.goal}</td><td>${value.intake}</td></tr>`;
    }
    table += '</table>';
    return table;
}