document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('export-habit-btn').addEventListener('click', function() {
        exportData('habit');
    });

    document.getElementById('export-protein-btn').addEventListener('click', function() {
        exportData('protein');
    });

    document.getElementById('export-workout-btn').addEventListener('click', function() {
        exportData('workout');
    });
});

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