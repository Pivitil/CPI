document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('home-btn').addEventListener('click', function() {
        location.href = '../../index.html';
    });

    document.getElementById('email-workout-btn').addEventListener('click', function() {
        generateReportFile('workout');
    });

    document.getElementById('email-habits-btn').addEventListener('click', function() {
        generateReportFile('habits');
    });

    document.getElementById('email-protein-btn').addEventListener('click', function() {
        generateReportFile('protein');
    });
});

function generateReportFile(type) {
    let data;
    let filename = `${type}-report.csv`;
    let csvContent = `data:text/csv;charset=utf-8,`;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date();

    if (type === 'workout') {
        data = JSON.parse(localStorage.getItem('workoutData')) || [];
        data = filterWorkoutDataByDateRange(data, startDate, endDate);
        csvContent += generateWorkoutCSV(data);
    } else if (type === 'habits') {
        data = JSON.parse(localStorage.getItem('habitData')) || [];
        data = filterHabitDataByDateRange(data, startDate, endDate);
        csvContent += generateHabitCSV(data);
    } else if (type === 'protein') {
        data = JSON.parse(localStorage.getItem('proteinData')) || {};
        data = filterProteinDataByDateRange(data, startDate, endDate);
        csvContent += generateProteinCSV(data);
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

function generateWorkoutCSV(data) {
    let csv = 'Date,Exercise,Sets,Reps,Weight\n';
    data.forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString(); // Format date to short date
        csv += `${date},${item.exercise},${item.setNumber},${item.setReps},${item.setWeight}\n`;
    });
    return csv;
}

function generateHabitCSV(data) {
    let csv = 'Date,Sleep,Stress,Weight,Notes\n';
    data.forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString(); // Format date to short date
        csv += `${date},${item.sleep},${item.stress},${item.weight},${item.notes}\n`;
    });
    return csv;
}

function generateProteinCSV(data) {
    let csv = 'Date,Goal,Intake\n';
    for (const [date, value] of Object.entries(data)) {
        csv += `${date},${value.goal},${value.intake}\n`;
    }
    return csv;
}