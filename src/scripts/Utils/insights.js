document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('home-btn').addEventListener('click', function() {
        const currentUrl = window.location.href;
        const homePath = currentUrl.includes('CPI') ? '../index.html' : '../../index.html';
        location.href = homePath;
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
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
    endDate.setHours(23, 59, 59, 999); // Include the entire end date
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
        const itemDate = new Date(item.timestamp);
        return itemDate >= startDate && itemDate <= endDate;
    });
}

function filterHabitDataByDateRange(data, startDate, endDate) {
    return data.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= startDate && itemDate <= endDate;
    });
}

function filterProteinDataByDateRange(data, startDate, endDate) {
    return Object.keys(data).filter(date => {
        const currentDate = new Date(date);
        return currentDate >= startDate && currentDate <= endDate;
    }).reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
    }, {});
}

function generateWorkoutTable(title, data) {
    if (data.length === 0) {
        return `<h3>${title}</h3><p>No data available for the selected date range.</p>`;
    }

    const headers = {
        timestamp: 'Date',
        focusArea: 'Area',
        exercise: 'Exercise',
        setNumber: 'Set',
        setWeight: 'Weight',
        setReps: 'Reps'
    };

    let table = `<h3>${title}</h3><table><thead><tr>`;
    Object.keys(headers).forEach(key => {
        table += `<th>${headers[key]}</th>`;
    });
    table += `</tr></thead><tbody>`;

    data.forEach(row => {
        table += `<tr>`;
        Object.keys(headers).forEach(key => {
            let value = row[key];
            if (key === 'timestamp') {
                value = new Date(value).toLocaleDateString(); // Format the timestamp to short date
            }
            const cellClass = ['timestamp', 'focusArea', 'setNumber', 'setWeight', 'setReps'].includes(key) ? 'center-cell' : '';
            table += `<td class="${cellClass}">${value}</td>`;
        });
        table += `</tr>`;
    });

    table += `</tbody></table>`;
    return table;
}

function generateHabitTable(title, data) {
    if (data.length === 0) {
        return `<h3>${title}</h3><p>No data available for the selected date range.</p>`;
    }

    const headers = {
        timestamp: 'Date',
        sleep: 'Sleep',
        stress: 'Stress',
        weight: 'Weight',
        notes: 'Note'
    };

    let table = `<h3>${title}</h3><table><thead><tr>`;
    Object.keys(headers).forEach(key => {
        table += `<th>${headers[key]}</th>`;
    });
    table += `</tr></thead><tbody>`;

    data.forEach(row => {
        table += `<tr>`;
        Object.keys(headers).forEach(key => {
            let value = row[key];
            if (key === 'timestamp') {
                value = new Date(value).toLocaleDateString(); // Format the timestamp to short date
            }
            const cellClass = ['timestamp', 'sleep', 'stress', 'weight', 'notes'].includes(key) ? 'center-cell' : '';
            table += `<td class="${cellClass}">${value}</td>`;
        });
        table += `</tr>`;
    });

    table += `</tbody></table>`;
    return table;
}

function generateProteinTable(title, data) {
    if (Object.keys(data).length === 0) {
        return `<h3>${title}</h3><p>No data available for the selected date range.</p>`;
    }

    const headers = {
        date: 'Date',
        goal: 'Goal',
        proteinIntake: 'Protein Intake'
    };

    let table = `<h3>${title}</h3><table><thead><tr>`;
    Object.keys(headers).forEach(key => {
        table += `<th>${headers[key]}</th>`;
    });
    table += `</tr></thead><tbody>`;

    Object.keys(data).forEach(date => {
        const goal = data[date].goal;
        const intake = data[date].intake;
        table += `<tr>`;
        table += `<td class="center-cell">${new Date(date).toLocaleDateString()}</td>`;
        table += `<td class="center-cell">${goal}</td>`;
        table += `<td class="center-cell">${intake}</td>`;
        table += `</tr>`;
    });

    table += `</tbody></table>`;
    return table;
}